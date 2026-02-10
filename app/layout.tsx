import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Cherry Experience - Andes of Chile',
  description: 'Expertos en turismo de montaña y conservación. Descubre los senderos más prístinos del sur del mundo. Guiamos tus pasos por glaciares milenarios, bosques nativos y las cumbres más imponentes de los Andes.',
  openGraph: {
    title: 'Cherry Experience - Andes of Chile',
    description: 'Expertos en turismo de montaña y conservación. Descubre los senderos más prístinos del sur del mundo.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cherry Experience - Andes of Chile',
    description: 'Expertos en turismo de montaña y conservación. Descubre los senderos más prístinos del sur del mundo.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logos/che-favicon.png',
    apple: '/logos/che-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('turismo-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s==='dark'||s==='light'?s:d;document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        {/* Google Fonts - Cherry Experience */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@300;400;600&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        
        {/* FontAwesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
