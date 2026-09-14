import { requirePermission } from "@/core/auth/server";
import { roleLabels } from "@/core/auth/store";
import { redirect } from "next/navigation";
import { access } from "@/core/operations/store";
import Logout from "@/core/auth/Logout";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requirePermission("portal");if(user.role==="ceo")redirect("/dashboard");return <main className="accounts-page"><p className="eyebrow">ENDO WOMAN · {roleLabels[user.role]}</p><h1>Hola, {user.name}</h1><section className="panel"><h2>Tu espacio de trabajo</h2><nav className="live-nav">{Object.entries(access).filter(([key,permissions])=>key!=="resumen"&&permissions.read.includes(user.role)).map(([key])=><a key={key} href={`/operacion/${key}`}>{key.charAt(0).toUpperCase()+key.slice(1)}</a>)}</nav><p>Tu cuenta está activa. Las herramientas habilitadas para tu rol aparecen arriba. Los demás módulos se incorporarán en las siguientes etapas.</p><p>El dashboard de Dirección y la administración de cuentas requieren el rol CEO.</p></section><Logout/></main>;}
