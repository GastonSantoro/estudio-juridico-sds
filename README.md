# Sebastian de Souza — Abogado · Sitio web

Sitio web estático (HTML5 + CSS3 + JavaScript nativos, sin frameworks, sin base de datos, sin paso de compilación) para el estudio jurídico de Sebastian de Souza, Morón, Provincia de Buenos Aires.

> **Estado:** diseño y front-end terminados y probados en navegador. **No está publicado** y **el formulario aún no envía mensajes** hasta configurar un servicio (ver [Formulario](#formulario-de-consultas)). Ver [Pendientes antes de publicar](#pendientes-antes-de-publicar).

## Estructura

```
/
├── index.html                  Sitio completo One-Page (inicio, áreas, sobre mí, equipo, contacto)
├── privacidad.html             Aviso de privacidad y aspectos legales
├── 404.html                    Página de error
├── css/styles.css              Todos los estilos (scroll-margin-top, variables CSS)
├── js/init.js                  Marca "JS disponible" antes del primer render
├── js/main.js                  Menú, ScrollSpy, preselección de áreas, formulario, mapa, WhatsApp
├── assets/fonts/               Cormorant Garamond e Inter (autoalojadas, .woff2)
├── assets/images/              Imágenes optimizadas (.webp) + og-imagen.jpg
├── assets/icons/sprite.svg     Íconos lineales
├── docs/
│   └── referencia-multipagina/ Respaldo de los HTML multipágina anteriores
├── robots.txt
└── tools/
    ├── serve.mjs               Servidor local de previsualización (Node, sin dependencias)
    └── set-domain.mjs          Fija dominio en canonical/OG y genera sitemap.xml + robots.txt
```

El sitio utiliza una arquitectura **One-Page (página única)** unificada en `index.html`, estructurada en cinco secciones principales con identificadores específicos:
- `#inicio`: Hero y presentación principal.
- `#areas`: Detalle exhaustivo de las 9 áreas de práctica jurídica y sus servicios.
- `#sobre-mi`: Presentación profesional de Sebastian de Souza y ámbito de actuación.
- `#equipo`: Perfiles de Sebastian de Souza y Oriana Belén Albornoz.
- `#contacto`: Canales de atención directa, ubicación en Morón, mapa bajo demanda y formulario de consultas.

La navegación cuenta con **desplazamiento suave** (`scroll-behavior: smooth`), compensación de altura fija de la barra de navegación (`scroll-margin-top`) para evitar que el encabezado tape los títulos, y un módulo de **ScrollSpy** que resalta dinámicamente la sección activa (`aria-current="page"`). La página legal `privacidad.html` se mantiene de forma independiente para cumplir con los requerimientos informativos. Los archivos HTML de la versión multipágina previa se preservan en `docs/referencia-multipagina/` como referencia para futuras ampliaciones.

## Vista previa local

Requiere Node.js 18+ (solo para previsualizar):

```bash
node tools/serve.mjs        # → http://localhost:8080
```

Los íconos (`<use href="…sprite.svg">`) no se muestran si se abre el HTML con doble clic (`file://`); usar el servidor local.

## Dirección visual y animaciones

Portada **asimétrica y editorial**: nombre en gran formato (Cormorant Garamond) a la izquierda y un bloque arquitectónico vertical con marco dorado fino a la derecha. Paleta: blanco, negro suave `#171717`, gris `#454545`, gris claro `#F3F2EF` y dorado `#B69A62` solo como acento (líneas, números, detalles de botones). Para texto pequeño se usa un dorado más oscuro (`--c-gold-deep`) que cumple contraste AA.

- **Aparición con scroll:** Títulos de sección, tarjetas de áreas de práctica y bloques de equipo emergen de forma fluida (fade-in y desplazamiento hacia arriba sutil) mediante un `IntersectionObserver` liviano que se desconecta tras revelar cada elemento para optimizar memoria y rendimiento.
- **Microinteracciones sobrias:** Líneas expansivas con acento dorado al hover en enlaces del menú (`.site-nav__link`) y enlaces de consulta (`.text-link`); micro-elevación táctil en botones (`.btn`); activación sutil de fondo y línea lateral dorada en tarjetas de áreas (`.area`); y enfoque de marco fotográfico en los perfiles de equipo (`.profile`).
- **Encabezado dinámico:** Transición suave al scrollear (`.site-header.is-scrolled`) con fondo translúcido y desenfoque (`backdrop-filter: blur(12px)`), manteniendo legibilidad sin interferir con la lectura.
- **Accesibilidad:** Respeto estricto a `prefers-reduced-motion: reduce`, desactivando automáticamente transiciones y revelados para usuarios con reducción de movimiento habilitada en su sistema operativo.

## Cómo modificar el contenido

| Qué cambiar | Dónde |
|---|---|
| **Nombre / marca** | `brand` en el encabezado y `site-footer__name` en el pie de `index.html` y `privacidad.html`; `<h1>` de `index.html#inicio`; `<title>` y metadatos. |
| **Teléfono, WhatsApp, correo, domicilio** | Buscar y reemplazar en todos los HTML: `5491141988876` (WhatsApp y `tel:`), `11 4198-8876` (texto visible), `sebastiandesouza.abogado@gmail.com`, `Almirante Guillermo Brown 1378`. También constantes `CONTACT` en `js/main.js` y bloque JSON-LD de `index.html`. |
| **Áreas de práctica** | Sección `index.html#areas` (un `<article class="area-card">` por área). Opciones del selector del formulario en `index.html#contacto`: `<select id="f-topic">`. Los identificadores deben coincidir con `data-select-area`. **No agregar áreas sin confirmación del cliente.** |
| **Textos de presentación** | Portada: `index.html#inicio` (`hero__tagline`, `hero__intro`). Sobre mí: `index.html#sobre-mi`. |
| **Perfiles profesionales** | Sección `index.html#equipo` (un `<article class="profile">` por persona; copiar uno para agregar un profesional). |
| **Imágenes** | Reemplazar los `.webp` de `assets/images/` conservando nombres, o actualizar `src`/`srcset`/`alt`. Formato recomendado: WebP, ~900 px (vertical) y ~1400 px (horizontal), < 120 KB. |
| **Fotografías auténticas (futuro)** | En `index.html#sobre-mi` y `index.html#equipo`: reemplazar los marcos de iniciales o descomentar las etiquetas `<img>` según las instrucciones en los comentarios HTML. No requiere cambios de CSS. |
| **Logotipo / monograma (futuro)** | Colocar el archivo en `assets/icons/`, reemplazar el contenido de `.brand` y reemplazar `<link rel="icon" href="data:,">` por el favicon real en todos los HTML. |
| **Colores, tipografías, espacios** | Variables en `:root` al inicio de `css/styles.css`. |
| **Metadatos SEO** | `<title>`, `meta description` y `og:*` en el `<head>` de cada página. Canonical/OG URL/OG image y sitemap: ver *Dominio*. |
| **Enlaces de contacto** | WhatsApp: `https://wa.me/549<área sin 0><número sin 15>` (formato internacional sin espacios, guiones ni paréntesis). Teléfono: `tel:+549…`. |

> **Sobre el número:** se asumió que **11 4198-8876** es un celular con WhatsApp (el cliente lo indicó como teléfono y WhatsApp), por lo que se normalizó a `+54 9 11 4198-8876` → `wa.me/5491141988876`. Si el número fuera de línea fija, el enlace `tel:` debería ser `+541141988876` (sin el `9`). **Confirmar con el cliente.**

## Formulario de consultas

**Estado actual: front-end completo, sin servicio de envío conectado.** El sitio no tiene back-end ni base de datos, y no se simula ningún envío:

- Si `data-endpoint` está vacío (estado actual), el formulario valida los campos y, en lugar de un falso éxito, informa que el envío directo no está habilitado y ofrece **WhatsApp** y **correo** con el texto ya preparado.
- La confirmación de éxito aparece **solo** si el servicio responde con éxito (HTTP 2xx).
- Protección contra bots: campo trampa (`_gotcha`) y tiempo mínimo de 3 s antes de enviar. Para mayor protección, activar el antispam/captcha del proveedor elegido.
- No se pide DNI ni documentación, y no hay adjuntos.

### Activación (Formspree u otro servicio compatible con JSON)

1. El propietario crea su propia cuenta en el servicio (p. ej. [Formspree](https://formspree.io)) con **su** correo y crea un formulario.
2. Copiar la URL del formulario (p. ej. `https://formspree.io/f/xxxxxxxx`) en la sección `#contacto` de `index.html`:
   ```html
   <form … id="consulta-form" data-endpoint="https://formspree.io/f/xxxxxxxx">
   ```
   (No es una clave secreta; es un identificador público de formulario. **Nunca** publicar claves/API secretas en el front-end.)
3. Si se usa otro proveedor, **actualizar `connect-src` en la política CSP** (`<meta http-equiv="Content-Security-Policy">`) de `contacto.html`; de lo contrario el navegador bloqueará el envío.
4. Probar un envío real, verificar que llegue el correo y recién entonces dar el formulario por operativo.
5. **Privacidad:** el nombre, el contacto, el motivo y el mensaje se transmiten al proveedor. Completar en `privacidad.html` (sección 5) el proveedor, su ubicación y su política; revisar sus condiciones y la ubicación de los datos.

## Privacidad y seguridad

- `privacidad.html` es un **texto base prudente**, no aprobado. Tiene marcadores `[PENDIENTE: …]` y un recuadro «Texto base» que deben resolverse/eliminarse antes de publicar. Debe revisarlo el profesional y, de corresponder, un asesor en protección de datos (Ley 25.326 y normativa aplicable); no se afirma cumplimiento normativo integral.
- Sin cookies, sin analítica, sin tipografías ni scripts de terceros. Google Maps se carga **solo al pulsar «Cargar mapa»**; el enlace «Abrir en Google Maps» es una búsqueda con la dirección completa (no se afirma un marcador verificado).
- Cada página incluye una política CSP restrictiva por `<meta>`. Si el hosting permite cabeceras HTTP, es preferible replicarla allí y añadir `X-Content-Type-Options: nosniff`, `Referrer-Policy` y HSTS.
- No hay datos estructurados inventados: el JSON-LD (`LegalService`, en `index.html`) usa únicamente nombre, teléfono, correo, domicilio y zonas declaradas. Sin valoraciones, horarios, precios ni matrículas.

## Publicar la web

El sitio es 100 % estático: sirve cualquier hosting estático (GitHub Pages, Cloudflare Pages, Netlify, hosting tradicional por FTP). No hay dependencia de ninguna plataforma. **Nada se publicó ni se registró en nombre del cliente.**

1. **Preparar el repositorio** (en una cuenta del propietario): `git init`, `git add .`, `git commit -m "Sitio inicial"` y subirlo a un repositorio del cliente.
2. **Publicar:** conectar el repositorio al hosting elegido, con carpeta de publicación = raíz del proyecto y **sin comando de build**. HTTPS lo activa el hosting (certificado gratuito automático en las plataformas mencionadas); verificar que quede forzado.
3. **404:** `404.html` usa rutas absolutas desde la raíz (`/css/styles.css`). Si el sitio se aloja en una subcarpeta (p. ej. `usuario.github.io/repo/`), anteponer el nombre de la subcarpeta a esas rutas.
4. **Dominio:** el cliente aún evalúa `sebastiandesouza.com.ar` o `estudiodesouza.com.ar`. **No están registrados.** Se registra a nombre del propietario en [NIC Argentina](https://nic.ar), y se configuran los registros DNS que indique el hosting elegido (nunca delegar el control a un tercero sin acuerdo).
5. **Aplicar el dominio al sitio** (canonical, Open Graph, sitemap, robots):
   ```bash
   node tools/set-domain.mjs https://dominio-elegido.com.ar
   ```
   Vuelve a ejecutarse sin problema si cambia el dominio. Hasta entonces el sitio no declara canonical ni sitemap para no apuntar a un dominio inexistente.
6. **Verificación posterior:** abrir cada página por HTTPS; probar teléfono, WhatsApp y correo desde un móvil; enviar una consulta real; revisar `https://dominio/robots.txt` y `/sitemap.xml`; dar de alta el sitio en Google Search Console y enviar el sitemap; revisar la indexación (no se garantizan posiciones). La ficha de Google Business Profile es independiente y debe ser creada por el propietario.
7. **Entrega:** el repositorio, el hosting, el dominio y la cuenta del servicio de formularios deben estar a nombre del cliente; entregarle accesos de propietario y documentar quién tiene permisos.

## Pendientes antes de publicar

- [ ] Elegir y registrar dominio; ejecutar `tools/set-domain.mjs`.
- [ ] Contratar/configurar el servicio del formulario (`data-endpoint`) y probar un envío real.
- [ ] Revisar y aprobar `privacidad.html`; completar proveedor y plazos; quitar el recuadro «Texto base».
- [ ] Confirmar que 11 4198-8876 es celular (formato `+54 9`) y que el domicilio es el exacto para Google Maps (la búsqueda usa «Almirante Guillermo Brown 1378, Morón»; se omitió piso/departamento para no afectar la búsqueda).
- [ ] Confirmar con el cliente si desea agregar una frase sobre su **experiencia en el ámbito judicial** (se mantuvo solo la redacción aprobada: no se agregaron antigüedad, casos ni matrícula).
- [ ] Confirmar con Oriana Belén Albornoz el texto de su perfil, en especial la mención a su actividad como psicóloga particular.
- [ ] Reemplazar las imágenes ilustrativas por fotografías con licencia verificada o del estudio real si se desea (ver Créditos).
- [ ] Incorporar favicon/monograma cuando existan.

## Créditos y licencias

- **Fuentes:** Cormorant Garamond e Inter, licencia SIL Open Font License 1.1, autoalojadas (subconjunto latino, vía [Fontsource](https://fontsource.org)). Pila de respaldo: `Libre Baskerville`/`Georgia` (títulos) y `system-ui` (textos); `font-display: swap`.
- **Imágenes** (`arquitectura-columnas`, `biblioteca-juridica`, `despacho-sobrio`, `og-imagen`): **imágenes ilustrativas generadas con IA** durante el desarrollo, sin personas ni textos legibles. No son fotografías reales del estudio ni de archivo, y así se indica en el sitio («Imagen ilustrativa»). Son reemplazables sin cambios de diseño.
- **Ícono de WhatsApp:** glifo de [Simple Icons](https://simpleicons.org) (CC0). WhatsApp es marca de sus propietarios.
- Referencia estética: se analizó el lenguaje visual de marval.com como inspiración conceptual; no se copió código, texto, imágenes ni identidad.
