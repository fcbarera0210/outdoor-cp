import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const localeParam = request.nextUrl.searchParams.get('locale')
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (localeParam === 'all') {
      return NextResponse.json({
        slug: post.slug,
        titleEs: post.titleEs,
        titleEn: post.titleEn,
        excerptEs: post.excerptEs,
        excerptEn: post.excerptEn,
        contentEs: post.contentEs,
        contentEn: post.contentEn,
        image: post.image,
        date: post.date,
        authorEs: post.authorEs,
        authorEn: post.authorEn,
      })
    }

    const locale = localeParam === 'en' ? 'en' : 'es'
    return NextResponse.json({
      slug: post.slug,
      title: locale === 'es' ? post.titleEs : post.titleEn,
      excerpt: locale === 'es' ? post.excerptEs : post.excerptEn,
      content: locale === 'es' ? post.contentEs : post.contentEn,
      image: post.image,
      date: post.date,
      author: locale === 'es' ? post.authorEs : post.authorEn,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    const body = await request.json()
    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        ...(body.slug != null && { slug: body.slug }),
        ...(body.titleEs != null && { titleEs: body.titleEs }),
        ...(body.titleEn != null && { titleEn: body.titleEn }),
        ...(body.excerptEs != null && { excerptEs: body.excerptEs }),
        ...(body.excerptEn != null && { excerptEn: body.excerptEn }),
        ...(body.contentEs != null && { contentEs: body.contentEs }),
        ...(body.contentEn != null && { contentEn: body.contentEn }),
        ...(body.image != null && { image: body.image }),
        ...(body.date != null && { date: body.date }),
        ...(body.authorEs != null && { authorEs: body.authorEs }),
        ...(body.authorEn != null && { authorEn: body.authorEn }),
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    await prisma.blogPost.delete({ where: { slug: params.slug } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
