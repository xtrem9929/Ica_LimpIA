"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Recycle, TrendingUp, ArrowRight, Sparkles, Target, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Completamente rediseñado */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-5xl mx-auto text-center text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 glass">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-medium text-cyan-100">Plataforma Digital Innovadora</span>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                Dale valor a lo que
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent animate-pulse-slow">
                descartas
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Plataforma digital para mejorar la gestión de residuos sólidos urbanos en Ica a través de la{" "}
              <span className="text-cyan-300 font-semibold">participación ciudadana</span> y{" "}
              <span className="text-blue-300 font-semibold">educación ambiental</span>
            </p>

            {/* Botones de acción mejorados */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="group bg-white text-blue-800 hover:bg-cyan-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Link href="/mapa" className="flex items-center gap-3">
                  <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Reporta un punto crítico
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="group glass border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Link href="/contacto" className="flex items-center gap-3">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Únete al reciclaje
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Indicadores de funcionalidades */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6 hover-lift">
                <MapPin className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Reporta Problemas</h3>
                <p className="text-sm opacity-80">Identifica puntos críticos con geolocalización</p>
              </div>
              <div className="glass rounded-2xl p-6 hover-lift">
                <Recycle className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Encuentra Puntos</h3>
                <p className="text-sm opacity-80">Localiza centros de reciclaje cercanos</p>
              </div>
              <div className="glass rounded-2xl p-6 hover-lift">
                <Users className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Únete a la Comunidad</h3>
                <p className="text-sm opacity-80">Colabora por una Ica más limpia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Estadísticas - Con animaciones */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Impacto en Nuestra Comunidad
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Recycle, number: "2,450", label: "Toneladas recicladas", color: "blue" },
              { icon: Users, number: "1,280", label: "Ciudadanos activos", color: "cyan" },
              { icon: MapPin, number: "156", label: "Puntos de acopio", color: "blue" },
              { icon: TrendingUp, number: "89%", label: "Reportes resueltos", color: "cyan" },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`text-center hover-lift animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <stat.icon className={`w-12 h-12 mx-auto text-${stat.color}-600 mb-4`} />
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.number}
                  </CardTitle>
                  <CardDescription className="text-lg">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades principales - Mejoradas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">¿Cómo Funciona LimpIA Ica?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las herramientas que ponemos a tu disposición para transformar nuestra ciudad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Reporta Problemas",
                description:
                  "Identifica y reporta puntos críticos de acumulación de basura con geolocalización precisa",
                link: "/mapa",
                buttonText: "Ir al Mapa",
                color: "blue",
                delay: "0s",
              },
              {
                icon: Recycle,
                title: "Encuentra Puntos de Reciclaje",
                description: "Localiza centros de acopio y puntos de reciclaje cercanos en tiempo real",
                link: "/mapa",
                buttonText: "Explorar Puntos",
                color: "cyan",
                delay: "0.1s",
              },
              {
                icon: Users,
                title: "Únete a la Comunidad",
                description: "Participa activamente y colabora con otros ciudadanos por una Ica más limpia",
                link: "/contacto",
                buttonText: "Participar",
                color: "blue",
                delay: "0.2s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`hover-lift animate-fadeInUp group`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className={`w-full group-hover:scale-105 transition-transform duration-300 ${feature.color === "cyan" ? "bg-cyan-600 hover:bg-cyan-700" : ""}`}
                  >
                    <Link href={feature.link} className="flex items-center justify-center gap-2">
                      {feature.buttonText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enlaces rápidos - Mejorados */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Recursos y Educación</h2>
            <p className="text-xl text-gray-600">Aprende y mantente informado sobre sostenibilidad</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-lift animate-fadeInLeft group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Recycle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Blog Educativo</CardTitle>
                <CardDescription className="text-gray-600">
                  Aprende sobre separación de residuos, compostaje y buenas prácticas ambientales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="group-hover:scale-105 transition-transform duration-300">
                  <Link href="/blog" className="flex items-center gap-2">
                    Leer Artículos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fadeInRight group">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Conoce al Equipo</CardTitle>
                <CardDescription className="text-gray-600">
                  Descubre quiénes están detrás de esta iniciativa por una Ica más sostenible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="group-hover:scale-105 transition-transform duration-300 bg-transparent"
                >
                  <Link href="/nosotros" className="flex items-center gap-2">
                    Conocer Más
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
