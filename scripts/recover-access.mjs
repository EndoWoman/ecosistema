// Local operator recovery; never expose this command as an HTTP endpoint.
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { createAuthStore } from '../src/core/auth/store.ts';
const email=process.argv[2]?.trim().toLowerCase();
if(!email){console.error('Uso: npm run auth:recover -- correo-de-direccion');process.exit(1);}
const path=process.env.ENDOWOMAN_AUTH_DB||resolve('private-data/auth.sqlite');
if(!existsSync(path)){console.error('No existe una base de cuentas local.');process.exit(1);}
const db=new DatabaseSync(path);const user=db.prepare("SELECT id FROM users WHERE email=? AND role='ceo' AND status='active'").get(email);db.close();
if(!user){console.error('No se encontró una cuenta de Dirección activa con ese correo.');process.exit(1);}
const store=createAuthStore(path);const token=store.issueToken(user.id,user.id);store.close();
console.log('Código privado de recuperación; vence en 30 minutos. Las sesiones anteriores quedaron cerradas.\nÚsalo en /activar en tu servidor local. No lo compartas en chats ni lo guardes en Git.\n'+token);
