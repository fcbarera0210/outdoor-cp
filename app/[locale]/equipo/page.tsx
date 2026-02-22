'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine } from '@/components/ui/Skeleton'
import { sectionView, itemView } from '@/components/ui/animations'
import { getInstrucciones } from '@/services/equipo'
import type { Instrucciones } from '@/services/equipo'
import { useTranslation } from 'react-i18next'
import { useLocale, Link } from '@/i18n/navigation'

const VALID_ICON_ID = /^[a-z0-9-]+:[a-z0-9-]+$/i
function isValidIconId(id: string): boolean {
  return id.length > 0 && VALID_ICON_ID.test(id)
}

export default function EquipoPage() {
  const locale = useLocale()
  const [instrucciones, setInstrucciones] = useState<Instrucciones | null>(null)
  const loading = instrucciones === null
  useEffect(() => {
    getInstrucciones(locale).then(setInstrucciones).catch(() => setInstrucciones(null))
  }, [locale])
  const { t } = useTranslation('equipo')
  const { t: tHome } = useTranslation('home')

  if (loading) {
    return (
      <div>
        <HeroCompact
          title={t('title')}
          subtitle={t('subtitle')}
          breadcrumb={[{ label: tHome('breadcrumbHome'), href: '/' }, { label: t('breadcrumb') }]}
        />
        <section className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-20">
              <Skeleton className="h-9 w-64 mb-8" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-10 h-10 shrink-0 rounded" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLine className="w-32" />
                      <SkeletonLine className="w-full" />
                      <SkeletonLine className="w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-20">
              <Skeleton className="h-9 w-48 mb-8" />
              <div className="mb-12">
                <Skeleton className="h-7 w-40 mb-6" />
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="mb-12">
                <Skeleton className="h-7 w-44 mb-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                      <Skeleton className="w-10 h-10 shrink-0 rounded" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLine className="w-24" />
                        <SkeletonLine className="w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-7 w-36 mb-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                      <Skeleton className="w-10 h-10 shrink-0 rounded" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLine className="w-40" />
                        <SkeletonLine className="w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

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
              {instrucciones?.instruccionesBasicas?.length ? (
                instrucciones.instruccionesBasicas.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl text-brand-primary">
                      {item.icono && isValidIconId(item.icono) ? (
                        <Icon icon={item.icono} className="text-2xl" />
                      ) : (
                        <Icon icon="mdi:information-outline" className="text-2xl" />
                      )}
                    </span>
                    <div>
                      {item.titulo && (
                        <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">
                          {item.titulo}
                        </h3>
                      )}
                      <p>{item.texto || ''}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex gap-4">
                    <Icon icon="mdi:shield-account-outline" className="text-2xl text-brand-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('safety')}</h3>
                      <p>{instrucciones?.seguridad ?? 'Siempre sigue las indicaciones del guía. No te separes del grupo. En caso de mal tiempo, el guía puede modificar o cancelar la ruta por tu seguridad.'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon icon="mdi:bag-personal-outline" className="text-2xl text-brand-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('whatToBring')}</h3>
                      <p>{instrucciones?.queLlevar ?? 'Ropa por capas, protección solar, botella de agua (mínimo 2L), snack energético. El equipo específico varía según la ruta; consulta la lista en cada expedición.'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon icon="mdi:leaf-maple" className="text-2xl text-brand-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-brand-dark dark:text-white uppercase mb-2">{t('mountainBehavior')}</h3>
                      <p>{instrucciones?.comportamiento ?? 'Respeta la naturaleza: no dejes basura, no te aproximes a la fauna silvestre, camina solo por los senderos marcados. Principio de no dejar rastro.'}</p>
                    </div>
                  </div>
                </>
              )}
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
                      <span className="flex-shrink-0 text-3xl text-brand-primary">
                        {item.icono && isValidIconId(item.icono) ? (
                          <Icon icon={item.icono} className="text-3xl" />
                        ) : (
                          <Icon icon="mdi:backpack" className="text-3xl" />
                        )}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{item.titulo}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.texto}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.3)}>
                      <Icon icon="mdi:backpack" className="text-3xl text-brand-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('backpack')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">40-50L para rutas multinoche. 20-30L para día.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.35)}>
                      <Icon icon="mdi:hiking" className="text-3xl text-brand-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('poles')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Reducen impacto en rodillas y mejoran estabilidad.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.4)}>
                      <Icon icon="mdi:hard-hat" className="text-3xl text-brand-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{t('helmet')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Obligatorio en ascensos volcánicos y terrenos técnicos.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.45)}>
                      <Icon icon="mdi:snowflake" className="text-3xl text-brand-primary flex-shrink-0" />
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
                      <span className="flex-shrink-0 text-3xl text-brand-primary">
                        {item.icono && isValidIconId(item.icono) ? (
                          <Icon icon={item.icono} className="text-3xl" />
                        ) : (
                          <Icon icon="mdi:map-marker-path" className="text-3xl" />
                        )}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">{item.titulo}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.texto}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.5)}>
                      <span className="flex-shrink-0 text-3xl text-brand-primary">◀</span>
                      <div>
                        <h4 className="font-heading font-bold text-brand-dark dark:text-white">Marcas de sendero</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Cairns (montículos de piedras) y hitos pintados indican la ruta correcta.</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg" {...itemView(0.55)}>
                      <Icon icon="mdi:map-marker-path" className="text-3xl text-brand-primary flex-shrink-0" />
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
