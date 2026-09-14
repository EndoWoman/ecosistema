# Endo Woman — Ecosistema digital, mapa funcional y primer MVP

Versión 2 · 13 de septiembre de 2026

Actualización consolidada: gráficas de marketing, control financiero, acumulado anual y alcance funcional del MVP del CEO.

Documento de alcance para diseño y desarrollo. No representa software ya construido ni una estimación de costo o plazo.

## 1. Decisión de producto

Endo Woman tendrá su propio ecosistema para atención clínica, operación, seguimiento de pacientes, CRM, marketing y comunidad. El objetivo final es sustituir Eleonor y GoHighLevel; no conservarlos como dependencias operativas del producto.

Cada persona utilizará una cuenta individual de Endo Woman y accederá a las funciones correspondientes a su rol. Los servicios técnicos necesarios para entregar correo, notificaciones o procesar pagos podrán existir detrás de la plataforma sin exigir al personal otra cuenta para su trabajo cotidiano. La sustitución del correo institucional requiere especificar buzones, calendarios, archivos y migración; no queda resuelta solo con desarrollar notificaciones.

La construcción comienza por el núcleo central y el portal del CEO. Luego se habilitan la experiencia de pacientes y los espacios de trabajo. Los requisitos de todos los perfiles se contemplan desde el inicio.

## 2. Dos entradas y un sistema central

| Entrada | Perfiles | Experiencia |
|---|---|---|
| Pacientes | Aproximadamente 1,000 usuarias | App para iOS y Android y acceso web, conectados al mismo núcleo. |
| Personal | 7 médicos, 1 enfermera, 1 administración, 3 personas de marketing y CEO | Portal web con dashboard y herramientas según permisos. |

El CEO accede desde Personal al centro de dirección y administración general. Su cuenta es individual. La visibilidad del negocio y la administración de permisos son distintas del permiso de consultar contenido clínico individual; este último se define expresamente.

## 3. El cerebro: núcleo compartido

| Componente | Responsabilidad |
|---|---|
| Organización | Datos de la clínica, áreas, servicios, profesionales y configuración general. |
| Identidad | Cuentas, autenticación, recuperación, sesiones y desactivación de accesos. |
| Permisos | Acciones por rol, asignación de pacientes y autorizaciones de acceso. |
| Registro de personas | Identificadores internos, datos de contacto y control de duplicados. Un prospecto puede convertirse en paciente sin duplicar su identidad. |
| Datos operativos | Bases para citas, consultas, cobros y tareas vinculadas a personas y servicios. |
| Datos clínicos | Separación entre lo reportado por la paciente y lo documentado por el equipo. |
| Documentos | Archivos con origen, autor, fecha, permisos y estado de publicación. |
| Comunicaciones | Preferencias, plantillas, recordatorios e historial de entrega. |
| Auditoría | Registro de accesos y cambios relevantes, incluido quién modifica permisos. |
| Indicadores | Cálculos con fuente, periodo y fecha de actualización identificables. |
| Continuidad | Respaldos, restauración y monitoreo técnico. |

Una plataforma unificada no obliga a colocar aplicación, archivos y respaldos en un único servidor físico. La infraestructura se seleccionará al concretar requisitos de operación y datos.

## 4. Portal del CEO

### Navegación propuesta

1. Centro de control.
2. Operación.
3. Pacientes.
4. Equipo.
5. Finanzas.
6. CRM y marketing.
7. App y comunidad.
8. Usuarios y permisos.
9. Configuración y auditoría.

### Centro de control

Presentará indicadores con acceso al detalle autorizado: consultas, solicitudes pendientes, cobros, prospectos, uso del diario y reportes de comunidad. Cada bloque indicará su periodo y disponibilidad.

En el primer MVP estarán activos los indicadores respaldados por funciones reales del núcleo y por los registros básicos financieros y comerciales descritos en la sección 7. Los indicadores de futuros módulos aparecerán como pendientes de activación, sin cifras ficticias. Un prototipo podrá contener ejemplos rotulados como datos de demostración.

