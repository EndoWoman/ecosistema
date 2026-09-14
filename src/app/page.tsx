"use client";

import Image from "next/image";
import { useState } from "react";

type IconName = "dashboard" | "money" | "chart" | "team" | "heart" | "settings" | "user" | "shield" | "arrow";
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    dashboard: <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" /></>,
    money: <><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M5 9v6M19 9v6"/></>,
    chart: <><path d="M4 3v17h17M7 14l4-5 4 2 6-7"/></>,
    team: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>,
    settings: <><path d="m10 3-1 3-3 1-3 3 2 2-1 3 3 3 3-1 2 4 2-4 3 1 3-3-1-3 2-2-3-3-3-1-1-3z"/><circle cx="12" cy="12" r="3"/></>,
    user: <><circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3z"/></>,
    shield: <><path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5zM8 11l3 3 5-6"/></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
const sections = ["Dashboard", "Finanzas", "CRM y marketing", "Equipo", "Pacientes", "Configuración"] as const;
type Section = typeof sections[number];
const icons: IconName[] = ["dashboard", "money", "chart", "team", "heart", "settings"];
const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
// Datos sintéticos exclusivamente para revisar el diseño. No son ingresos de la clínica.
const demoRevenue: Record<string, (number | null)[]> = {
  "2026": [112000, 126000, 118000, 145000, 139000, 157000, 164000, 176000, 184500, null, null, null],
  "2025": [98000, 106000, 102000, 119000, 125000, 116000, 132000, 138000, 141000, 147000, 153000, 160000]
};
const money = (n: number) => new Intl.NumberFormat("es-MX", {style:"currency", currency:"MXN", maximumFractionDigits:0}).format(n);
const planned: Record<string, string[]> = {
  "Equipo": ["7 médicos", "1 enfermera", "1 administración", "3 personas de marketing"],
  "Pacientes": ["Registro único", "Mi salud y evolución", "Consentimientos", "Pacientes asignadas"],
  "Configuración": ["Datos de la clínica", "Catálogo de servicios", "Usuarios y permisos", "Auditoría de accesos"]
};
const channels = [{name:"Instagram", count:84}, {name:"Google", count:62}, {name:"Facebook", count:38}, {name:"Recomendación", count:26}];

