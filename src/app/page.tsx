"use client";
import { useState } from "react";
const sections = ["Centro de control", "Finanzas", "CRM y marketing", "Equipo", "Pacientes", "Configuración"] as const;
type Section = typeof sections[number];
const descriptions: Record<Section, string> = {
  "Centro de control": "Una visión compartida de tu clínica. Un espacio para dirigirla.",
  "Finanzas": "El dinero que entra a la clínica, con detalle y contexto.",
  "CRM y marketing": "Del primer contacto a la consulta: el recorrido de cada campaña.",
  "Equipo": "Personas, responsabilidades y accesos dentro de Endo Woman.",
  "Pacientes": "La base común que conectará atención y seguimiento.",
  "Configuración": "Los cimientos del ecosistema de Endo Woman."
};
const modules: Record<Section, string[]> = {
  "Centro de control": ["Finanzas", "CRM y marketing", "Equipo", "Pacientes"],
  "Finanzas": ["Registro de cobros", "Acumulado anual", "Devoluciones", "Reporte por servicio"],
  "CRM y marketing": ["Prospectos por canal", "Campañas", "Inversión", "Conversiones a citas"],
  "Equipo": ["7 médicos", "1 enfermera", "1 administración", "3 personas de marketing"],
  "Pacientes": ["Registro único", "Asignación al equipo", "Consentimientos", "Control de duplicados"],
  "Configuración": ["Datos de la clínica", "Servicios", "Usuarios y permisos", "Auditoría"]
};
export default function Home() {
  const [section, setSection] = useState<Section>("Centro de control");
  const [year, setYear] = useState("2026");
  return <div className="shell">
    <aside className="sidebar"><a className="brand" href="/">ENDO<br/>WOMAN<span>CENTRO GINECOLÓGICO</span></a>
      <div className="nav-label">DIRECCIÓN GENERAL</div>
      <nav aria-label="Navegación del CEO">{sections.map((s, i) => <button key={s} aria-current={section === s ? "page" : undefined} className={section === s ? "active" : ""} onClick={() => setSection(s)}><span aria-hidden="true">{["◈", "$", "↗", "♧", "♡", "⚙"][i]}</span>{s}</button>)}</nav>
      <div className="sidebar-bottom"><span className="dot"/> Entorno local de diseño<p>Versión inicial · 0.1.0</p></div>
    </aside>
    <div className="workspace"><header className="topbar"><span>Endo Woman <span className="muted">/ Ecosistema digital</span></span><div className="profile"><span className="avatar">DG</span><span>Dirección general<small>Vista del CEO · demostración</small></span></div></header>
      <main><div className="notice"><span>PROTOTIPO</span> Datos de ejemplo y estructura inicial. No hay pacientes, cobros ni cuentas reales.</div>
        <div className="heading"><div><p className="eyebrow">TU CLÍNICA, EN UN SOLO LUGAR</p><h1>{section}</h1><p className="subtitle">{descriptions[section]}</p></div><span className="phase">Etapa 01 / Núcleo</span></div>
        <section className="cards" aria-label="Componentes del módulo">{modules[section].map((label, i) => <article className="card" key={label}><span className="card-number">0{i+1}</span><h2>{label}</h2><p>{section === "Equipo" ? "Perfil previsto en el mapa funcional. Cuentas aún no creadas." : "Definido en el mapa funcional. Pendiente de conexión a datos."}</p>{section === "Centro de control" ? <button className="text-button" onClick={() => setSection(label as Section)}>Explorar módulo <span aria-hidden="true">↗</span></button> : <span className="tag">En preparación</span>}</article>)}</section>
        {section === "Finanzas" ? <section className="panel"><div className="panel-heading"><div><p className="eyebrow">CONTROL FINANCIERO</p><h2>Acumulado anual</h2></div><label>Año <select value={year} onChange={e => setYear(e.target.value)}><option>2026</option><option>2025</option></select></label></div><div className="empty"><span aria-hidden="true">↗</span><h3>Sin registros para {year}</h3><p>El acumulado mostrará los cobros registrados, sus devoluciones y el desglose mensual. Sin datos no se calcularán totales.</p></div></section> : <section className="two-columns"><article className="panel"><p className="eyebrow">PRIMERA ENTREGA</p><h2>El núcleo comienza aquí</h2><p>Esta base conectará los espacios de dirección, pacientes y equipo. Cada función compartirá información mediante permisos definidos.</p><ol className="steps"><li><span>01</span><div><strong>Estructura del proyecto</strong><small>Next.js, TypeScript e historial Git.</small></div><b>Preparada</b></li><li><span>02</span><div><strong>Identidad y permisos</strong><small>Próximo módulo funcional.</small></div></li><li><span>03</span><div><strong>Registros y gráficas</strong><small>Finanzas y marketing con datos verificables.</small></div></li></ol></article><article className="panel accent"><p className="eyebrow">CONSTRUIR CON CONTEXTO</p><h2>Una plataforma.<br/>Distintas responsabilidades.</h2><p>CEO, médicos, enfermería, administración, marketing y pacientes: cada perfil tendrá su propio espacio.</p><div className="pill-row"><span>Dirección</span><span>Equipo</span><span>Pacientes</span></div></article></section>}
        <footer>ENDO WOMAN <span>Prototipo navegable · Sin autenticación ni base de datos todavía</span></footer>
      </main>
    </div>
  </div>;
}