### Gráficas de marketing para el CEO

El centro de control incluirá un resumen gráfico de marketing con acceso al detalle en CRM y marketing. Dirección podrá comparar periodos y filtrar por campaña, canal y servicio, cuando esos datos estén disponibles.

| Gráfica | Qué mostrará |
|---|---|
| Embudo comercial | Prospectos, solicitudes de cita, citas confirmadas, consultas realizadas y pacientes con pago registrado. Cada etapa tendrá una definición y se evitará contar a una misma persona varias veces como paciente nueva. |
| Prospectos por canal | Volumen por origen identificado: redes, buscadores, recomendaciones u otros; incluirá origen desconocido. |
| Evolución de campañas | Prospectos y conversiones por semana o mes, con periodos comparables. |
| Inversión y costos | Gasto por campaña, costo por prospecto y costo por paciente nueva con consulta realizada, cuando existan datos de inversión y atribución suficientes. |
| Ingresos atribuidos | Cobros asociados a campañas con una regla de atribución explícita; se identificarán cobros sin atribución. No se presentará como utilidad. |
| Retorno publicitario | Relación entre ingresos atribuidos y gasto publicitario del periodo, cuando ambos estén disponibles y sean comparables. |
| Seguimiento comercial | Prospectos pendientes, tiempos de primera respuesta y conversiones por responsable. |
| Redes sociales | Alcance, interacciones y crecimiento de audiencia cuando exista una fuente disponible; se distinguirán de las citas y los ingresos del centro. |

Cada gráfica mostrará fuente, periodo y última actualización. Las métricas de campañas, gasto y redes podrán proceder de cargas controladas o conexiones técnicas con los canales originales; su consulta y gestión se centralizarán en Endo Woman y no requerirán GoHighLevel. No se asumirá que todos los canales permiten obtener todas las métricas.

Estas gráficas se incluyen desde el diseño del portal CEO. El MVP activa prospectos por origen, evolución de prospectos e inversión por campaña mediante registros básicos propios. Las conversiones ligadas a citas, la atribución de cobros y las métricas de redes se activan al contar con los módulos y fuentes necesarios. Los datos clínicos privados no se utilizarán para segmentación publicitaria.

### Dinero que entra a la clínica: control financiero del CEO

El dashboard del CEO incluirá un resumen financiero y acceso al detalle de los movimientos. Dirección podrá consultar por día, semana, mes, año o periodo personalizado y filtrar por servicio, profesional asociado y método de pago.

| Indicador o vista | Alcance |
|---|---|
| Cobros registrados | Importes efectivamente registrados como pagados, separados de citas agendadas y cargos pendientes. |
| Evolución de cobros | Gráfica diaria, semanal, mensual y anual, con comparación entre periodos equivalentes. |
| Acumulado anual | Total cobrado del año seleccionado, desglose de enero a diciembre, devoluciones y neto; comparación con el mismo tramo del año anterior cuando exista historial. |
| Reporte anual exportable | Resumen y detalle descargables de cobros por mes, servicio y método de pago, con fecha de generación y filtros aplicados. |
| Métodos de pago | Efectivo y terminal; otros métodos se habilitarán si la clínica los utiliza. |
| Cobros por servicio y profesional | Distribución de cobros por el servicio y profesional asociados. No representa honorarios a pagar al médico. |
| Saldos pendientes | Cargos, abonos y saldo por operación, sin contar el saldo pendiente como dinero recibido. |
| Devoluciones y ajustes | Movimientos separados, con motivo, responsable y fecha; los movimientos originales conservarán su historial. |
| Cortes de recepción | Efectivo esperado, efectivo contado y diferencias, considerando los movimientos registrados de caja. Pagos con terminal separados del efectivo. |
| Detalle de movimientos | Fecha, concepto, importe, método, estado, referencia y responsable del registro, con acceso según permisos. |

