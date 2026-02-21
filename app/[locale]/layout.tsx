import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/routing'
import { getMessages } from '@/i18n/messages'
import { locales } from '@/i18n/routing'
import I18nProvider from '@/components/I18nProvider'
import PageLayout from '@/components/layout/PageLayout'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const messages = await getMessages(locale)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <PageLayout>{children}</PageLayout>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
