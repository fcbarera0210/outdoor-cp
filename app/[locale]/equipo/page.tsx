'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getInstrucciones } from '@/services/equipo'
import type { Instrucciones } from '@/services/equipo'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function EquipoPage() {
  const locale = useLocale()
  const [instrucciones, setInstrucciones] = useState<Instrucciones | null>(null)
  useEffect(() => {
    getInstrucciones(locale).then(setInstrucciones).catch(() => setInstrucciones(null))
  }, [locale])
  const t = useTranslations('equipo')
  const tHome = useTranslations('home')
  return (
    <div>
      <HeroCompact
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
          { label: t('breadcrumb') },
        ]}
      />
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div id="instrucciones" className="mb-20" {...itemView(0)}>
            <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8 border-b-2 border-brand-primary pb-4">
              {t('basicInstructions')}
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div className="flex gap-4">
                <i className="fas fa-shield-alt text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('safety')}</h3>
                  <p>{instrucciones?.seguridad ?? 'Siempre sigue las indicaciones del guía. No te separes del grupo. En caso de mal tiempo, el guía puede modificar o cancelar la ruta por tu seguridad.'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <i className="fas fa-shopping-bag text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('whatToBring')}</h3>
                  <p>{instrucciones?.queLlevar ?? 'Ropa por capas, protección solar, botella de agua (mínimo 2L), snack energético. El equipo específico varía según la ruta; consulta la lista en cada expedición.'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <i className="fas fa-leaf text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('mountainBehavior')}</h3>
                  <p>{instrucciones?.comportamiento ?? 'Respeta la naturaleza: no dejes basura, no te aproximes a la fauna silvestre, camina solo por los senderos marcados. Principio de no dejar rastro.'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div id="simbolologia" className="mb-20" {...itemView(0.1)}>
            <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8 border-b-2 border-brand-primary pb-4">
              {t('symbology')}
            </h2>

            <div id="dificultad" className="mb-12">
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6">{t('difficultyLevels')}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div className="p-6 bg-green-500/10 dark:bg-green-500/20 rounded-lg border-2 border-green-500/30 dark:border-green-400/40" {...itemView(0.15)}>
                  <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-green-600 dark:text-green-400 text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">{t('easy')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{instrucciones?.dificultadFacil ?? 'Terreno accesible, desnivel moderado. Ideal para principiantes y familias.'}</p>
                </motion.div>
                <motion.div className="p-6 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg border-2 border-yellow-500/30 dark:border-yellow-400/40" {...itemView(0.2)}>
                  <div className="w-12 h-12 rounded-full bg-yellow-500/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-yellow-600 dark:text-yellow-400 text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">{t('medium')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{instrucciones?.dificultadMedia ?? 'Requiere condición física básica. Algunos tramos con mayor exigencia.'}</p>
                </motion.div>
                <motion.div className="p-6 bg-brand-primary/10 rounded-lg border-2 border-brand-primary/30" {...itemView(0.25)}>
                  <div className="w-12 h-12 rounded-full bg-brand-primary/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-brand-primary text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">{t('hard')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{instrucciones?.dificultadAlta ?? 'Terreno técnico, condición física buena. Equipo especializado requerido.'}</p>
                </motion.div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6">{t('requiredGear')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {instrucciones?.equipoNecesario?.length ? (
                  instrucciones.equipoNecesario.map((item, i) => (
                    <motion.div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.3 + i * 0.05)}>
                      <i className="fas fa-backpack text-3xl text-brand-primary"></i>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{item.titulo}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.texto}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.3)}>
                      <i className="fas fa-backpack text-3xl text-brand-primary"></i>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('backpack')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">40-50L para rutas multinoche. 20-30L para día.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.35)}>
                      <i className="fas fa-hiking text-3xl text-brand-primary"></i>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('poles')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Reducen impacto en rodillas y mejoran estabilidad.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.4)}>
                      <i className="fas fa-helmet-safety text-3xl text-brand-primary"></i>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('helmet')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Obligatorio en ascensos volcánicos y terrenos técnicos.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.45)}>
                      <i className="fas fa-snowflake text-3xl text-brand-primary"></i>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('crampons')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Para nieve y hielo. Incluidos en rutas que lo requieren.</p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6">{t('trailMarkers')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {instrucciones?.senaletica?.length ? (
                  instrucciones.senaletica.map((item, i) => (
                    <motion.div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.5 + i * 0.05)}>
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                        <i className="fas fa-map-signs text-brand-primary"></i>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{item.titulo}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.texto}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.5)}>
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                        <span className="font-heading font-bold text-brand-primary">◀</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">Marcas de sendero</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Cairns (montículos de piedras) y hitos pintados indican la ruta correcta.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.55)}>
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                        <i className="fas fa-map-signs text-brand-primary"></i>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">Postes indicadores</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">En parques nacionales marcan distancias y cruces.</p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
