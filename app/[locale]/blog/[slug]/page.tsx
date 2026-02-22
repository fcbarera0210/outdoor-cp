'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine, SkeletonImage } from '@/components/ui/Skeleton'
import { sectionView, itemView } from '@/components/ui/animations'
import { getPostBySlug } from '@/services/blog'
import type { BlogPost } from '@/services/blog'
import { useTranslation } from 'react-i18next'
import { useLocale, Link } from '@/i18n/navigation'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = useLocale()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const { t: tCommon } = useTranslation('common')
  const { t: tHome } = useTranslation('home')
  const { t: tBlog } = useTranslation('blog')

  useEffect(() => {
    getPostBySlug(params.slug, locale)
      .then(setPost)
      .finally(() => setLoading(false))
  }, [params.slug, locale])

  if (loading) {
    return (
      <div>
        <header className="relative h-[55vh] min-h-[400px] flex flex-col items-center justify-end bg-gray-800 overflow-hidden">
          <div className="relative z-10 pb-16 flex flex-col items-center px-4">
            <Skeleton className="h-12 w-96 max-w-full rounded" />
          </div>
        </header>
        <article className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <SkeletonImage className="h-80 rounded-lg mb-8" aspectRatio="" />
            <div className="flex gap-4 mb-8">
              <SkeletonLine className="w-32 h-4" />
              <SkeletonLine className="w-24 h-4" />
            </div>
            <div className="space-y-4 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonLine key={i} className="w-full" />
              ))}
            </div>
            <div className="pt-8 border-t border-gray-200 dark:border-gray-600">
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </article>
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
