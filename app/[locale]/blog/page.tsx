'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getBlogPosts } from '@/services/blog'
import type { BlogPost } from '@/services/blog'
import { useTranslation } from 'react-i18next'
import { useLocale, Link } from '@/i18n/navigation'

export default function BlogPage() {
  const locale = useLocale()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation('blog')
  const { t: tHome } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')

  useEffect(() => {
    getBlogPosts(locale)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [locale])

  return (
    <div>
      <HeroCompact title={t('title')} subtitle={t('subtitle')} breadcrumb={[{ label: tHome('breadcrumbHome'), href: '/' }, { label: t('breadcrumb') }]} />
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {loading ? (
            <div className="flex justify-center py-20 text-brand-dark dark:text-white font-heading uppercase">{tCommon('loading')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div key={post.slug} {...itemView(index * 0.1)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary rounded-lg overflow-hidden transition duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
                      <span className="absolute bottom-4 left-4 text-xs font-heading uppercase tracking-widest text-white">
                        {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-CL' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2 group-hover:text-brand-primary transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-light line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}
