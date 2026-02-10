'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getPostBySlug } from '@/data/blog'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div>
      <HeroCompact
        title={post.title}
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Blog', href: '/blog' },
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
            <span>{new Date(post.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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
              <i className="fas fa-arrow-left mr-3"></i> Volver al Blog
            </Link>
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}
