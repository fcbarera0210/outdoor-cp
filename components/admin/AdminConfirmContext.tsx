'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import AdminButton from './AdminButton'

export interface ConfirmOptions {
  title: string
  message: string
  confirmLabel?: string
  variant?: 'danger' | 'primary'
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

const AdminConfirmContext = createContext<ConfirmFn | null>(null)

export function useConfirm(): ConfirmFn {
  const confirmFn = useContext(AdminConfirmContext)
  if (!confirmFn) {
    throw new Error('useConfirm must be used within AdminConfirmProvider')
  }
  return confirmFn
}

interface State extends ConfirmOptions {
  open: boolean
}

const initialState: State = {
  open: false,
  title: '',
  message: '',
  confirmLabel: 'Confirmar',
  variant: 'danger',
}

export function AdminConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState)
  const resolveRef = useRef<((value: boolean) => void) | null>(null)

  const close = useCallback((value: boolean) => {
    resolveRef.current?.(value)
    resolveRef.current = null
    setState((prev) => ({ ...prev, open: false }))
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.open) {
        e.preventDefault()
        close(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [state.open, close])

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
      setState({
        open: true,
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel ?? 'Confirmar',
        variant: options.variant ?? 'danger',
      })
    })
  }, [])

  return (
    <AdminConfirmContext.Provider value={confirm}>
      {children}
      {state.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-confirm-title"
          aria-describedby="admin-confirm-message"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => close(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-lg border-2 border-gray-200 bg-white p-6 shadow-xl dark:border-gray-600 dark:bg-gray-800">
            <h2
              id="admin-confirm-title"
              className="font-heading text-xl font-bold uppercase tracking-wide text-brand-dark dark:text-white mb-2"
            >
              {state.title}
            </h2>
            <p
              id="admin-confirm-message"
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              {state.message}
            </p>
            <div className="flex justify-end gap-3">
              <AdminButton variant="secondary" onClick={() => close(false)}>
                Cancelar
              </AdminButton>
              <button
                type="button"
                onClick={() => close(true)}
                className="rounded-lg inline-flex items-center justify-center gap-2 px-4 py-2 font-heading font-bold uppercase tracking-widest text-sm transition bg-brand-primary hover:bg-brand-dark text-white"
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminConfirmContext.Provider>
  )
}
