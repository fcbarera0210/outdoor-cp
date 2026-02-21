# Cherry Experience - Andes of Chile

Sitio web para **Cherry Experience**, servicio de turismo outdoor y trekking en Chile. Incluye web pública (es/en) y panel de administración con base de datos, autenticación y reservas.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **i18next** + **react-i18next** (i18n: español e inglés)
- **Prisma** + **Neon** (PostgreSQL)
- **NextAuth.js** (autenticación admin, JWT)
- **Vercel Blob** (subida de imágenes)
- **Vercel** (deploy)

## Requisitos

- Node.js 18+
- Cuenta en [Neon](https://neon.tech) (PostgreSQL)
- (Opcional) [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) para imágenes

## Instalación

```bash
npm install
cp .env.example .env
```

Edita `.env` y configura:

- `DATABASE_URL`: URL de tu base Neon (PostgreSQL)
- `NEXTAUTH_SECRET`: secreto para firmar sesiones (ej: `openssl rand -hex 32`)
- `NEXTAUTH_URL`: en local `http://localhost:3000`, en producción la URL de tu sitio
- `BLOB_READ_WRITE_TOKEN`: token de Vercel Blob (opcional; si no, las imágenes se guardan como URL)

Luego:

```bash
npx prisma db push
npm run db:seed
```

El seed crea un usuario admin de prueba: **admin@cherryexperience.cl** / **admin123** (cambiar en producción).

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La web pública usa rutas con locale: `/es`, `/en`. El panel admin está en `/admin`.

## Build y producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Conecta el repositorio con Vercel.
2. Añade las variables de entorno (`.env.example`).
3. En producción, define `NEXTAUTH_URL` con la URL real (ej: `https://tu-dominio.vercel.app`).
4. El build usa `prisma generate && next build`.

Con Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Estructura del proyecto

```
turismo/
├── app/
│   ├── [locale]/           # Web pública (es/en): home, blog, rutas, reserva, equipo, contacto
│   ├── admin/              # Panel admin: login, dashboard, rutas, blog, contacto, equipo, home, reservas, imágenes
│   ├── api/                 # API Routes: auth, rutas, blog, settings, home, equipo, reservas, upload
│   └── layout.tsx
├── components/              # layout, admin, ui, demos
├── i18n/                   # routing, config, messages, navigation (Link/useLocale), path, redirect
├── lib/                    # prisma, auth, auth-admin, locale (getLocaleFromRequest, getLocalized, pickLocale)
├── messages/               # es.json, en.json (textos de UI por idioma)
├── services/               # api, rutas, blog, settings, home, equipo
├── prisma/
│   ├── schema.prisma       # Modelos: User, Ruta, BlogPost, Setting, Reserva, HomeBlock, etc.
│   └── seed.ts
└── .env.example
```

## Páginas

### Sitio público (prefijo `/es` o `/en`)

| Ruta | Descripción |
|------|-------------|
| `/[locale]` | Home |
| `/[locale]/rutas` | Listado de rutas |
| `/[locale]/rutas/[slug]` | Detalle de ruta |
| `/[locale]/blog` | Listado del blog |
| `/[locale]/blog/[slug]` | Entrada del blog |
| `/[locale]/reserva` | Flujo de reserva (fechas → datos → confirmación) |
| `/[locale]/equipo` | Equipo e instrucciones |
| `/[locale]/contacto` | Contacto |

### Panel de administración

| Ruta | Descripción |
|------|-------------|
| `/admin` | Redirige a login o dashboard |
| `/admin/login` | Login (NextAuth, email/contraseña) |
| `/admin/dashboard` | Dashboard |
| `/admin/rutas` | CRUD rutas |
| `/admin/blog` | CRUD blog |
| `/admin/contacto` | Teléfono, email, ubicación, redes, mapa |
| `/admin/equipo` | Instrucciones de trekking y miembros |
| `/admin/home` | Bloques de la home (hero, partners, etc.) |
| `/admin/reservas` | Listado y estado de reservas |
| `/admin/imagenes` | Galería |

## Características

- ✅ i18n (español e inglés) con i18next
- ✅ Base de datos Neon (Prisma): rutas, blog, configuración, reservas, usuarios
- ✅ NextAuth.js para admin (credenciales + JWT)
- ✅ Reservas: flujo en 4 pasos y guardado en BD; gestión en `/admin/reservas`
- ✅ Subida de imágenes con Vercel Blob: optimización automática (WebP, ≤300 KB), soporte HEIC (heic-to), estructura `tours/{slug}/cover.webp` y `uploads/{id}.webp`; barra de progreso en el admin
- ✅ Contenido del sitio (contacto, home, equipo) editable desde el admin y reflejado en la web
- ✅ Tema claro/oscuro (header y admin)
- ✅ Diseño responsive y animaciones (Framer Motion)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera Prisma client y build de Next.js |
| `npm start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run db:push` | Sincroniza schema Prisma con la BD |
| `npm run db:seed` | Ejecuta el seed (usuario admin y datos de ejemplo) |
| `npm run db:studio` | Abre Prisma Studio |

## Verificación de build

```bash
npm run build
```

Si termina sin errores, el despliegue en Vercel será correcto. Las advertencias de ESLint (p. ej. `next/image`) no bloquean el deploy.

## Cambios pendientes a subir a Git

### Sistema de imágenes (upload y optimización)

- **`lib/image-upload.ts`** (nuevo): Optimización en cliente con `browser-image-compression` (WebP, max 250 KB, 1920px), conversión HEIC→JPG con `heic-to`, y helpers `uploadTourCover` / `uploadImage`. Carga dinámica de librerías para evitar SSR (`window is not defined`).
- **`app/api/upload/route.ts`**: Validación WebP y tamaño ≤300 KB; paths `tours/{slug}/cover.webp` (portadas, con `allowOverwrite: true`) y `uploads/{nanoid()}.webp` (genérico); URL de portada con `?v=timestamp` para evitar caché al reemplazar imagen; uso de `nanoid` para nombres.
- **`components/admin/ImageUploader.tsx`**: Prop `tourSlug` para subir como portada de ruta; barra de progreso por pasos (recibiendo → HEIC→JPG → optimizando → subiendo); soporte HEIC/HEIF (acept y validación); input controlado con `value ?? ''`; aviso cuando la conversión HEIC puede tardar.
- **`app/admin/rutas/[slug]/editar/page.tsx`**: `ImageUploader` con `tourSlug={slug}`; eliminado checkbox "Destacada" (solo una imagen por ruta).
- **Dependencias:** `browser-image-compression`, `nanoid`, `heic-to` (reemplaza heic2any para HEIC de iPhones recientes).

### Admin: home, footer y formularios

- **Nuevos:** `app/admin/footer/`, `app/admin/home/secciones/`, `components/admin/AdminFooterForm.tsx`, `AdminHeroForm.tsx`, `AdminPartnersForm.tsx`, `AdminReservaForm.tsx`, `AdminSalidasSectionForm.tsx`.
- **Modificados:** `app/admin/home/page.tsx`, `app/admin/home/[type]/page.tsx`, `components/admin/AdminSidebar.tsx`, `services/settings.ts`, `app/admin/contacto/page.tsx`, `components/layout/Footer.tsx`, `components/demos/AndesTrekDemo.tsx`, `app/[locale]/page.tsx`.

### Resumen de archivos tocados

| Tipo   | Archivos |
|--------|----------|
| Nuevos | `lib/image-upload.ts`, `app/admin/footer/`, `app/admin/home/secciones/`, `AdminFooterForm`, `AdminHeroForm`, `AdminPartnersForm`, `AdminReservaForm`, `AdminSalidasSectionForm` |
| Modificados | `app/api/upload/route.ts`, `components/admin/ImageUploader.tsx`, `app/admin/rutas/[slug]/editar/page.tsx`, `package.json`, `package-lock.json`, y los listados en Admin arriba |

## Cambios ya documentados (i18n con i18next)

Tras la migración de **next-intl** a **i18next**:

- **Nuevos archivos:** `i18n/config.ts`, `i18n/messages.ts`, `i18n/navigation.tsx`, `i18n/path.ts`, `i18n/redirect.ts`, `components/I18nProvider.tsx`
- **Modificados:** `i18n/routing.ts`, `app/[locale]/layout.tsx`, `middleware.ts`, `next.config.js`, `package.json`, `lib/locale.ts`, y componentes que usaban `useTranslations`/`useLocale`
- **Eliminados:** `i18n/request.ts`, antiguo `i18n/navigation.ts`

Los mensajes de UI siguen en `messages/es.json` y `messages/en.json`. Las rutas públicas son `/es/...` y `/en/...`.

## Branding

- **Nombre:** Cherry Experience  
- **Slogan:** Andes of Chile  
- **Colores:** Principal #7A2235, Secundario #473728, fondo claro #F4F2D7, dark #111827
