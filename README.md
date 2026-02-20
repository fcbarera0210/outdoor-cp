# Cherry Experience - Andes of Chile

Sitio web para **Cherry Experience**, servicio de turismo outdoor y trekking en Chile. Incluye web pública (es/en) y panel de administración con base de datos, autenticación y reservas.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **next-intl** (i18n: español e inglés)
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
├── lib/                    # prisma, auth, auth-admin, locale
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

- ✅ i18n (español e inglés) con next-intl
- ✅ Base de datos Neon (Prisma): rutas, blog, configuración, reservas, usuarios
- ✅ NextAuth.js para admin (credenciales + JWT)
- ✅ Reservas: flujo en 4 pasos y guardado en BD; gestión en `/admin/reservas`
- ✅ Subida de imágenes con Vercel Blob en rutas y blog
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

## Branding

- **Nombre:** Cherry Experience  
- **Slogan:** Andes of Chile  
- **Colores:** Principal #7A2235, Secundario #473728, fondo claro #F4F2D7, dark #111827
