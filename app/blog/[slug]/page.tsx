import { notFound } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
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
      <article className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="flex gap-4 text-sm text-brand-earth mb-8">
            <span>{new Date(post.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>|</span>
            <span>{post.author}</span>
          </div>
          <div className="prose prose-lg max-w-none font-body text-brand-dark">
            <p className="text-lg leading-relaxed">{post.content}</p>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="inline-flex items-center text-brand-dark font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group">
              <i className="fas fa-arrow-left mr-3"></i> Volver al Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
