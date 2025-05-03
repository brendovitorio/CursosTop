import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Head>
        <title>CursosTop - Aprenda com os Melhores Cursos Gratuitos</title>
      </Head>

      <header className="bg-blue-600 text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CursosTop</h1>
        <Link href="/cursos">
          <Button className="bg-white text-blue-600 font-semibold hover:bg-zinc-100">Acessar Cursos</Button>
        </Link>
      </header>

      <main className="p-8 flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-blue-700">Encontre os Melhores Cursos Gratuitos do YouTube</h2>
        <p className="text-lg text-zinc-700 max-w-2xl mb-6">
          Nossa plataforma recomenda os cursos mais assistidos e completos por categoria. Aprenda Front-end, Back-end, IA, Design, Culinária e muito mais. Totalmente gratuito.
        </p>
        <Link href="/cursos">
          <Button className="text-white bg-blue-600 hover:bg-blue-700 text-xl px-6 py-4 rounded-xl">
            Comece Agora
          </Button>
        </Link>
      </main>

      <footer className="bg-zinc-900 text-white text-center p-4 mt-12">
        <p>&copy; 2025 CursosTop. Todos os direitos reservados. | <a className="underline" href="#">Política de Privacidade</a></p>
      </footer>
    </div>
  );
}
