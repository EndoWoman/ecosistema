import { NextRequest,NextResponse } from 'next/server';
import { auth,cookieName } from '@/core/auth/server';
import { operations } from '@/core/operations/server';
import { access,OperationError,type Module } from '@/core/operations/store';
export const runtime='nodejs';
export async function POST(request:NextRequest,{params}:{params:Promise<{module:string}>}){
  const origin=process.env.ENDOWOMAN_ORIGIN??'http://127.0.0.1:3000';
  if(request.headers.get('origin')!==origin||request.headers.get('host')!==new URL(origin).host)return NextResponse.json({error:'Solicitud no permitida.'},{status:403});
  const user=auth.session(request.cookies.get(cookieName)?.value??'');if(!user)return NextResponse.json({error:'Inicia sesión.'},{status:401});
  const {module}=await params;if(!Object.hasOwn(access,module)||module==='resumen')return NextResponse.json({error:'Módulo no válido.'},{status:404});
  try{if(!request.headers.get('content-type')?.includes('application/json'))throw new OperationError('Formato no válido.');const text=await request.text();if(text.length>8192)throw new OperationError('Solicitud demasiado grande.');const input=JSON.parse(text);if(!input||Array.isArray(input)||typeof input!=='object'||!Object.values(input).every(v=>typeof v==='string'))throw new OperationError('Datos no válidos.');const id=operations.mutate(user.id,module as Module,input);return NextResponse.json({id},{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:e instanceof OperationError?e.message:'No se pudo guardar el registro.'},{status:e instanceof OperationError?e.status:400});}
}
