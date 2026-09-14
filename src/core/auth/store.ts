import { DatabaseSync } from "node:sqlite";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { mkdirSync, chmodSync } from "node:fs";
import { dirname, resolve } from "node:path";

export const roles = ["ceo", "medico", "enfermeria", "administracion", "marketing", "paciente"] as const;
export type Role = typeof roles[number];
export const roleLabels: Record<Role, string> = {ceo:"Dirección general", medico:"Médico", enfermeria:"Enfermería", administracion:"Administración", marketing:"Marketing", paciente:"Paciente"};
export type User = {id:string; name:string; email:string; role:Role; status:"pending"|"active"|"inactive"};
export type Permission = "portal" | "dashboard" | "accounts";
export function can(user: User | null, permission: Permission) { return !!user && user.status === "active" && (permission === "portal" || user.role === "ceo"); }
const hash = (v:string) => createHash("sha256").update(v).digest("hex");
const passwordHash = (p:string, salt=randomBytes(16).toString("hex")) => `${salt}:${scryptSync(p,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024}).toString("hex")}`;
function passwordMatches(p:string, stored:string) { const [salt] = stored.split(":"); const a=Buffer.from(passwordHash(p,salt)); const b=Buffer.from(stored); return a.length===b.length && timingSafeEqual(a,b); }
function validatePassword(password:string) { if(password.length<12 || password.length>128) throw new Error("Usa una contraseña de entre 12 y 128 caracteres."); }
function identity(name:string,email:string) { name=name.trim(); email=email.trim().toLowerCase(); if(!name || name.length>100 || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Revisa el nombre y el correo."); return {name,email}; }

export function createAuthStore(path = process.env.ENDOWOMAN_AUTH_DB || resolve("private-data/auth.sqlite")) {
  if(path!==":memory:") mkdirSync(dirname(path),{recursive:true,mode:0o700});
  const db = new DatabaseSync(path);
  if(path!==":memory:") chmodSync(path,0o600);
  db.exec(`PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,role TEXT NOT NULL,status TEXT NOT NULL,password TEXT);
    CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS tokens(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS attempts(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,actor TEXT,action TEXT NOT NULL,target TEXT,created INTEGER NOT NULL);`);
  const audit=(actor:string|null,action:string,target:string|null)=>db.prepare("INSERT INTO audit(actor,action,target,created) VALUES(?,?,?,?)").run(actor,action,target,Date.now());
  const get=(id:string)=>db.prepare("SELECT id,name,email,role,status FROM users WHERE id=?").get(id) as User|undefined;
  function transaction<T>(work:()=>T):T { db.exec("BEGIN IMMEDIATE"); try {const result=work();db.exec("COMMIT");return result;}catch(e){db.exec("ROLLBACK");throw e;} }
  function admin(actor:string) {if(!can(get(actor)??null,"accounts")) throw new Error("No tienes permiso para administrar cuentas.");}
  function rate(key:string,limit:number) {
    const now=Date.now();db.prepare("DELETE FROM attempts WHERE expires<=?").run(now);
    const row=db.prepare("SELECT count FROM attempts WHERE key=?").get(key) as {count:number}|undefined;
    if(row && row.count>=limit) throw new Error("Demasiados intentos. Intenta de nuevo en 15 minutos.");
    db.prepare("INSERT INTO attempts VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1").run(key,now+15*60*1000);
  }
  return {
    close:()=>db.close(),
    needsSetup:()=>!(db.prepare("SELECT id FROM users LIMIT 1").get()),
    bootstrap(name:string,email:string,password:string) {const data=identity(name,email);validatePassword(password);const secret=passwordHash(password);return transaction(()=>{
      if(db.prepare("SELECT id FROM users LIMIT 1").get()) throw new Error("La cuenta inicial ya fue creada.");
      const id=randomUUID();db.prepare("INSERT INTO users VALUES(?,?,?,?,?,?)").run(id,data.name,data.email,"ceo","active",secret);audit(id,"initial_account",id);return get(id)!;
    });},
    login(email:string,password:string) {
      rate("login:global",100);const key=`login:${hash(email.trim().toLowerCase())}`;rate(key,5);
      const row=db.prepare("SELECT * FROM users WHERE email=?").get(email.trim().toLowerCase()) as (User & {password:string|null})|undefined;
      // Equal-cost hash verification for unknown accounts.
      const valid=passwordMatches(password,row?.password??`${"0".repeat(32)}:${"0".repeat(128)}`);
      if(!valid || row?.status!=="active") throw new Error("No se pudo iniciar sesión. Revisa tus datos o consulta a Dirección.");
      db.prepare("DELETE FROM attempts WHERE key=?").run(key);
      const token=randomBytes(32).toString("hex");db.prepare("DELETE FROM sessions WHERE expires<=?").run(Date.now());
      db.prepare("INSERT INTO sessions VALUES(?,?,?)").run(hash(token),row.id,Date.now()+8*60*60*1000);audit(row.id,"login",row.id);return token;
    },
    session(token:string):User|null {if(!/^[a-f0-9]{64}$/.test(token))return null;return db.prepare("SELECT u.id,u.name,u.email,u.role,u.status FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.status='active'").get(hash(token),Date.now()) as User??null;},
    logout(token:string) {const row=db.prepare("SELECT user_id FROM sessions WHERE token=?").get(hash(token)) as {user_id:string}|undefined;db.prepare("DELETE FROM sessions WHERE token=?").run(hash(token));if(row)audit(row.user_id,"logout",row.user_id);},
    list(actor:string) {admin(actor);return db.prepare("SELECT id,name,email,role,status FROM users ORDER BY name").all().map(row => ({...row})) as User[];},
    create(actor:string,name:string,email:string,role:Role) {admin(actor);const data=identity(name,email);if(!roles.includes(role))throw new Error("Rol no válido.");if(db.prepare("SELECT id FROM users WHERE email=?").get(data.email))throw new Error("Ya existe una cuenta con ese correo.");const id=randomUUID();db.prepare("INSERT INTO users VALUES(?,?,?,?,?,NULL)").run(id,data.name,data.email,role,"pending");audit(actor,"account_created",id);return get(id)!;},
    update(actor:string,id:string,role:Role,status:"active"|"inactive") {return transaction(()=>{admin(actor);const user=get(id);if(!user||!roles.includes(role)||!["active","inactive"].includes(status))throw new Error("Cambio no válido.");if(actor===id)throw new Error("No puedes cambiar tu propio rol o desactivar tu cuenta desde aquí.");if(user.role==="ceo" && user.status==="active" && (role!=="ceo"||status!=="active")) {const count=db.prepare("SELECT count(*) AS n FROM users WHERE role='ceo' AND status='active'").get() as {n:number};if(count.n<=1)throw new Error("Debe permanecer al menos una cuenta de Dirección activa.");}
      const row=db.prepare("SELECT password FROM users WHERE id=?").get(id) as {password:string|null};const nextStatus=status==="active"&&!row.password?"pending":status;
      db.prepare("UPDATE users SET role=?,status=? WHERE id=?").run(role,nextStatus,id);db.prepare("DELETE FROM sessions WHERE user_id=?").run(id);db.prepare("DELETE FROM tokens WHERE user_id=?").run(id);audit(actor,"account_updated_sessions_revoked",id);
    });},
    issueToken(actor:string,id:string) {admin(actor);const user=get(id);if(!user||user.status==="inactive")throw new Error("Activa la cuenta antes de preparar el acceso.");const token=randomBytes(32).toString("hex");transaction(()=>{db.prepare("DELETE FROM tokens WHERE user_id=?").run(id);db.prepare("DELETE FROM sessions WHERE user_id=?").run(id);db.prepare("INSERT INTO tokens VALUES(?,?,?)").run(hash(token),id,Date.now()+30*60*1000);audit(actor,"activation_or_recovery_issued",id);});return token;},
    activate(token:string,password:string) {rate("activation:global",30);validatePassword(password);if(!/^[a-f0-9]{64}$/.test(token))throw new Error("Código inválido o vencido.");const secret=passwordHash(password);return transaction(()=>{const row=db.prepare("SELECT t.user_id FROM tokens t JOIN users u ON u.id=t.user_id WHERE t.token=? AND t.expires>? AND u.status!='inactive'").get(hash(token),Date.now()) as {user_id:string}|undefined;if(!row)throw new Error("Código inválido o vencido.");db.prepare("UPDATE users SET password=?,status='active' WHERE id=?").run(secret,row.user_id);db.prepare("DELETE FROM tokens WHERE user_id=?").run(row.user_id);db.prepare("DELETE FROM sessions WHERE user_id=?").run(row.user_id);const user=get(row.user_id)!;db.prepare("DELETE FROM attempts WHERE key=?").run(`login:${hash(user.email)}`);audit(row.user_id,"password_set",row.user_id);});},
    audit(actor:string) {admin(actor);return db.prepare("SELECT a.action,a.created,u.name AS actor,t.name AS target FROM audit a LEFT JOIN users u ON u.id=a.actor LEFT JOIN users t ON t.id=a.target ORDER BY a.id DESC LIMIT 30").all().map(row => ({...row}));}
  };
}
