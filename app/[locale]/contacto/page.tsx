'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getContactoSettings } from '@/services/settings'
import type { ContactoSettings } from '@/services/settings'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/i18n/navigation'

export default function ContactoPage() {
  const locale = useLocale()
  const [enviado, setEnviado] = useState(false)
  const [settings, setSettings] = useState<ContactoSettings | null>(null)
  useEffect(() => {
    getContactoSettings(locale).then(setSettings).catch(() => setSettings(null))
  }, [locale])
  const { t } = useTranslation('contacto')
  const { t: tHome } = useTranslation('home')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div>
      <HeroCompact
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
          { label: t('title') },
        ]}
      />
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...itemView(0)}>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8">{t('contactData')}</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <i className="fas fa-phone-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">{t('phone')}</p>
                    <a href={settings ? `tel:${settings.telefono?.replace(/\s/g, '')}` : 'tel:+56912345678'} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary transition">{settings?.telefono ?? '+56 9 1234 5678'}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-envelope text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">{t('email')}</p>
                    <a href={settings ? `mailto:${settings.email}` : 'mailto:contacto@cherryexperience.cl'} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary transition">{settings?.email ?? 'contacto@cherryexperience.cl'}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-map-marker-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">{t('location')}</p>
                    <p className="text-gray-600 dark:text-gray-400">{settings?.ubicacion ?? 'Puerto Varas, Región de Los Lagos, Chile'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 font-heading uppercase text-sm">{t('mapPlaceholder')}</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...itemView(0.1)}>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8">{t('sendMessage')}</h2>
              {enviado ? (
                <div className="bg-brand-primary/10 border-2 border-brand-primary rounded-lg p-8 text-center">
                  <i className="fas fa-check-circle text-4xl text-brand-primary mb-4"></i>
                  <p className="font-heading font-bold text-brand-dark dark:text-white uppercase">{t('messageSent')}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{t('messageSentDetail')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">{t('name')}</label>
                      <input type="text" required className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent" placeholder={t('yourName')} />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">{t('email')}</label>
                      <input type="email" required className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent" placeholder="correo@ejemplo.com" />
                    </div>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">{t('phone')}</label>
                    <input type="tel" className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent" placeholder="+56 9 1234 5678" />
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">{t('subject')}</label>
                    <select className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-white dark:bg-gray-800">
                      <option>{t('generalQuery')}</option>
                      <option>{t('booking')}</option>
                      <option>{t('routeInfo')}</option>
                      <option>{t('other')}</option>
                    </select>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">{t('message')}</label>
                    <textarea rows={4} required className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent resize-none" placeholder={t('messagePlaceholder')} />
                  </div>
                  <button type="submit" className="mt-8 w-full rounded-lg bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-widest py-4 transition">
                    {t('sendButton')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
