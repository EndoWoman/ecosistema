import { requirePermission } from "@/core/auth/server";
import Dashboard from "./Dashboard";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requirePermission("dashboard");return <Dashboard accountName={user.name}/>;}
