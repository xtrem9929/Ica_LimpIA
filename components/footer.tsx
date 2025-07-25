import Link from "next/link"
import { Leaf, Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold">LimpIA Ica</span>
            </div>
            <p className="text-gray-300 mb-4">
              Transformando Ica hacia una ciudad más limpia y sostenible a través de la participación ciudadana y la
              tecnología.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors" />
              <Mail className="w-6 h-6 text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cyan-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-cyan-400 hover:text-white transition-colors">
                  Mapa Interactivo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-cyan-400 hover:text-white transition-colors">
                  Blog Educativo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-cyan-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Participación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contacto" className="text-cyan-400 hover:text-white transition-colors">
                  Únete como Voluntario
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-cyan-400 hover:text-white transition-colors">
                  Reportar Problema
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-cyan-400 hover:text-white transition-colors">
                  Sugerir Punto de Acopio
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-cyan-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="text-cyan-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-cyan-400 hover:text-white transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-cyan-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 LimpIA Ica. Todos los derechos reservados. Desarrollado con ❤️ para una Ica más sostenible.
          </p>
        </div>
      </div>
    </footer>
  )
}
