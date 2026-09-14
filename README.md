# Endo Woman - Ecosistema digital

Base inicial del portal del CEO, construida con Next.js y TypeScript.

## Estado actual

Prototipo local navegable con secciones de dirección, finanzas, marketing, equipo, pacientes y configuración. No tiene autenticación, base de datos ni registros reales. Las cifras de personal representan el alcance previsto, no cuentas creadas.

## Iniciar en tu computadora

Requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para detenerlo, pulsar Control+C en la terminal.

## Verificar

```sh
npm run typecheck
npm run build
```

## Estructura

- `src/app`: pantallas y estilos del portal web.
- `src/core`: definiciones comunes del ecosistema.
- `src/modules`: organización futura de las funciones de negocio.
- `docs/MAPA-FUNCIONAL-Y-MVP.md`: alcance aprobado.

Próximo módulo: identidad, permisos en servidor y organización. Después se incorporarán registros financieros y comerciales. No almacenar información real de pacientes, contraseñas ni credenciales en Git. El despliegue público requiere implementar y validar los controles de acceso.
