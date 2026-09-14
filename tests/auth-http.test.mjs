import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
import { createAuthStore } from '../src/core/auth/store.ts';

test('HTTP: sesión requerida, permisos, CSRF, desactivación y cierre de sesión', {timeout:30000}, async()=>{
  const dir=mkdtempSync(join(tmpdir(),'endo-http-test-'));const dbPath=join(dir,'auth.sqlite');
  const store=createAuthStore(dbPath);const password='HTTP-synthetic-password-88';
  const ceo=store.bootstrap('CEO sintético','ceo@example.com',password);
  const staff=store.create(ceo.id,'Marketing sintético','marketing@example.com','marketing');
  store.activate(store.issueToken(ceo.id,staff.id),password);store.close();
  const origin='http://127.0.0.1:3107';
  const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3107'],{env:{...process.env,ENDOWOMAN_AUTH_DB:dbPath,ENDOWOMAN_ORIGIN:origin},stdio:['ignore','pipe','pipe']});
  let log='';child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);
  const post=(action,body,cookie='',requestOrigin=origin)=>fetch(`${origin}/api/auth/${action}`,{method:'POST',headers:{Origin:requestOrigin,'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify(body),redirect:'manual'});
  try{
    let ready=false;for(let i=0;i<80;i++){if(child.exitCode!==null)throw new Error(log);try{const r=await fetch(origin+'/acceso');if(r.ok){ready=true;break;}}catch{}await delay(100);}assert.ok(ready,log);
    const protectedPage=await fetch(origin+'/dashboard',{redirect:'manual'});assert.equal(protectedPage.status,307);assert.equal(protectedPage.headers.get('location'),'/acceso');
    assert.equal((await post('create',{name:'No',email:'no@example.com',role:'ceo'})).status,401);
    assert.equal((await post('login',{email:'ceo@example.com',password},'','https://otro.example')).status,403);
    const login=await post('login',{email:'ceo@example.com',password});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie');assert.match(cookie,/HttpOnly/i);assert.match(cookie,/SameSite=strict/i);const ceoCookie=cookie.split(';')[0];
    assert.equal((await fetch(origin+'/cuentas',{headers:{Cookie:ceoCookie}})).status,200,log);
    assert.equal((await post('setup',{name:'Otro',email:'otro@example.com',password})).status,400);
    const staffLogin=await post('login',{email:'marketing@example.com',password});const staffCookie=staffLogin.headers.get('set-cookie').split(';')[0];
    assert.equal((await post('create',{name:'Intruso',email:'intruso@example.com',role:'ceo'},staffCookie)).status,403);
    const denied=await fetch(origin+'/dashboard',{headers:{Cookie:staffCookie},redirect:'manual'});assert.equal(denied.status,307);assert.equal(denied.headers.get('location'),'/portal');
    assert.equal((await post('update',{id:staff.id,role:'marketing',status:'inactive'},ceoCookie)).status,200);
    assert.equal((await fetch(origin+'/portal',{headers:{Cookie:staffCookie},redirect:'manual'})).headers.get('location'),'/acceso');
    assert.equal((await post('logout',{},ceoCookie)).status,200);
    assert.equal((await post('create',{name:'No',email:'after@example.com',role:'medico'},ceoCookie)).status,401);
  }finally{if(child.exitCode===null){const exited=once(child,'exit');child.kill('SIGTERM');await exited;}rmSync(dir,{recursive:true,force:true});}
});
