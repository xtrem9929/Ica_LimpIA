"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <Leaf className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-2xl font-bold text-gray-800">LimpIA Ica</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`nav-link transition-all duration-200 ${
                pathname === "/"
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/mapa"
              className={`nav-link transition-all duration-200 ${
                pathname === "/mapa"
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Mapa
            </Link>
            <Link
              href="/blog"
              className={`nav-link transition-all duration-200 ${
                pathname === "/blog"
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/nosotros"
              className={`nav-link transition-all duration-200 ${
                pathname === "/nosotros"
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className={`nav-link transition-all duration-200 ${
                pathname === "/contacto"
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-all duration-200 hover:bg-blue-50"
            >
              {isOpen ? (
                <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 py-4 border-t" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`transition-all duration-200 ${
                pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/mapa"
              className={`transition-all duration-200 ${
                pathname === "/mapa" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Mapa
            </Link>
            <Link
              href="/blog"
              className={`transition-all duration-200 ${
                pathname === "/blog" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/nosotros"
              className={`transition-all duration-200 ${
                pathname === "/nosotros" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className={`transition-all duration-200 ${
                pathname === "/contacto" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
