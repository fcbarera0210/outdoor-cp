'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getPostBySlug } from '@/services/blog'
import type { BlogPost } from '@/services/blog'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = useLocale()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const tCommon = useTranslations('common')
  const tHome = useTranslations('home')
  const tBlog = useTranslations('blog')

  useEffect(() => {
    getPostBySlug(params.slug, locale)
      .then(setPost)
      .finally(() => setLoading(false))
  }, [params.slug, locale])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-dark dark:text-white font-heading uppercase">{tCommon('loading')}</p>
      </div>
    )
  }
  if (!post) notFound()

  return (
    <div>
      <HeroCompact
        title={post.title}
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
          { label: tBlog('title'), href: '/blog' },
          { label: post.title },
        ]}
      />
      <motion.article
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div className="mb-8" {...itemView(0)}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div className="flex gap-4 text-sm text-brand-earth dark:text-gray-400 mb-8" {...itemView(0.05)}>
            <span>{new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-CL' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>|</span>
            <span>{post.author}</span>
          </motion.div>
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none font-body text-brand-dark dark:text-gray-200"
            {...itemView(0.1)}
          >
            <p className="text-lg leading-relaxed">{post.content}</p>
          </motion.div>
          <motion.div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600" {...itemView(0.15)}>
            <Link href="/blog" className="inline-flex items-center text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group">
              <i className="fas fa-arrow-left mr-3"></i> {tCommon('backToBlog')}
            </Link>
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}
