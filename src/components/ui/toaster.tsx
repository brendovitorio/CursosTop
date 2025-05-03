
'use client'

import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
      }}
      {...props}
    />
  )
}