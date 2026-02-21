'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useLocale } from '@/i18n/navigation'

interface BlogPostPreview {
  slug: string
  title: string
  image: string
  date: string
}

interface ContactData {
  instagram?: string
  youtube?: string
}

export default function Footer() {
  const { t } = useTranslation('footer')
  const locale = useLocale()
  const [recentPosts, setRecentPosts] = useState<BlogPostPreview[]>([])
  const [contact, setContact] = useState<ContactData>({})

  useEffect(() => {
    fetch(`/api/blog?locale=${locale}`)
      .then((r) => r.ok ? r.json() : [])
      .then((posts: BlogPostPreview[]) => setRecentPosts(posts.slice(0, 2)))
      .catch(() => {})

    fetch('/api/settings/contacto')
      .then((r) => r.ok ? r.json() : null)
      .then((data: ContactData | null) => { if (data) setContact(data) })
      .catch(() => {})
  }, [locale])

  return (
    <footer className="bg-brand-dark dark:bg-gray-950 text-white py-20 border-t border-white/10 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:col-span-1">
            <Link href="/">
              <img src="/logos/che-blanco-2.svg" alt="Cherry Experience - Andes of Chile" className="h-16 w-auto mb-6" />
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex space-x-4 text-gray-400 text-lg">
              <a href={contact.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition"><i className="fab fa-instagram"></i></a>
              <a href={contact.youtube || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">{t('recentBlog')}</h4>
            <ul className="space-y-6 text-gray-400">
              {recentPosts.map((post) => (
                <li key={post.slug} className="flex gap-4 group cursor-pointer">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'}
                    className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    alt={post.title}
                  />
                  <div>
                    <Link href={`/blog/${post.slug}`} className="block group-hover:text-brand-primary transition font-bold text-gray-300 uppercase text-xs leading-tight mb-1">{post.title}</Link>
                    <span className="text-[10px] text-gray-600 block">{post.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">{t('usefulInfo')}</h4>
            <ul className="space-y-3 text-gray-400 uppercase text-xs font-bold tracking-wider">
              <li><Link href="/equipo#dificultad" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> {t('difficultyLevels')}</Link></li>
              <li><Link href="/equipo" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> {t('symbology')}</Link></li>
              <li><Link href="/contacto" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> {t('contact')}</Link></li>
              <li><Link href="/reserva" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> {t('book')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">Instagram</h4>
            <div className="grid grid-cols-3 gap-2">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1519681393784-d8e5b5a4570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1533240332313-0dbdd3199061?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 dark:border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          <p>{t('copyright')}</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white">{t('privacy')}</a>
            <a href="#" className="hover:text-white">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
