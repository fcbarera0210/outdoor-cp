import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Turismo Outdoor - Demos',
  description: 'Visualizador de diseños para servicio de guía outdoor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts - Andes Trek */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@300;400;600&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        
        {/* Google Fonts - Travel Journey */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
        
        {/* Google Fonts - MNTN */}
        <link href="https://fonts.googleapis.com/css2?family=Gilroy:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;700&display=swap" rel="stylesheet" />
        
        {/* Google Fonts - Patagonia */}
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
        
        {/* FontAwesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