Los pagos con terminal registrados por recepción se distinguirán de depósitos bancarios conciliados. La plataforma no afirmará que el dinero llegó al banco sin una fuente que permita verificarlo. Un pago podrá distribuirse entre varios conceptos sin duplicarse en los totales; los anticipos se aplicarán sin volver a contarse como una nueva entrada de dinero.

El total de cada gráfica deberá coincidir con el detalle de movimientos bajo los mismos filtros. El resumen mostrará cobros brutos, devoluciones y cobros netos del periodo con definiciones visibles. Estos cobros no equivalen a utilidad: gastos, comisiones, impuestos y resultados contables requieren un alcance adicional.

El MVP incluye registro financiero básico para alimentar las gráficas y el acumulado anual. Los cortes completos, saldos y conciliación se amplían con la operación de recepción. No depende de conservar Eleonor ni GoHighLevel. Si solo existen datos de parte del año, el reporte indicará la cobertura disponible; los meses sin datos no se presentarán como meses comprobados sin ingresos. Los históricos solo se incorporarán mediante una carga revisada y conciliada.

## 5. App de pacientes

Se mantiene la navegación aprobada y los diseños de Stitch como referencia visual.

| Sección | Funciones previstas |
|---|---|
| Dashboard | Último registro con fecha, resumen semanal, próxima cita, indicaciones compartidas y acceso a Registrar cómo me siento. |
| Mi salud | Resumen, diario adaptativo, mapa del dolor, ciclo menstrual, evaluaciones, evolución, tratamiento, estudios y Mi historia. |
| Mis citas | Solicitud, disponibilidad cuando exista el módulo, confirmación, cambios y preparación de consulta. |
| ENDO AI | Asistente con alcance gradual: orientación de uso, servicios y contenido aprobado inicialmente. Funciones clínicas personalizadas requieren definición y validación independientes. |
| Red de Endometriosis | Comunidad voluntaria con perfil comunitario, publicaciones, comentarios, reacciones, reportes y moderación. Grupos y eventos en ampliaciones. |
| Perfil | Datos personales, seguridad, notificaciones, consentimientos y permisos para compartir registros. |

El diario debe ser breve y ramificado. Las preguntas e instrumentos se definirán con el equipo clínico. Las gráficas distinguirán registros ausentes de valores de dolor cero. El profesional no modificará el contenido reportado por la paciente; las correcciones y anotaciones tendrán autoría e historial.

El perfil comunitario no expone automáticamente datos del diario, documentos ni expediente. La primera versión de comunidad no incluye mensajes privados entre pacientes.

## 6. Portal del equipo

| Rol | Dashboard | Funciones propias del ecosistema |
|---|---|---|
| Médicos | Agenda, pacientes asignadas, resúmenes disponibles y pendientes. | Consulta, expediente, documentos, indicaciones y seguimiento autorizado. |
| Enfermería | Llegadas, preparación de consulta y tareas. | Signos vitales, datos de preparación y seguimiento asignado. |
| Administración / recepción | Agenda general, confirmaciones, llegadas y cobros. | Alta de pacientes, citas, estados de atención, registro de pagos y cortes. |
| Marketing | Prospectos, tareas comerciales, campañas y resultados disponibles. | CRM propio, formularios, seguimiento, plantillas y atribución con fuente conocida. Moderación si se asigna expresamente. |

El sistema de expediente clínico propio debe cubrir los flujos reales que hoy se usan en Eleonor antes de retirarlo. El reemplazo de GoHighLevel exige inventariar los flujos utilizados, por ejemplo formularios, embudos, mensajes y automatizaciones; no basta con una lista de contactos.

## 7. Primer MVP: núcleo y control del CEO

### Objetivo

El CEO puede configurar la clínica, administrar al equipo y sus accesos, mantener los catálogos y revisar la actividad del sistema desde Endo Woman. También puede consultar gráficas financieras, acumulados anuales y métricas comerciales básicas alimentadas por registros propios. Este MVP establece la base funcional del ecosistema; todavía no sustituye toda la operación clínica.

