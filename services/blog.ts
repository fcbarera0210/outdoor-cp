import { fetchApi } from './api'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
}

export async function getBlogPosts(locale: string = 'es'): Promise<BlogPost[]> {
  return fetchApi<BlogPost[]>('/api/blog', { locale })
}

export async function getPostBySlug(slug: string, locale: string = 'es'): Promise<BlogPost | null> {
  try {
    return await fetchApi<BlogPost>(`/api/blog/${slug}`, { locale })
  } catch {
    return null
  }
}

/** Raw post with both languages for admin */
export interface BlogPostAdmin {
  slug: string
  titleEs: string
  titleEn: string
  excerptEs: string
  excerptEn: string
  contentEs: string
  contentEn: string
  image: string
  date: string
  authorEs: string
  authorEn: string
}

export async function getPostBySlugForAdmin(slug: string): Promise<BlogPostAdmin | null> {
  try {
    return await fetchApi<BlogPostAdmin>(`/api/blog/${slug}`, { locale: 'all' })
  } catch {
    return null
  }
}

export async function createPost(body: Record<string, unknown>): Promise<unknown> {
  return fetchApi('/api/blog', { method: 'POST', body: JSON.stringify(body) })
}

export async function updatePost(slug: string, body: Record<string, unknown>): Promise<unknown> {
  return fetchApi(`/api/blog/${slug}`, { method: 'PUT', body: JSON.stringify(body) })
}

export async function deletePost(slug: string): Promise<void> {
  await fetchApi(`/api/blog/${slug}`, { method: 'DELETE' })
}
