import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request)
    const posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
    })

    const list = posts.map((p) => ({
      slug: p.slug,
      title: locale === 'es' ? p.titleEs : p.titleEn,
      excerpt: locale === 'es' ? p.excerptEs : p.excerptEn,
      content: locale === 'es' ? p.contentEs : p.contentEn,
      image: p.image,
      date: p.date,
      author: locale === 'es' ? p.authorEs : p.authorEn,
    }))
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    const body = await request.json()
    const post = await prisma.blogPost.create({
      data: {
        slug: body.slug ?? '',
        titleEs: body.titleEs ?? '',
        titleEn: body.titleEn ?? '',
        excerptEs: body.excerptEs ?? '',
        excerptEn: body.excerptEn ?? '',
        contentEs: body.contentEs ?? '',
        contentEn: body.contentEn ?? '',
        image: body.image ?? '',
        date: body.date ?? new Date().toISOString().slice(0, 10),
        authorEs: body.authorEs ?? '',
        authorEn: body.authorEn ?? '',
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
