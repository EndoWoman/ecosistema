# Base operativa local — equipo, servicios, cobros y prospectos

Entrega del 14 de septiembre de 2026. Implementación funcional local; no es un despliegue para operación clínica compartida.

## Dónde se guardan los datos

Se amplió la base SQLite existente: `private-data/auth.sqlite`. Cuentas, sesiones y nuevos registros están en el mismo archivo, con relaciones verificadas por la base. Las tablas operativas llevan prefijo `op_`; la migración inicial es aditiva y transaccional, sin borrar cuentas. `op_migrations` registra su versión.

La aplicación conserva los registros al recargar y reiniciar. No usa localStorage para datos operativos. La base y los respaldos están excluidos de Git: a GitHub solo se suben código, documentación y pruebas sintéticas.

## Funciones disponibles

| Registro | Campos y comportamiento |
|---|---|
| Equipo | Nombre, correo único, función, cuenta vinculada opcional, activo/inactivo. Alta y edición. La cuenta de acceso conserva su rol y estado independientes. |
| Servicios | Nombre único, duración y tarifa en MXN; alta, edición y estado. Desactivar impide nuevos cobros asociados. |
| Cobros | Fecha de recepción, importe, efectivo/terminal, concepto, servicio, médico opcional y autor. El importe recibido se captura expresamente; no se infiere de la tarifa. |
| Devoluciones | Vinculadas al cobro original, con importe, fecha y motivo. No pueden exceder el importe aún disponible ni preceder al cobro; conservan el método original. |
| Prospectos | Nombre, correo o teléfono, origen, fecha y etapa. Se bloquean coincidencias de correo normalizado o teléfono reducido a dígitos, sin fusionar personas automáticamente. |

No se agregan personas, tarifas ni transacciones de ejemplo a la base del usuario. El catálogo y el directorio empiezan vacíos. Las cuentas previamente creadas se conservan y pueden vincularse al equipo sin duplicarlas.

El directorio de equipo no crea ni desactiva cuentas. Su función laboral tampoco modifica los permisos del sistema. Dirección administra accesos desde **Usuarios y permisos**.

## Permisos actuales

| Perfil | Equipo | Servicios | Cobros y devoluciones | Prospectos | Resumen ejecutivo |
|---|---|---|---|---|---|
| CEO | Consultar y editar | Consultar y editar | Consultar y registrar | Consultar y editar | Sí |
| Administración | Consultar | Consultar | Consultar y registrar | No | No |
| Marketing | No | No | No | Consultar y editar | No |
| Médico, enfermería, paciente | No | No | No | No | No |

Los permisos se verifican tanto al abrir páginas como en las operaciones del servidor y en el acceso a datos. Se consulta el estado actual de la cuenta; una cuenta desactivada pierde acceso.

## Exactitud e historial financiero

- Importes guardados como enteros en centavos; no se redondean entradas con más de dos decimales.
- Pagos y devoluciones se insertan como movimientos separados. No hay borrado ni sobrescritura de pagos.
- Cada cobro conserva el nombre del servicio y del médico al momento del registro. Cambiar catálogos no altera el historial.
- Cada envío tiene una clave única. Reintentar la misma solicitud devuelve el mismo registro; cambiar su contenido con la misma clave se rechaza.
- Las operaciones y sus registros de auditoría se guardan en una misma transacción. La bitácora conserva autor, fecha y valores anteriores/nuevos; por ahora se almacena para soporte y no tiene pantalla propia.
- Las fechas operativas son fechas civiles de Puebla. Se validan días reales y se rechazan fechas futuras. Las devoluciones se suman en su propia fecha, incluso en un año distinto al cobro.
- Un cobro nuevo capturado manualmente otra vez con una solicitud nueva no se considera automáticamente duplicado: no se puede inferir si son dos pagos reales iguales. Referencias externas únicas y conciliación quedan pendientes.

## Dashboard conectado

Las cifras ficticias anteriores se sustituyeron por consultas a la base. El CEO ve cobros brutos, devoluciones, netos, meses del año seleccionado, netos por método, prospectos por origen y año, equipo y servicios activos actuales.

Un mes sin movimientos significa **sin registros**, no cobertura comprobada sin ingresos. Se muestra el primer y último día registrado en el año, sin afirmar continuidad. Los cobros no son utilidad; terminal no implica depósito bancario conciliado. Las etapas comerciales no equivalen automáticamente a citas, consultas o ingresos atribuidos.

## Orden para probar

1. Entrar con una cuenta CEO.
2. Agregar un servicio de prueba y, si se necesita, un médico de prueba.
3. Registrar un cobro y revisar el año correspondiente en el dashboard.
4. Registrar una devolución parcial y comprobar brutos, devoluciones y netos.
5. Agregar un prospecto con origen y revisar su conteo en el mismo año.
6. Recargar para comprobar persistencia.

Usar registros de prueba mientras se valida este entorno. No importar datos clínicos o listas reales de pacientes en esta etapa.

## Respaldo y pruebas

```sh
npm test
npm run build
npm run test:http
npm run db:backup
```

El respaldo usa `VACUUM INTO` para obtener una instantánea consistente en `backups/` con nombre único y permisos privados, y comprueba su integridad. Es una copia en la misma computadora, no un respaldo externo automático. Nunca sobrescribe la base activa.

La prueba de restauración abre una copia temporal y comprueba cuentas y totales. Las otras pruebas verifican preservación de cuentas, persistencia, permisos, duplicados, importes, devoluciones, periodos e historial. Las pruebas HTTP usan una base temporal independiente.

## Próximas ampliaciones

Infraestructura compartida, respaldo externo programado, revisión de seguridad, conciliación, saldos y cortes de recepción, exportación financiera anual, campañas y gasto, asignación comercial, vinculación a pacientes/citas y expedientes clínicos. No se sustituyeron servicios externos ni se migraron datos reales.
