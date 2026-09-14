import { currentUser } from '@/core/auth/server';
import { operations } from '@/core/operations/server';
import { access,today,type Module } from '@/core/operations/store';
import { redirect,notFound } from 'next/navigation';
import Operations from './Operations';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{module:string}>}){const {module}=await params;if(!Object.hasOwn(access,module)||module==='resumen')notFound();const user=await currentUser();if(!user)redirect('/acceso');const mod=module as Module;if(!access[mod].read.includes(user.role))redirect('/portal');return <Operations module={mod} rows={operations.list(user.id,mod)} writable={access[mod].write.includes(user.role)} day={today()} accounts={mod==='equipo'&&user.role==='ceo'?operations.accounts(user.id):[]} services={mod==='cobros'?operations.list(user.id,'servicios'):[]} team={mod==='cobros'?operations.list(user.id,'equipo'):[]} ceo={user.role==='ceo'}/>;}
