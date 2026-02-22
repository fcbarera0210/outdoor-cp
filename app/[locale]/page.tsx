'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/i18n/navigation'
import AndesTrekDemo from '@/components/demos/AndesTrekDemo'
import { getHomeData } from '@/services/home'
import { getRutas } from '@/services/rutas'
import { getHomeSectionsSettings } from '@/services/settings'
import type { HomeData } from '@/services/home'
import type { Ruta } from '@/services/rutas'
import type { HomeSectionsSettings } from '@/services/settings'

export default function Home() {
  const locale = useLocale()
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [featuredRutas, setFeaturedRutas] = useState<Ruta[]>([])
  const [homeSections, setHomeSections] = useState<HomeSectionsSettings | null>(null)
  const loading = homeData === null

  useEffect(() => {
    getHomeData(locale).then(setHomeData).catch(() => setHomeData(null))
    getRutas(locale, true).then(setFeaturedRutas).catch(() => setFeaturedRutas([]))
    getHomeSectionsSettings().then(setHomeSections).catch(() => setHomeSections(null))
  }, [locale])

  return (
    <AndesTrekDemo
      loading={loading}
      homeData={homeData ?? undefined}
      featuredRutas={featuredRutas.length > 0 ? featuredRutas : undefined}
      homeSections={homeSections ?? undefined}
    />
  )
}
