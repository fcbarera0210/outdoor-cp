'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'turismo-theme'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  // Sincronizar con el script inline que pudo haber aplicado ya la clase
  if (document.documentElement.classList.contains('dark')) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Sincronizar con el script inline que ya pudo haber aplicado la clase
    const value = getInitialTheme()
    setThemeState(value)
    document.documentElement.classList.toggle('dark', value === 'dark')
  }, [mounted])

  const setTheme = (value: Theme) => {
    setThemeState(value)
    localStorage.setItem(STORAGE_KEY, value)
    document.documentElement.classList.toggle('dark', value === 'dark')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
