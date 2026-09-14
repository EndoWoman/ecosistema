import { auth, requirePermission } from "@/core/auth/server";
import Accounts from "./Accounts";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requirePermission("accounts");return <Accounts users={auth.list(user.id)} self={user.id} audit={auth.audit(user.id) as {action:string;created:number;actor:string;target:string}[]}/>;}
