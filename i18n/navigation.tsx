'use client'

import React from 'react'
import NextLink from 'next/link'
import { usePathname as useNextPathname, useRouter as useNextRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { Locale } from './routing'
import { defaultLocale } from './routing'
import { pathWithLocale } from './path'

function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/')[1]
  if (segment === 'es' || segment === 'en') return segment
  return null
}

function pathnameWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  if (!locale) return pathname
  const rest = pathname.slice(locale.length + 1)
  return rest ? `/${rest}` : '/'
}

export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return (i18n.language as Locale) || defaultLocale
}

export function usePathname(): string {
  const pathname = useNextPathname()
  return pathnameWithoutLocale(pathname ?? '')
}

export function useRouter() {
  const nextRouter = useNextRouter()
  const locale = useLocale()
  return {
    push: (path: string) => nextRouter.push(pathWithLocale(path, locale)),
    replace: (path: string) => nextRouter.replace(pathWithLocale(path, locale)),
    back: nextRouter.back,
    forward: nextRouter.forward,
    refresh: nextRouter.refresh,
    prefetch: nextRouter.prefetch,
  }
}

export function getPathname(path: string, locale: Locale): string {
  return pathWithLocale(path, locale)
}

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> & {
  href: string
  locale?: Locale
}

export function Link({ href, locale: localeProp, ...props }: LinkProps) {
  const currentLocale = useLocale()
  const targetLocale = localeProp ?? currentLocale
  const normalizedPath = pathnameWithoutLocale(href.startsWith('/') ? href : `/${href}`) || '/'
  const resolvedHref = pathWithLocale(normalizedPath === '/' ? '' : normalizedPath, targetLocale)
  return <NextLink href={resolvedHref} {...props} />
}

