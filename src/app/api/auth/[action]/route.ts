import { NextRequest, NextResponse } from "next/server";
import { auth, cookieName } from "@/core/auth/server";
import { can, type Role } from "@/core/auth/store";
export const runtime="nodejs";
export async function POST(request:NextRequest, context:{params:Promise<{action:string}>}) {
  const origin=process.env.ENDOWOMAN_ORIGIN??"http://127.0.0.1:3000";
  if(request.headers.get("origin")!==origin || request.headers.get("host")!==new URL(origin).host) return NextResponse.json({error:"Solicitud no permitida."},{status:403});
  if(!request.headers.get("content-type")?.includes("application/json"))return NextResponse.json({error:"Formato no válido."},{status:415});
  const {action}=await context.params;
  try {
    const text=await request.text();if(text.length>8192)return NextResponse.json({error:"Solicitud demasiado grande."},{status:413});
    const body=JSON.parse(text);const field=(key:string)=>typeof body?.[key]==="string"?body[key] as string:"";
    const session=request.cookies.get(cookieName)?.value??"";
    const user=auth.session(session);
    let result:Record<string,unknown>={ok:true};let newSession:string|undefined;
    switch(action) {
      case "setup": {
        // Local bootstrap only. Never enable initial registration on a public host.
        if(!["127.0.0.1","localhost","[::1]"].includes(new URL(origin).hostname))return NextResponse.json({error:"La configuración inicial solo está disponible en el servidor local."},{status:403});
        auth.bootstrap(field("name"),field("email"),field("password"));result={ok:true,redirect:"/acceso?creada=1"};break;
      }
      case "login": if(field("password").length>128)throw new Error("No se pudo iniciar sesión.");newSession=auth.login(field("email"),field("password"));result={ok:true,redirect:"/portal"};break;
      case "logout": auth.logout(session);break;
      case "activate": auth.activate(field("token"),field("password"));result={ok:true,redirect:"/acceso?activada=1"};break;
      case "create":case "update":case "token": {
        if(!user)return NextResponse.json({error:"Inicia sesión para continuar."},{status:401});
        if(!can(user,"accounts"))return NextResponse.json({error:"No tienes permiso para administrar cuentas."},{status:403});
        if(action==="create") {const created=auth.create(user.id,field("name"),field("email"),field("role") as Role);result={ok:true,id:created.id};}
        if(action==="update")auth.update(user.id,field("id"),field("role") as Role,field("status") as "active"|"inactive");
        if(action==="token" && field("id")===user.id)throw new Error("Para recuperar tu propia cuenta utiliza el procedimiento local de recuperación.");
        if(action==="token")result={ok:true,token:auth.issueToken(user.id,field("id"))};break;
      }
      default:return NextResponse.json({error:"Acción no disponible."},{status:404});
    }
    const response=NextResponse.json(result,{headers:{"Cache-Control":"no-store"}});
    if(newSession)response.cookies.set(cookieName,newSession,{httpOnly:true,sameSite:"strict",secure:origin.startsWith("https:"),path:"/",maxAge:8*60*60});
    if(action==="logout")response.cookies.set(cookieName,"",{httpOnly:true,sameSite:"strict",secure:origin.startsWith("https:"),path:"/",maxAge:0});
    return response;
  } catch(error) {return NextResponse.json({error:error instanceof Error && !(error instanceof SyntaxError) && !error.message.includes("SQLITE") ? error.message : "No se pudo completar la operación."},{status:400,headers:{"Cache-Control":"no-store"}});}
}
