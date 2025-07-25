import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LimpIA Ica - Dale valor a lo que descartas",
  description:
    "Plataforma digital para mejorar la gestión de residuos sólidos urbanos en Ica a través de la participación ciudadana y educación ambiental",
  keywords: "reciclaje, residuos, Ica, medio ambiente, sostenibilidad, participación ciudadana",
  authors: [{ name: "Equipo LimpIA Ica" }],
  openGraph: {
    title: "LimpIA Ica - Dale valor a lo que descartas",
    description: "Plataforma digital para mejorar la gestión de residuos sólidos urbanos en Ica",
    type: "website",
  },
    generator: 'v0.dev'
}

// Componente de loading optimizado
function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading-skeleton w-32 h-8 rounded"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/placeholder.svg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prefetch de páginas importantes */}
        <link rel="prefetch" href="/mapa" />
        <link rel="prefetch" href="/contacto" />
        <link rel="prefetch" href="/blog" />
        <link rel="prefetch" href="/nosotros" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1 page-transition">
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
          </main>
          <Footer />
        </div>
        {/* Preload de imágenes en el background */}
        <div className="preload-image"></div>
      </body>
    </html>
  )
}
