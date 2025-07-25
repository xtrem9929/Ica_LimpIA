"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const routeNames: Record<string, string> = {
  "/": "Inicio",
  "/mapa": "Mapa Interactivo",
  "/blog": "Blog Educativo",
  "/nosotros": "Nosotros",
  "/contacto": "Contacto y Participación",
}

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") return null

  return (
    <nav className="bg-gray-50 border-b py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">{routeNames[pathname] || "Página"}</span>
        </div>
      </div>
    </nav>
  )
}
