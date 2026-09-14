# Diseño y flujo de trabajo

## Referencias aplicadas

- Pantallas exportadas de Google Stitch aportadas por la clínica.
- Paleta del archivo DESIGN.md: vino #974258, rosa #F08AA1, rosa claro #FEC6D3 y fondo #F9F9F9.
- Inter para textos, alojada localmente mediante @fontsource/inter. Los títulos usan Georgia/Times para conservar la apariencia con remates de las capturas. DESIGN.md propone Manrope, pero no corresponde a la apariencia de los títulos en las capturas; la coincidencia tipográfica exacta queda por confirmar.
- Logo original PNG copiado sin alteración a public/brand/endo-woman-original.png. El encuadre se realiza con CSS sobre fondo vino porque el original tiene letras blancas y transparencia.

## Qué contiene esta entrega

Prototipo del CEO con navegación, tarjetas, gráfica financiera por año, tabla accesible con sus valores y distribución de prospectos. Todos los importes y prospectos son sintéticos y están identificados como demostración. Los tamaños del equipo proceden del alcance, no de cuentas reales. No hay autenticación ni persistencia de datos.

## Dónde se trabaja

Código: carpeta local Documentos/EndoWoman/plataforma, abierta en Visual Studio Code. Git guarda el historial local; GitHub conserva las versiones después de subirlas. La vista local requiere mantener el servidor en ejecución.

Stitch sigue siendo una herramienta de diseño y referencia. Las pantallas aprobadas se implementan en Next.js; modificar Stitch por sí solo no modifica este repositorio ni la aplicación. No hay sincronización automática entre ambos.
