'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6">
          <Link href="/" className="flex items-center font-bold">
            CursosTop
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/cursos"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/cursos' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Cursos
            </Link>
            {session && (
              <Link
                href="/perfil"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === '/perfil' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Perfil
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {session ? (
            <Button variant="outline" onClick={() => signOut()}>
              Sair
            </Button>
          ) : (
            <Button onClick={() => signIn()}>Entrar</Button>
          )}
        </div>
      </div>
    </header>
  )
}