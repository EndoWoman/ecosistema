# Cuentas y permisos — primera implementación local

14 de septiembre de 2026.

## Orden de trabajo corregido

Primero cuentas y permisos. Después, la base de datos operativa y los módulos de equipo, servicios, cobros y prospectos. El directorio interactivo de equipo propuesto durante esta tarea se retiró antes de integrar cambios.

La persistencia de identidad es una dependencia de este primer módulo: usuarios, hashes de contraseñas, sesiones, códigos y auditoría se guardan en SQLite en `private-data/auth.sqlite`. No es la base clínica u operativa definitiva. Este directorio está excluido de Git, igual que archivos de entorno y respaldos.

## Uso local

1. Ejecutar `npm run dev` y abrir exactamente `http://127.0.0.1:3000`.
2. Si no hay usuarios, aparece la creación de la cuenta inicial de Dirección. La persona titular escribe su propia contraseña nueva. No hay contraseñas predefinidas.
3. Iniciar sesión con esa cuenta y abrir **Usuarios y permisos**.
4. Crear una cuenta con nombre, correo y rol. Queda pendiente hasta establecer contraseña.
5. Generar el código cuando la persona esté lista. Es privado, de un solo uso y dura 30 minutos. No se envía por correo. La persona lo introduce en `/activar` y elige su contraseña.
6. Usar **Cerrar sesión** al terminar.

Los correos no se verifican automáticamente: Dirección debe comprobar la identidad antes de entregar códigos. Para las pruebas se utilizan exclusivamente cuentas sintéticas en bases temporales separadas. No se crearon cuentas reales como parte del desarrollo.

## Qué funciona

- Contraseñas de 12 a 128 caracteres, almacenadas con scrypt, sal aleatoria de 16 bytes y parámetros N=32768, r=8, p=1; nunca en texto plano.
- Sesiones de 8 horas, con tokens aleatorios de 32 bytes. En la base solo queda el hash del token. Cookie HttpOnly y SameSite=Strict; Secure si el origen configurado usa HTTPS.
- Acceso validado en servidor en las páginas privadas y en cada operación de administración. Ocultar botones no es el mecanismo de autorización.
- Dirección puede ver el dashboard y administrar cuentas. Los demás perfiles solo acceden a su portal inicial. No hay permisos clínicos o financieros operativos todavía.
- Activación, recuperación supervisada, desactivación, reactivación y cambios de rol. Cambiar rol o estado revoca sesiones y códigos anteriores.
- Protección contra modificar la propia cuenta desde el directorio; debe conservarse una cuenta CEO activa.
- Bloqueo de inicio tras 5 intentos por correo durante una ventana de 15 minutos; límite global adicional para el entorno local.
- Validación de origen y host en peticiones que modifican estado.
- Auditoría de creación, cambios, inicios/cierres de sesión y emisión/uso de códigos. La pantalla muestra los últimos 30 eventos.

El dashboard conserva sus gráficas sintéticas y sus etiquetas de demostración. Contar cuentas no equivale todavía a contabilizar el equipo contratado.

## Recuperación

Para un integrante, Dirección genera un código de recuperación desde Cuentas. Se cierran las sesiones existentes; al utilizar el código, la nueva contraseña sustituye a la anterior. Los códigos expirados, reemplazados, usados o pertenecientes a cuentas inactivas no sirven.

Para recuperar la propia cuenta CEO, el operador con acceso autorizado a esta computadora ejecuta:

```sh
npm run auth:recover -- correo-de-direccion
```

Este comando requiere acceso al archivo local y una cuenta CEO activa existente. Genera un código privado para `/activar`; no imprime la contraseña, ni crea una cuenta, ni altera el rol. No pegar ese código en chats ni guardarlo en Git. No se ejecutó este procedimiento contra una cuenta real durante el desarrollo.

## Configuración y límites

- Node.js 24. La API SQLite de Node puede emitir una advertencia experimental.
- `ENDOWOMAN_ORIGIN`: por defecto `http://127.0.0.1:3000`. Debe coincidir exactamente con el origen utilizado por el navegador.
- `ENDOWOMAN_AUTH_DB`: ruta opcional a una base de identidad distinta; las pruebas HTTP la apuntan a un directorio temporal.
- El alta inicial solo admite un origen local de loopback y se cierra tras crear la primera cuenta.
- Este servidor se mantiene ligado a `127.0.0.1`. No está publicado ni preparado todavía para uso clínico en producción.
- Pendientes antes de uso real compartido: infraestructura y base de datos definitivas, HTTPS, revisión de seguridad, MFA, verificación de correo y recuperación por canal verificado, permisos finos por módulo, monitoreo, respaldo y restauración ensayados. La auditoría local no es un registro inmutable frente al operador del servidor.
- La administración de permisos actual es por roles fijos; no incluye aún editar permisos individuales ni asignación clínica de pacientes.

## Validación reproducible

```sh
npm test
npm run build
npm run test:http
```

Las pruebas de dominio usan bases aisladas y comprueban persistencia, almacenamiento de hashes, sesiones, roles, revocación, caducidad y recuperación. La prueba HTTP levanta temporalmente el servidor en el puerto 3107 y verifica páginas protegidas, denegación de operaciones, origen, desactivación y cierre de sesión. No usar ese puerto para otra aplicación mientras se ejecuta.

Referencias técnicas: [autenticación en Next.js](https://nextjs.org/docs/app/guides/authentication), [cookies](https://nextjs.org/docs/app/api-reference/functions/cookies), [SQLite de Node.js](https://nodejs.org/download/release/v24.8.0/docs/api/sqlite.html).
