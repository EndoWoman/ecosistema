import { requirePermission } from "@/core/auth/server";
import { roleLabels } from "@/core/auth/store";
import { redirect } from "next/navigation";
import Logout from "@/core/auth/Logout";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requirePermission("portal");if(user.role==="ceo")redirect("/dashboard");return <main className="accounts-page"><p className="eyebrow">ENDO WOMAN · {roleLabels[user.role]}</p><h1>Hola, {user.name}</h1><section className="panel"><h2>Tu acceso está listo</h2><p>Tu cuenta está activa. El espacio de trabajo de {roleLabels[user.role].toLowerCase()} se habilitará en las siguientes etapas.</p><p>El dashboard de Dirección y la administración de cuentas requieren el rol CEO.</p></section><Logout/></main>;}
