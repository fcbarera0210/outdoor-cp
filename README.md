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
│   ├── blog/               # Blog (listado y detalle)
│   ├── rutas/              # Rutas (listado y detalle)
│   ├── reserva/            # Flujo de reserva (4 pasos)
│   ├── equipo/             # Página de equipo
│   └── contacto/           # Página de contacto
├── components/
│   ├── demos/              # AndesTrekDemo (home)
│   ├── layout/             # Header, Footer, PageLayout
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

## Características

- ✅ Header y Footer compartidos con navegación
- ✅ Hero compacto en páginas internas (rutas, blog, equipo, contacto)
- ✅ Flujo de reserva en 4 pasos
- ✅ Diseño responsive (mobile-first)
- ✅ Branding Cherry Experience con colores corporativos
- ✅ Animaciones suaves con Framer Motion

## Próximos Pasos

- Integración con base de datos (Neon)
- Funcionalidad completa de formularios y reservas
- Autenticación (si es necesaria)
- Optimización de imágenes con `next/image`