export default function Home() {
  const [section, setSection] = useState<Section>("Dashboard");
  const [year, setYear] = useState("2026");
  const values = demoRevenue[year];
  const available = values.filter((v): v is number => v !== null);
  const total = available.reduce((a,b)=>a+b,0);
  const latest = available[available.length-1];
  const marketing = section === "CRM y marketing";
  const overview = section === "Dashboard" || section === "Finanzas" || marketing;
  const title = section === "Dashboard" ? "Tu clínica, en una vista" : section;
  return <div className="shell">
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="Endo Woman, volver al dashboard"><Image src="/brand/endo-woman-rosa.png" alt="Endo Woman · Centro ginecológico" width={720} height={720} priority unoptimized/></a>
      <nav aria-label="Navegación del CEO">{sections.map((s,i)=><button key={s} className={section===s ? "active" : ""} aria-current={section===s ? "page" : undefined} onClick={()=>setSection(s)}><Icon name={icons[i]}/>{s}</button>)}</nav>
      <div className="sidebar-bottom"><div className="role-caption">ECOSISTEMA ENDO WOMAN</div><div className="role-badge"><Icon name="shield" size={19}/> Dirección general</div><p>Portal del CEO</p></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="demo-switch"><Icon name="shield"/><span>Modo demo activo:</span><span className="portal-chip">Dirección general · CEO</span></div><div className="profile"><span className="avatar"><Icon name="user" size={18}/></span><span>Dirección general</span></div></header>
      <main>
        <div className="heading"><div><p className="eyebrow">CENTRO GINECOLÓGICO · PUEBLA</p><h1>{title}</h1><p className="subtitle">{overview ? "Operación, finanzas y crecimiento de Endo Woman." : "Un espacio para organizar la atención y el trabajo del equipo."}</p></div>{overview && <label className="year-picker">Periodo de muestra<select aria-label="Año de muestra" value={year} onChange={e=>setYear(e.target.value)}><option value="2026">2026 · enero a septiembre</option><option value="2025">2025 · año completo</option></select></label>}</div>
        <div className="demo-note"><span className="demo-dot"/> Vista de diseño con datos ficticios. No representa la actividad real de la clínica.</div>
        {overview ? <>
          <section className="cards" aria-label="Indicadores de demostración">
            <article className="metric-card"><div className="metric-label">Cobros acumulados <Icon name="money"/></div><strong>{money(total)}</strong><p>MXN · {year} · {available.length} meses de muestra</p><div className="card-bottom"><span>Detalle financiero</span><button aria-label="Ver finanzas" onClick={()=>setSection("Finanzas")}>Ver detalle <Icon name="arrow" size={16}/></button></div></article>
            <article className="metric-card"><div className="metric-label">Último mes de muestra <Icon name="chart"/></div><strong>{money(latest)}</strong><p>{months[available.length-1]} de {year} · cobros registrados</p><div className="card-bottom"><span>Efectivo y terminal</span><span className="soft-tag">Ejemplo</span></div></article>
            <article className="metric-card"><div className="metric-label">Prospectos de muestra <Icon name="team"/></div><strong>210</strong><p>Ejemplo independiente del periodo financiero</p><div className="card-bottom"><span>4 canales de origen</span><button aria-label="Ver marketing" onClick={()=>setSection("CRM y marketing")}>Ver canales <Icon name="arrow" size={16}/></button></div></article>
            <article className="metric-card"><div className="metric-label">Equipo de la clínica <Icon name="heart"/></div><strong>12 <small>personas</small></strong><p>Equipo previsto · más Dirección General</p><div className="card-bottom"><span>Cuentas por crear</span><button aria-label="Ver equipo" onClick={()=>setSection("Equipo")}>Ver equipo <Icon name="arrow" size={16}/></button></div></article>
          </section>
          <nav className="section-tabs" aria-label="Resumen ejecutivo"><button className={section==="Dashboard"?"selected":""} onClick={()=>setSection("Dashboard")}>Resumen de tu clínica</button><button className={section==="Finanzas"?"selected":""} onClick={()=>setSection("Finanzas")}>Finanzas y evolución</button><button className={marketing?"selected":""} onClick={()=>setSection("CRM y marketing")}>Marketing y crecimiento</button></nav>
          <section className="two-columns">
            <article className="panel chart-panel"><div className="panel-heading"><div><h2>{marketing ? "Origen de tus prospectos" : "Evolución de cobros"}</h2><p>{marketing ? "Distribución ilustrativa por canal de contacto" : `Resumen mensual de muestra · ${year} · MXN`}</p></div><span className="soft-tag">Datos de ejemplo</span></div>
              {marketing ? <div className="channels">{channels.map(c=><div className="channel" key={c.name}><div><span>{c.name}</span><strong>{c.count} <small>prospectos</small></strong></div><div className="channel-track"><span style={{width:`${c.count/84*100}%`}}/></div></div>)}</div> : <><div className="chart" role="img" aria-label={`Cobros ficticios por mes en ${year}; detalle disponible debajo.`}>{values.map((value,i)=><div className="bar-col" key={months[i]}><div className="bar-space">{value===null ? <span className="no-value">—</span> : <><span className="bar-value">{(value/1000).toLocaleString("es-MX")}k</span><div className={`bar ${i===available.length-1?"highlight":""}`} style={{height:`${value/200000*150}px`}}/></>}</div><span className="month">{months[i]}</span></div>)}</div><div className="chart-summary"><span>Total de muestra: <b>{money(total)}</b></span><span>{year==="2026"?"Oct.–dic.: sin datos de muestra":"12 meses de muestra"}</span></div><details><summary>Consultar los valores de la gráfica</summary><div className="table-wrap"><table><caption>Cobros ficticios por mes · {year}</caption><thead><tr><th>Mes</th><th>Cobros MXN</th></tr></thead><tbody>{values.map((v,i)=><tr key={i}><td>{months[i]}</td><td>{v===null?"Sin datos":money(v)}</td></tr>)}</tbody></table></div></details></>}
            </article>
            <article className="insight"><div className="insight-label"><Icon name={marketing?"chart":"money"}/> {marketing?"VISIÓN COMERCIAL":"CONTROL FINANCIERO"}</div><h2>{marketing?"Cada contacto tiene una historia":"El detalle detrás de cada ingreso"}</h2><p>{marketing?"El CRM reunirá prospectos, campañas y seguimiento. Esta vista anticipa cómo Dirección podrá revisar su crecimiento.":"Consulta el año, revisa cada mes y distingue los cobros de los saldos pendientes. Las cifras de esta pantalla son exclusivamente ilustrativas."}</p><div className="insight-bottom"><span>Diseño del portal<br/>de Dirección General</span><button onClick={()=>setSection(marketing?"Configuración":"Finanzas")}>{marketing?"Ver configuración":"Ver finanzas"}<Icon name="arrow" size={18}/></button></div></article>
          </section>
          <section className="panel lower-panel"><div className="panel-heading"><div><h2>Tu equipo y sus espacios</h2><p>La estructura acordada para Endo Woman</p></div><button className="text-button" onClick={()=>setSection("Equipo")}>Ver equipo <Icon name="arrow" size={16}/></button></div><div className="team-rows"><div className="team-row"><span className="round-icon"><Icon name="heart"/></span><div><strong>Atención clínica</strong><p>7 médicos y 1 enfermera · perfiles previstos</p></div><span className="row-state">Accesos pendientes</span></div><div className="team-row"><span className="round-icon light"><Icon name="team"/></span><div><strong>Operación y crecimiento</strong><p>1 administración y 3 personas de marketing</p></div><span className="row-state">Accesos pendientes</span></div></div></section>
        </> : <><section className="cards planned-cards">{planned[section].map((label,i)=><article className="metric-card" key={label}><div className="metric-label">{section} <Icon name={icons[sections.indexOf(section)]}/></div><h2>{label}</h2><p>{section==="Equipo"?"Distribución prevista en el mapa funcional de la clínica.":"Función contemplada en el alcance del ecosistema."}</p><div className="card-bottom"><span>Próxima etapa</span><span className="soft-tag">En preparación</span></div></article>)}</section><section className="panel empty-panel"><Icon name={icons[sections.indexOf(section)]} size={36}/><h2>{section==="Equipo"?"Cada persona, el acceso que necesita":section==="Pacientes"?"El inicio de una atención conectada":"La base de tu ecosistema"}</h2><p>Esta sección muestra la propuesta visual. Las cuentas, permisos y registros se incorporarán en el módulo funcional.</p><button className="primary-button" onClick={()=>setSection("Dashboard")}>Volver al dashboard <Icon name="arrow" size={18}/></button></section></>}
        <footer><span>ENDO WOMAN · CENTRO GINECOLÓGICO</span><span>Prototipo visual · Sin datos reales ni autenticación</span></footer>
      </main>
    </div>
  </div>;
}
