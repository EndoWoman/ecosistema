# Endo Woman - Ecosistema digital

Base inicial del portal del CEO, construida con Next.js y TypeScript.

## Estado actual

Primera implementación local de cuentas y permisos: cuenta inicial CEO, inicio y cierre de sesión, roles verificados en servidor, activación, recuperación supervisada y desactivación. Los usuarios y sesiones se guardan en SQLite local, fuera de Git. No se crearon cuentas reales durante el desarrollo.

El dashboard sigue mostrando cifras ficticias. Equipo, servicios, cobros, prospectos y datos clínicos aún no tienen módulos operativos. Guía: [Cuentas y permisos](docs/CUENTAS-Y-PERMISOS.md).

Diseño y flujo de trabajo: docs/DISENO-Y-FLUJO-DE-TRABAJO.md.

## Iniciar en tu computadora

Requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Para detenerlo, pulsar Control+C en la terminal.

## Verificar

```sh
npm test
npm run build
npm run test:http
```

## Estructura

- `src/app`: pantallas y estilos del portal web.
- `src/core`: definiciones comunes del ecosistema.
- `src/modules`: organización futura de las funciones de negocio.
- `docs/MAPA-FUNCIONAL-Y-MVP.md`: alcance aprobado.

Siguiente etapa: revisar el acceso con la persona CEO y definir la persistencia operativa para equipo, servicios, cobros y prospectos. No almacenar información de pacientes, contraseñas ni credenciales en Git. Esta entrega es local; no habilita operación clínica ni despliegue público.
