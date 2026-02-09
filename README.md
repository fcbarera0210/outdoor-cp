# Cherry Experience - Andes of Chile

Sitio web para **Cherry Experience**, servicio de turismo outdoor y trekking en Chile. Diseño basado en el demo Andes Trek, con branding corporativo y secciones completas.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **Vercel** (deploy)

## Estructura del Proyecto

```
turismo/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Home (Andes Trek)
│   ├── globals.css         # Estilos globales
│   ├── admin/              # Panel de administración
│   │   ├── login/           # Login (sin validación de credenciales)
│   │   ├── dashboard/       # Dashboard con acceso a módulos
│   │   ├── rutas/           # CRUD rutas
│   │   ├── blog/            # CRUD blog
│   │   ├── contacto/       # Configuración de contacto
│   │   ├── equipo/         # Instrucciones + miembros
│   │   └── imagenes/       # Galería de imágenes (mockup)
│   ├── blog/               # Blog (listado y detalle)
│   ├── rutas/              # Rutas (listado y detalle)
│   ├── reserva/            # Flujo de reserva (4 pasos)
│   ├── equipo/             # Página de equipo
│   └── contacto/           # Página de contacto
├── components/
│   ├── admin/              # AdminSidebar, AdminCard, AdminTable, etc.
│   ├── demos/              # AndesTrekDemo (home)
│   ├── layout/             # Header, Footer, PageLayout, ConditionalLayout
│   └── ui/                 # HeroCompact, componentes compartidos
├── data/                   # Datos estáticos (blog, rutas)
├── public/
│   └── logos/              # Logos Cherry Experience
└── tailwind.config.ts      # Configuración de colores y fuentes
```

## Branding

- **Nombre:** Cherry Experience
- **Slogan:** Andes of Chile
- **Colores:** Principal #7A2235 (rojo), Secundario #473728 (café), Oscuro #333333, Claro #F4F2D7

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build para Producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Conecta tu repositorio GitHub con Vercel
2. Vercel detectará automáticamente Next.js
3. El deploy se realizará automáticamente

O usando Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Páginas

### Sitio público

| Ruta | Descripción |
|------|-------------|
| `/` | Home con hero y secciones principales |
| `/rutas` | Listado de rutas disponibles |
| `/rutas/[slug]` | Detalle de cada ruta |
| `/blog` | Listado de entradas del blog |
| `/blog/[slug]` | Detalle de cada entrada |
| `/reserva` | Inicio del flujo de reserva |
| `/reserva/fechas` | Selección de fechas |
| `/reserva/datos` | Datos del pasajero |
| `/reserva/confirmacion` | Confirmación de reserva |
| `/equipo` | Información del equipo y guías |
| `/contacto` | Formulario de contacto |

### Panel de administración

| Ruta | Descripción |
|------|-------------|
| `/admin` | Redirige a login o dashboard |
| `/admin/login` | Login (acepta cualquier credencial) |
| `/admin/dashboard` | Dashboard con acceso a módulos |
| `/admin/rutas` | Lista de rutas, crear y editar |
| `/admin/blog` | Lista de posts, crear y editar |
| `/admin/contacto` | Configuración: teléfono, email, redes sociales |
| `/admin/equipo` | Instrucciones de trekking y miembros del equipo |
| `/admin/imagenes` | Galería de imágenes (mockup) |

## Características

- ✅ Header y Footer compartidos con navegación
- ✅ Hero compacto en páginas internas (rutas, blog, equipo, contacto)
- ✅ Flujo de reserva en 4 pasos
- ✅ Diseño responsive (mobile-first)
- ✅ Branding Cherry Experience con colores corporativos
- ✅ Animaciones suaves con Framer Motion
- ✅ **Panel de administración** (`/admin`) con maquetas CRUD para rutas, blog, contacto, equipo e imágenes

## Panel de administración

El panel admin permite gestionar el contenido del sitio. Accede desde `/admin`:

1. **Login**: Usa cualquier email y contraseña (o deja los campos vacíos) y haz clic en Ingresar.
2. **Dashboard**: Accede a las secciones desde las cards.
3. **Módulos disponibles**:
   - **Rutas**: Lista, crear y editar rutas/expediciones
   - **Blog**: Lista, crear y editar artículos
   - **Contacto**: Configuración de teléfono, email, ubicación y redes sociales
   - **Equipo**: Instrucciones de trekking y miembros del equipo
   - **Galería**: Maqueta para gestión de imágenes

Actualmente las pantallas son **maquetas** (sin persistencia real). El diseño del admin usa los mismos colores y fuentes que la web pública.

## Próximos Pasos

- Integración con base de datos (Neon)
- Funcionalidad completa de formularios y reservas
- Autenticación real para el panel admin
- Optimización de imágenes con `next/image`
