# Turismo Outdoor - Visualizador de Demos

Aplicación web para visualizar y comparar 4 diseños diferentes para un servicio de guía outdoor en Chile.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **Vercel** (deploy)

## Estructura del Proyecto

```
turismo/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globales
├── components/          # Componentes React
│   ├── DemoSelector.tsx # Selector de demos
│   └── DemoViewer.tsx  # Visualizador de demos
├── demos/               # HTMLs originales (backup)
├── public/
│   └── demos/          # HTMLs servidos como estáticos
└── utils/              # Utilidades
```

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

## Características

- ✅ Visualización de 4 diseños diferentes
- ✅ Cambio en tiempo real entre diseños
- ✅ Animaciones suaves con Framer Motion
- ✅ Diseño responsive (mobile-first)
- ✅ Optimizaciones de performance (lazy loading, preload)
- ✅ Corrección automática de imágenes rotas

## Demos Incluidos

1. **Andes Trek** - Diseño Rústico
2. **Travel Journey** - Diseño Geométrico
3. **MNTN** - Diseño Oscuro/Elegante
4. **Patagonia** - Diseño Moderno/Colorido

## Próximos Pasos

Una vez seleccionado el diseño final:
- Integración con base de datos Neon
- Funcionalidad completa de formularios
- Sistema de reservas
- Autenticación (si es necesaria)
