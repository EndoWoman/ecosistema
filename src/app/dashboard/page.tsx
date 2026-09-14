import { requirePermission } from '@/core/auth/server';
import { operations } from '@/core/operations/server';
import { today } from '@/core/operations/store';
import Dashboard from './Dashboard';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{year?:string}>}){const user=await requirePermission('dashboard');const query=await searchParams;const year=/^20\d\d$/.test(query.year??'')?query.year!:today().slice(0,4);return <Dashboard accountName={user.name} data={operations.summary(user.id,year)}/>;}
