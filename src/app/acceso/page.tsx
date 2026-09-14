import { auth, currentUser } from "@/core/auth/server";
import { redirect } from "next/navigation";
import AccessForm from "./AccessForm";
export const dynamic="force-dynamic";
export default async function Page(){if(await currentUser())redirect("/portal");return <AccessForm setup={auth.needsSetup()}/>;}
