import { AuthForm } from '@/components/auth/AuthForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Acesse sua conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm />
          
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/registro" className="underline">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}