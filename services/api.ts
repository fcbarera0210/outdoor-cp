const BASE = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function apiUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path.startsWith('http') ? path : `${BASE}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }
  return url.toString()
}

export async function fetchApi<T>(path: string, options?: RequestInit & { locale?: string }): Promise<T> {
  const { locale, ...init } = options ?? {}
  const url = apiUrl(path, locale ? { locale } : undefined)
  const res = await fetch(url, {
    ...init,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((err as { error?: string }).error || res.statusText)
  }
  return res.json() as Promise<T>
}
