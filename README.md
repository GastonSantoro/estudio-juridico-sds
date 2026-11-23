# de Souza Abogados — Sitio web

Sitio estático One-Page (HTML5 + CSS3 + JavaScript nativos, sin frameworks ni paso de compilación) del estudio jurídico **de Souza Abogados**, Morón, Provincia de Buenos Aires.

> **Estado:** diseño y front-end terminados y verificados en navegador. **No está publicado** y **el formulario aún no envía mensajes** hasta configurar un servicio (ver [Formulario](#formulario-de-consultas)). Ver [Pendientes](#pendientes-antes-de-publicar).

## Estructura

```
/
├── index.html          Sitio completo: #inicio · #estudio · #areas · #equipo · #contacto
├── privacidad.html     Aviso de privacidad (TEXTO BASE, pendiente de revisión)
├── 404.html            Página de error
├── robots.txt
├── css/styles.css      Todos los estilos (variables al inicio)
├── js/init.js          Marca "JS disponible" antes del primer render
├── js/main.js          Menú, encabezado, reveal, áreas, mapa, WhatsApp, formulario, ScrollSpy
└── assets/
    ├── fonts/          Inter (autoalojada)
    ├── icons/sprite.svg  Isotipo provisional + íconos lineales
    └── images/         Fotografías ilustrativas (.webp)
```

Vista previa local: cualquier servidor estático (p. ej. `npx serve .` o `python -m http.server`). Los íconos (`<use href="…sprite.svg">`) no se ven abriendo el HTML con doble clic (`file://`).

## Dirección visual

- **Monocromática estricta:** `#111111` / `#171717`, `#F5F4F0` / `#FFFFFF`, grises `#4A4A4A` / `#D4D4D4`. Sin acentos cálidos.
- **Cortes diagonales** (≈ 3,4°) con `clip-path` entre portada, separador fotográfico y contacto. La altura del corte es la variable `--cut`.
- **Fotografía en blanco y negro** por CSS (`grayscale(100%) contrast(1.08)`): se pueden cambiar las imágenes por otras a color sin editarlas.
- **Tipografía:** Inter (autoalojada). **Botones** rectos (`border-radius: 0`): primario blanco, secundario con borde fino.
- **Animaciones:** aparición con `IntersectionObserver`, microinteracciones en enlaces/botones/filas y encabezado que pasa de transparente a sólido. Todo se desactiva con `prefers-reduced-motion`.

## Cómo modificar el contenido

| Qué cambiar | Dónde |
|---|---|
| **Logotipo definitivo** | Reemplazar el `<symbol id="isotipo">` de `assets/icons/sprite.svg`, o el contenido de `.brand__mark` (encabezado y pie de `index.html`, `privacidad.html`, `404.html`) por un `<img>`. Luego agregar el favicon. |
| **Teléfono, WhatsApp, correo, domicilio** | Buscar y reemplazar en los HTML: `5492202544238`, `+54 9 2202 54 4238`, `abogadosdesouza@gmail.com`, `Almirante Guillermo Brown 1378`. También `CONTACT` en `js/main.js` y el JSON-LD de `index.html`. |
| **Áreas de práctica** | `index.html#areas`: 5 filas visibles + 4 dentro de `#areas-extra` (se despliegan con el botón). Las opciones del selector del formulario deben coincidir con los `data-select-area`. **No agregar áreas sin confirmación.** |
| **Equipo** | `index.html#equipo`, 4 niveles: Dirección · Referentes senior · Profesionales asociados · Colaboración interdisciplinaria. |
| **Fotografías de profesionales** | Ver el comentario HTML en `#equipo`: agregar `<figure class="person__photo">` (se muestra en B/N) y, en Dirección, la clase `person--with-photo`. No requiere cambios de CSS. |
| **Imágenes** | Portada: `biblioteca-juridica-*.webp`. Separador: `arquitectura-columnas-900.webp`. Son imágenes ilustrativas generadas con IA (se indica en el pie). |
| **Instagram (futuro)** | Comentario indicado en el pie de `index.html`; no hay enlaces rotos hoy. |
| **Colores, espacios, corte diagonal** | Variables en `:root` de `css/styles.css`. |

## Formulario de consultas

**Estado actual: front-end completo, sin servicio de envío conectado.** No se simula ningún envío: sin `data-endpoint`, el formulario valida y ofrece **WhatsApp** y **correo** con el texto ya preparado. La confirmación de éxito aparece solo si el servicio responde HTTP 2xx. Incluye campo trampa y tiempo mínimo de 3 s.

Para activarlo (p. ej. Formspree): crear el formulario con la cuenta del estudio, copiar la URL en `<form id="consulta-form" data-endpoint="https://formspree.io/f/XXXXXXXX">`, probar un envío real y completar el proveedor en `privacidad.html` (sección 5). Si se usa otro proveedor, ajustar `connect-src` en la política CSP de cada HTML.

## Privacidad y seguridad

- `privacidad.html` es un **texto base**, con marcadores `[PENDIENTE: …]` y un recuadro «Texto base» que deben resolverse antes de publicar (revisión del estudio y, de corresponder, de un asesor).
- Sin cookies, analítica ni scripts de terceros. Google Maps se carga **solo al pulsar «Cargar mapa»** (se muestra en escala de grises). Política CSP restrictiva por `<meta>` (sin estilos inline).

## Publicar

Hosting estático cualquiera (GitHub Pages, Cloudflare Pages, Netlify, FTP). `404.html` usa rutas absolutas (`/css/…`): ajustar si se aloja en una subcarpeta. Al definir el dominio, agregar `canonical`, `og:url`/`og:image` en el marcador `domain:start/end` de cada HTML y un `sitemap.xml`.

## Pendientes antes de publicar

- [ ] Aprobar el logotipo definitivo y el favicon.
- [ ] Elegir/registrar dominio y completar canonical, Open Graph y sitemap.
- [ ] Configurar el servicio del formulario y probar un envío real.
- [ ] Revisar y aprobar `privacidad.html`.
- [ ] Confirmar con cada profesional el texto de su perfil.
- [ ] Reemplazar las imágenes ilustrativas por fotografías con licencia verificada, si se desea.
- [ ] Archivos sin uso que pueden eliminarse: `assets/images/despacho-sobrio-*.webp`, `assets/images/og-imagen.jpg` (hasta definir imagen social) y `assets/fonts/cormorant-garamond-*.woff2`.

## Créditos

- **Fuente:** Inter, licencia SIL Open Font License 1.1 (vía Fontsource).
- **Imágenes:** ilustrativas, generadas con IA, sin personas ni textos legibles.
- Referencia estética: sobriedad institucional de grandes estudios jurídicos; no se copió código, texto, imágenes ni identidad.