### Incluye

| Prioridad | Entrega | Criterio de aceptación |
|---|---|---|
| 1 | Entrada de Personal e identidad | Acceso individual, recuperación, cierre de sesión y desactivación. La cuenta desactivada pierde acceso. |
| 2 | Roles y permisos | CEO configura permisos; las restricciones se aplican en servidor además de la interfaz. Se comprueban accesos permitidos y denegados. |
| 3 | Organización | Edición de datos de la clínica, áreas y configuración básica. |
| 4 | Directorio del equipo | Alta, edición y desactivación de personal, rol y asignación. No se crean cuentas reales sin datos verificados. |
| 5 | Catálogo de servicios | Alta, edición, duración prevista, precio configurado y estado activo. Cambios futuros no alteran movimientos históricos. |
| 6 | Base de pacientes | Estructura e identificación únicas, alta básica y detección de posibles duplicados. Importaciones iniciales se prueban con datos sintéticos. |
| 7 | Dashboard CEO | Conteos verificables del núcleo, resumen financiero y comercial, actividad reciente y estado de los módulos. Sin ingresos o métricas clínicas simuladas en producción. |
| 8 | Auditoría | Se registra autor, fecha y acción para cambios de cuentas, permisos y configuración. |
| 9 | Respaldo y recuperación | Se demuestra restauración en un entorno de prueba antes de alojar datos reales. |
| 10 | Registro financiero básico | Captura autorizada de cobros en efectivo o terminal, fecha, concepto, importe, servicio y responsable. Devoluciones vinculadas, historial de ajustes y control de duplicados. No procesa tarjetas. |
| 11 | Gráficas financieras y reporte anual | Totales por periodo, método y servicio; acumulado anual y desglose mensual. Exportación de resumen y detalle con totales coincidentes y cobertura de datos explícita. |
| 12 | Registro comercial básico | Campañas, canales, prospectos y gasto por campaña, con fuente y fecha. Acceso para CEO y personal comercial autorizado, sin información clínica. |
| 13 | Gráficas de marketing básicas | Prospectos por origen y periodo, inversión por campaña y costo por prospecto cuando hay datos comparables. Sin divisiones entre cero ni conversiones o atribuciones inventadas. |

Los formularios mínimos de captura financiera y comercial forman parte del núcleo, con permisos para el personal responsable. Los dashboards completos de administración y marketing se desarrollan después. Así el CEO puede consultar datos reales sin esperar a que estén terminados todos los portales.

### Validación del primer MVP

- Un cobro nuevo aparece una sola vez en el detalle, la gráfica y el acumulado anual del periodo correspondiente.
- Una devolución actualiza los cobros netos sin borrar el movimiento original; se registra en su fecha y se vincula al cobro de origen.
- El acumulado anual coincide con la suma de sus meses y con el reporte exportado bajo los mismos filtros.
- Las comparaciones anuales distinguen un año completo de uno parcial y muestran periodos equivalentes.
- La fecha operativa de los movimientos usa la zona horaria de la clínica de forma consistente.
- Los prospectos por campaña coinciden con su detalle y los de origen desconocido siguen visibles.
- El costo por prospecto indica su periodo y fuente de gasto; se muestra como no calculable cuando falta información o no hay prospectos.
- Una persona sin permiso financiero o clínico no puede consultar esos datos, aunque conozca la dirección de la pantalla.
- Los registros de demostración están separados de la operación real.

### Fuera de este primer MVP

App pública de pacientes, diario operativo, comunidad, asistente AI, agenda clínica completa, expediente clínico completo, CRM completo y sus automatizaciones, envío de campañas, conexión automática con métricas de redes, atribución avanzada, contabilidad completa, cortes integrales de recepción, conciliación bancaria automática, procesamiento de pagos, migración masiva y cierre de cuentas de proveedores.

