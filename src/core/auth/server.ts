import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthStore, can, type Permission } from "./store";
const globalAuth = globalThis as unknown as { endoAuth?: ReturnType<typeof createAuthStore> };
export const auth = globalAuth.endoAuth ??= createAuthStore();
export const cookieName = "endo_session";
export async function currentUser() { return auth.session((await cookies()).get(cookieName)?.value??""); }
export async function requirePermission(permission:Permission) { const user=await currentUser();if(!user)redirect("/acceso");if(!can(user,permission))redirect("/portal");return user; }
