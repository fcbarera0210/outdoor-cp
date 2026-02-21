'use client'

import { Toaster } from 'sileo'
import { useTheme } from '@/components/providers/ThemeProvider'

const darkToastOptions = {
  fill: '#171717',
  roundness: 16,
  styles: {
    title: 'text-white!',
    description: 'text-white/75!',
    badge: 'bg-white/10!',
    button: 'bg-white/10! hover:bg-white/15!',
  },
}

export default function AdminToaster() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-right"
      options={theme === 'dark' ? darkToastOptions : undefined}
    />
  )
}