El prototipo visual previo al MVP mostrará las pantallas y recorridos. Se rotulará como demostración y no se considerará una implementación segura de cuentas o permisos.

## 8. Secuencia de construcción

| Etapa | Entrega | Dependencia |
|---|---|---|
| A | Prototipo del núcleo y CEO | Este alcance y revisión de los recorridos. |
| B | Primer MVP funcional del núcleo y CEO, con registro financiero y comercial básico, gráficas y reporte anual | Modelo de datos, permisos, captura autorizada e infraestructura implementados. |
| C | App de pacientes: cuenta, diario, evolución y perfil | Núcleo funcional. Diseño de las seis secciones; habilitación gradual. |
| D | Espacios de médicos, enfermería y administración; agenda, expediente y cobros propios | Núcleo y definición detallada del flujo clínico. Se construyen los flujos compartidos completos. |
| E | CRM y marketing propios; comunidad moderada y ENDO AI inicial | Flujos comerciales inventariados, fuentes de contenido y responsables definidos. |
| F | Migración, piloto y retiro de proveedores por módulo | Datos conciliados, funciones probadas y recuperación disponible. |

El orden de presentación sigue la dirección solicitada: cerebro y CEO, pacientes y equipo. Para operar funciones conectadas se entregarán ambas partes: por ejemplo, solicitar una cita requiere también que recepción pueda gestionarla. No se habilitarán botones que prometan una atención todavía inexistente.

## 9. Sustitución de sistemas actuales

La operación final no dependerá de Eleonor ni GoHighLevel. Durante la transición, cualquier uso temporal tiene como finalidad mantener la operación hasta que su reemplazo esté listo.

1. Inventariar funciones y datos realmente usados en cada sistema.
2. Verificar los mecanismos de exportación disponibles y sus condiciones.
3. Definir correspondencias de pacientes, citas, expedientes, documentos y prospectos.
4. Probar una migración controlada y resolver duplicados sin fusionar personas automáticamente.
5. Conciliar cantidades, relaciones y muestras completas de documentos e historiales.
6. Validar el trabajo de recepción, médicos, enfermería y marketing en el nuevo sistema.
7. Acordar corte de cambios y trasladar los datos finales.
8. Retirar cada herramienta cuando su sustitución esté comprobada, conservando lo que corresponda según la política definida.

No se cancelarán servicios, borrarán fuentes ni importarán datos clínicos reales como parte de la elaboración de este documento.

## 10. Decisiones de detalle durante el diseño

- Identidad y facultades de la persona CEO; confirmar si también ocupa otro perfil.
- Quién realiza recepción y quién administra permisos cuando el CEO no está disponible.
- Catálogo de servicios, duración, tarifas y horarios.
- Formularios y documentos actuales de consulta, procedimientos y enfermería.
- Flujos de CRM, mensajes, campañas y automatizaciones utilizados hoy.
- Qué significa reemplazar Google: comunicaciones desde el sistema o también buzones, calendarios y archivos.
- Responsable de moderación y tiempos de atención de reportes.
- Contenido del diario, reglas de publicación de indicaciones y alcance inicial de ENDO AI.
- Reglas aplicables a privacidad, conservación de datos y documentación clínica, a validar antes de operar con datos reales.

Estas decisiones se resolverán por módulo y no impiden iniciar el prototipo del núcleo con datos de demostración.

## 11. Siguiente entregable de diseño

Prototipo navegable con: entrada Pacientes / Personal, acceso de Personal, centro de control CEO, gráficas de marketing, finanzas con vista anual y desglose mensual, captura financiera y comercial básica, directorio del equipo, usuarios y permisos, catálogo de servicios, base de pacientes, configuración y auditoría. Empleará la identidad vino y rosa de las referencias y una presentación consistente en escritorio y celular.

El prototipo permitirá revisar la estructura antes de comprometer una tecnología o estimar el desarrollo completo.
