'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/i18n/navigation'
import AndesTrekDemo from '@/components/demos/AndesTrekDemo'
import { getHomeData } from '@/services/home'
import { getRutas } from '@/services/rutas'
import type { HomeData } from '@/services/home'
import type { Ruta } from '@/services/rutas'

export default function Home() {
  const locale = useLocale()
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [featuredRutas, setFeaturedRutas] = useState<Ruta[]>([])

  useEffect(() => {
    getHomeData(locale).then(setHomeData).catch(() => setHomeData(null))
    getRutas(locale, true).then(setFeaturedRutas).catch(() => setFeaturedRutas([]))
  }, [locale])

  return (
    <AndesTrekDemo
      homeData={homeData ?? undefined}
      featuredRutas={featuredRutas.length > 0 ? featuredRutas : undefined}
    />
  )
}
