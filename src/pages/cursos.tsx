import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import jsPDF from "jspdf";

interface Course {
  title: string;
  video: string;
}

type CoursesByCategory = Record<string, Course[]>;

const categories = [
  "Front-end",
  "Back-end",
  "Mobile",
  "Cloud Computing",
  "CMS",
  "UI/UX",
  "Games",
  "3D",
  "IA",
  "Culinária",
  "Linguagem",
  "Libras",
  "Materias Escolares",
] as const;

const dummyCourses: CoursesByCategory = {
    "Front-end": [
      {
        title: "HTML Completo e Profissional - Curso em Vídeo",
        video: "https://www.youtube.com/embed/BXqUH86F-kA",
      },
      {
        title: "Curso de CSS3 - Curso em Vídeo",
        video: "https://www.youtube.com/embed/Ejkb_YpuHWs",
      },
      {
        title: "Curso JavaScript Completo ES6+ - OneBitCode",
        video: "https://www.youtube.com/embed/BGTx91t8q50",
      },
      {
        title: "Curso de Tailwind CSS - Hora de Codar",
        video: "https://www.youtube.com/embed/6zIuAyLZPH0",
      },
      {
        title: "Curso de React para Iniciantes - CFBCursos",
        video: "https://www.youtube.com/embed/NpEaa2P7qZI",
      },
      {
        title: "Curso de Next.js - Sujeito Programador",
        video: "https://www.youtube.com/embed/mS__2i_e3lc",
      },
      {
        title: "Curso de Vue.js - Matheus Battisti",
        video: "https://www.youtube.com/embed/6kL28S0YJgQ",
      },
      {
        title: "Curso Angular Completo - Loiane Groner",
        video: "https://www.youtube.com/embed/4jC90GKtQn8",
      },
      {
        title: "Curso TypeScript - Curso em Vídeo",
        video: "https://www.youtube.com/embed/0mYq5LrQN1s",
      },
      {
        title: "Curso SASS Completo - DevMedia",
        video: "https://www.youtube.com/embed/Zz6eOVaaelI",
      },
    ],
  
    "Back-end": [
      {
        title: "Curso de Node.js para Iniciantes - Hora de Codar",
        video: "https://www.youtube.com/embed/LLqq6FemMNQ",
      },
      {
        title: "Curso de PHP Moderno - RBtech",
        video: "https://www.youtube.com/embed/F7KzJ7e6EAc",
      },
      {
        title: "Curso de Django - Python para Web - Hashtag Programação",
        video: "https://www.youtube.com/embed/r9L9XbHu5I4",
      },
      {
        title: "Curso Completo de Java - Loiane Groner",
        video: "https://www.youtube.com/embed/VKjFuX91G5Q",
      },
      {
        title: "Curso de Spring Boot - Michelli Brito",
        video: "https://www.youtube.com/embed/LRphoRnSJ6I",
      },
      {
        title: "Curso de API REST com Express - Rocketseat",
        video: "https://www.youtube.com/embed/ghTrp1x_1As",
      },
      {
        title: "Curso de MongoDB - Diego Fernandes",
        video: "https://www.youtube.com/embed/K1yG5Gg6XGY",
      },
      {
        title: "Curso de PostgreSQL - Boson Treinamentos",
        video: "https://www.youtube.com/embed/uUdKAYl-F7g",
      },
    ],
  
    "Mobile": [
      {
        title: "Curso de Flutter - Flutterando",
        video: "https://www.youtube.com/embed/6Jy0yY_7W6I",
      },
      {
        title: "Curso de React Native - Sujeito Programador",
        video: "https://www.youtube.com/embed/0mYq5LrQN1s",
      },
      {
        title: "Curso de Android com Kotlin - DevMaster Team",
        video: "https://www.youtube.com/embed/meYx5M6PkNE",
      },
      {
        title: "Curso de Swift para iOS - Diego Fernandes",
        video: "https://www.youtube.com/embed/aiXvvL1wNUc",
      },
      {
        title: "Curso de Ionic - Cod3r Cursos",
        video: "https://www.youtube.com/embed/9zQHFN7_6_4",
      },
    ],
  
    "Cloud Computing": [
      {
        title: "Curso de AWS para Iniciantes - Escola da Nuvem",
        video: "https://www.youtube.com/embed/ZLkyf7ZKEQ8",
      },
      {
        title: "Curso de Azure Fundamentals - Microsoft",
        video: "https://www.youtube.com/embed/NKEFWyqJ5XA",
      },
      {
        title: "Curso de Google Cloud - GCP Explicado",
        video: "https://www.youtube.com/embed/18jIzE41fJ4",
      },
      {
        title: "Curso de Docker - Full Cycle",
        video: "https://www.youtube.com/embed/31ieHmcTUOk",
      },
      {
        title: "Curso de Kubernetes - Linuxtips",
        video: "https://www.youtube.com/embed/J0NuOlA2xDc",
      },
    ],
  
    "CMS": [
      {
        title: "Curso de WordPress para Iniciantes - Hostinger",
        video: "https://www.youtube.com/embed/8AZ8GqW5iak",
      },
      {
        title: "Curso de Joomla - Escola do Marketing Digital",
        video: "https://www.youtube.com/embed/8lXp0Hckzqk",
      },
      {
        title: "Curso de Drupal - Alura",
        video: "https://www.youtube.com/embed/6J5MZUMwixY",
      },
      {
        title: "Curso de Shopify - Ecommerce na Prática",
        video: "https://www.youtube.com/embed/6fzYDBOqT0o",
      },
    ],
  
    "UI/UX": [
      {
        title: "Curso de UI/UX Design - Diego Fernandes",
        video: "https://www.youtube.com/embed/6fdZJHY42Gg",
      },
      {
        title: "Curso de Figma - Designer Brinde",
        video: "https://www.youtube.com/embed/RSZQ8GkQhXU",
      },
      {
        title: "Curso de Adobe XD - André Rafael",
        video: "https://www.youtube.com/embed/5HZAuOJ__6E",
      },
      {
        title: "Curso de Design Thinking - Mergo",
        video: "https://www.youtube.com/embed/ccY3hR7qjK8",
      },
    ],
  
    "Games": [
      {
        title: "Curso de Unity - Brackeys",
        video: "https://www.youtube.com/embed/j48LtUkZRjU",
      },
      {
        title: "Curso de Unreal Engine 5 - DevSquad",
        video: "https://www.youtube.com/embed/k-zMkzmduqI",
      },
      {
        title: "Curso de Godot - GDquest",
        video: "https://www.youtube.com/embed/QKEL03QK3QY",
      },
      {
        title: "Curso de Desenvolvimento de Jogos com JavaScript - CFBCursos",
        video: "https://www.youtube.com/embed/jOAU81jdi-c",
      },
    ],
  
    "3D": [
      {
        title: "Curso de Blender para Iniciantes - Blender Studio",
        video: "https://www.youtube.com/embed/JYj6e-72RDs",
      },
      {
        title: "Curso de Maya - Autodesk",
        video: "https://www.youtube.com/embed/3F-7FJB7D4s",
      },
      {
        title: "Curso de 3ds Max - Renderiza",
        video: "https://www.youtube.com/embed/5wpt8eQZR8M",
      },
      {
        title: "Curso de ZBrush - Pixologic",
        video: "https://www.youtube.com/embed/0Xw8ltb9I5E",
      },
    ],
  
    "IA": [
      {
        title: "Curso de Machine Learning - Coursera (Andrew Ng)",
        video: "https://www.youtube.com/embed/PPLop4L2eGk",
      },
      {
        title: "Curso de Python para IA - Hashtag Programação",
        video: "https://www.youtube.com/embed/u6wyZwyTVoA",
      },
      {
        title: "Curso de TensorFlow - TensorFlow",
        video: "https://www.youtube.com/embed/tPYj3fFJGjk",
      },
      {
        title: "Curso de Chatbots - Alura",
        video: "https://www.youtube.com/embed/wwl5aqZH6p4",
      },
    ],
  
    "Culinária": [
      {
        title: "Curso de Culinária Básica - Panelinha",
        video: "https://www.youtube.com/embed/7Yk9FyN4j5M",
      },
      {
        title: "Curso de Confeitaria - Confeiteira de Sucesso",
        video: "https://www.youtube.com/embed/3qmVQK1ZQBM",
      },
      {
        title: "Curso de Gastronomia - Receitas do Chef",
        video: "https://www.youtube.com/embed/2FZQJ1ZJpX0",
      },
      {
        title: "Curso de Bebidas - Academia do Bar",
        video: "https://www.youtube.com/embed/5Lw3jKk8j5w",
      },
    ],
  
    "Linguagem": [
      {
        title: "Curso de Inglês - BBC Learning English",
        video: "https://www.youtube.com/embed/5MdJlWTEz4o",
      },
      {
        title: "Curso de Espanhol - Espanhol com Juan",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
      {
        title: "Curso de Francês - Français avec Pierre",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
      {
        title: "Curso de Italiano - Italiano Automatico",
        video: "https://www.youtube.com/embed/1oaL4wY1HjQ",
      },
    ],
  
    "Libras": [
      {
        title: "Curso Básico de Libras - Instituto Libras",
        video: "https://www.youtube.com/embed/5MdJlWTEz4o",
      },
      {
        title: "Libras para Iniciantes - Hand Talk",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
      {
        title: "Curso Completo de Libras - Libras 24h",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
    ],
  
    "Materias Escolares": [
      {
        title: "Matemática Básica - Matemática Rio",
        video: "https://www.youtube.com/embed/yQioD7yOj5Q",
      },
      {
        title: "Física para o ENEM - Professor Boaro",
        video: "https://www.youtube.com/embed/5MdJlWTEz4o",
      },
      {
        title: "Química em Ação - Michel Abs",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
      {
        title: "História Online - Parabólica",
        video: "https://www.youtube.com/embed/4uJxEx7qkpo",
      },
    ],
};

export default function CursosPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Head>
        <title>Plataforma de Cursos Gratuitos</title>
      </Head>

      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">CursosTop</h1>
        {session ? (
          <div className="flex gap-2 items-center">
            <span>{session.user?.name}</span>
            <Button onClick={() => signOut()}>Sair</Button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Entrar</Button>
        )}
      </header>

      <main className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Explore os melhores cursos gratuitos do YouTube</h2>

        <Tabs defaultValue="Front-end" className="w-full">
          <TabsList className="flex flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {(dummyCourses[cat] || []).map((course, i) => (
                  <Card key={i} className="bg-white dark:bg-zinc-900">
                    <CardContent className="p-2">
                      <iframe
                        width="100%"
                        height="200"
                        src={course.video}
                        title={course.title}
                        allowFullScreen
                      ></iframe>
                      <p className="mt-2 font-semibold">{course.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="bg-zinc-900 text-white text-center p-4 mt-8">
        <p>&copy; 2025 CursosTop. Todos os direitos reservados. | <a className="underline" href="#">Política de Privacidade</a></p>
      </footer>
    </div>
  );
}