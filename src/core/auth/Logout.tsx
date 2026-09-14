"use client";
import {useState} from "react";
export default function Logout(){const[error,setError]=useState(false);return <><button className="logout-button" onClick={async()=>{try{const r=await fetch("/api/auth/logout",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!r.ok)throw new Error();window.location.assign("/acceso");}catch{setError(true);}}}>Cerrar sesión</button>{error&&<span role="alert">No se pudo cerrar sesión. Intenta de nuevo.</span>}</>;}
