import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/cursos', '/perfil', '/certificado']
const authRoutes = ['/login', '/registro']

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (authRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/cursos', request.url))
    }
  }

  return NextResponse.next()
}