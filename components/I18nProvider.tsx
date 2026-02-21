'use client'

import { useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { createInstance } from 'i18next'
import type { Locale } from '@/i18n/routing'
import { i18nextOptions } from '@/i18n/config'

type Messages = Record<string, Record<string, string>>

type Props = {
  locale: Locale
  messages: Messages
  children: React.ReactNode
}

export default function I18nProvider({ locale, messages, children }: Props) {
  const i18n = useMemo(() => {
    const instance = createInstance()
    instance.init({
      ...i18nextOptions,
      lng: locale,
      resources: { [locale]: messages },
    })
    return instance
  }, [locale, messages])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
