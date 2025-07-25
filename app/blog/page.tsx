"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Filter,
  AlertTriangle,
  BookOpen,
  Camera,
  MapPin,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Artículos educativos
const articulosEducativos = [
  {
    id: 1,
    titulo: "Guía Completa para la Separación de Residuos en Casa",
    resumen:
      "Aprende las mejores prácticas para separar correctamente tus residuos domésticos y contribuir al reciclaje efectivo.",
    autor: "María González",
    fecha: "2024-01-15",
    categoria: "Educación",
    imagen: "/placeholder.svg?height=200&width=400&text=Separación+de+Residuos",
    tiempoLectura: "5 min",
    contenido: "La separación adecuada de residuos es fundamental para un reciclaje efectivo...",
  },
  {
    id: 2,
    titulo: "El Impacto del Compostaje Urbano en Ica",
    resumen:
      "Descubre cómo el compostaje doméstico puede reducir significativamente los residuos orgánicos en nuestra ciudad.",
    autor: "Carlos Mendoza",
    fecha: "2024-01-12",
    categoria: "Sostenibilidad",
    imagen: "/placeholder.svg?height=200&width=400&text=Compostaje+Urbano",
    tiempoLectura: "7 min",
    contenido: "El compostaje urbano representa una solución sostenible para la gestión de residuos orgánicos...",
  },
  {
    id: 3,
    titulo: "Reciclaje de Electrónicos: ¿Qué Hacer con tus Dispositivos Viejos?",
    resumen: "Una guía práctica sobre cómo deshacerte responsablemente de tus dispositivos electrónicos obsoletos.",
    autor: "Ana Rodríguez",
    fecha: "2024-01-10",
    categoria: "Tecnología",
    imagen: "/placeholder.svg?height=200&width=400&text=Reciclaje+Electrónicos",
    tiempoLectura: "6 min",
    contenido: "Los dispositivos electrónicos requieren un manejo especial debido a sus componentes...",
  },
  {
    id: 4,
    titulo: "Casos de Éxito: Comunidades de Ica que Transformaron su Entorno",
    resumen:
      "Conoce las historias inspiradoras de barrios que lograron mejorar significativamente su gestión de residuos.",
    autor: "Luis Vargas",
    fecha: "2024-01-08",
    categoria: "Casos de Éxito",
    imagen: "/placeholder.svg?height=200&width=400&text=Casos+de+Éxito",
    tiempoLectura: "8 min",
    contenido: "Estas comunidades han demostrado que con organización y compromiso se pueden lograr grandes cambios...",
  },
]

// Reportes de la comunidad (simulando datos que vendrían del mapa)
const reportesComunidad = [
  {
    id: 101,
    titulo: "Basura acumulada en Plaza de Armas",
    descripcion:
      "Gran cantidad de residuos sólidos acumulados en la esquina de la plaza principal, generando malos olores y atrayendo vectores.",
    autor: "Ciudadano Anónimo",
    fecha: "2024-01-16",
    categoria: "crítico",
    estado: "Pendiente",
    ubicacion: "Plaza de Armas, Centro de Ica",
    imagen: "/placeholder.svg?height=300&width=400&text=Basura+Plaza+de+Armas",
    coordenadas: { lat: -14.0678, lng: -75.7286 },
    reportes: 12,
    comentarios: 8,
  },
  {
    id: 102,
    titulo: "Contenedor desbordado en Mercado Central",
    descripcion: "El contenedor de basura está completamente lleno y los residuos se derraman en la vía pública.",
    autor: "María Quispe",
    fecha: "2024-01-15",
    categoria: "moderado",
    estado: "En Proceso",
    ubicacion: "Mercado Central, Ica",
    imagen: "/placeholder.svg?height=300&width=400&text=Contenedor+Desbordado",
    coordenadas: { lat: -14.0695, lng: -75.7301 },
    reportes: 8,
    comentarios: 5,
  },
  {
    id: 103,
    titulo: "Punto crítico de acumulación en Av. Grau",
    descripcion: "Zona donde se acumula basura constantemente por falta de contenedores adecuados.",
    autor: "José Mendoza",
    fecha: "2024-01-14",
    categoria: "crítico",
    estado: "Pendiente",
    ubicacion: "Av. Grau con Jr. Lima",
    imagen: "/placeholder.svg?height=300&width=400&text=Acumulación+Av+Grau",
    coordenadas: { lat: -14.063, lng: -75.724 },
    reportes: 15,
    comentarios: 12,
  },
  {
    id: 104,
    titulo: "Residuos en parque infantil",
    descripcion: "Bolsas de basura abandonadas cerca del área de juegos, representando un riesgo para los niños.",
    autor: "Carmen Silva",
    fecha: "2024-01-13",
    categoria: "moderado",
    estado: "Resuelto",
    ubicacion: "Parque Los Héroes",
    imagen: "/placeholder.svg?height=300&width=400&text=Parque+Infantil",
    coordenadas: { lat: -14.0661, lng: -75.7271 },
    reportes: 6,
    comentarios: 3,
  },
  {
    id: 105,
    titulo: "Problema menor en Jr. Callao",
    descripcion: "Algunos residuos dispersos en la acera, fácil de limpiar pero requiere atención.",
    autor: "Pedro Ramírez",
    fecha: "2024-01-12",
    categoria: "leve",
    estado: "Resuelto",
    ubicacion: "Jr. Callao cuadra 3",
    imagen: "/placeholder.svg?height=300&width=400&text=Jr+Callao",
    coordenadas: { lat: -14.0645, lng: -75.7255 },
    reportes: 3,
    comentarios: 1,
  },
]

const categorias = ["Todas", "Educación", "Sostenibilidad", "Tecnología", "Casos de Éxito", "Políticas", "Entrevistas"]
const categoriasReportes = ["Todos", "Crítico", "Moderado", "Leve"]
const estadosReportes = ["Todos", "Pendiente", "En Proceso", "Resuelto"]

export default function BlogPage() {
  const [busquedaReportes, setBusquedaReportes] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas")
  const [categoriaReporteFiltro, setCategoriaReporteFiltro] = useState("Todos")
  const [estadoReporteFiltro, setEstadoReporteFiltro] = useState("Todos")

  // Filtrar artículos educativos (sin búsqueda)
  const articulosFiltrados = articulosEducativos.filter((articulo) => {
    const coincideCategoria = categoriaFiltro === "Todas" || articulo.categoria === categoriaFiltro
    return coincideCategoria
  })

  // Filtrar reportes de la comunidad (con búsqueda)
  const reportesFiltrados = reportesComunidad.filter((reporte) => {
    const coincideBusqueda =
      reporte.titulo.toLowerCase().includes(busquedaReportes.toLowerCase()) ||
      reporte.descripcion.toLowerCase().includes(busquedaReportes.toLowerCase())
    const coincideCategoria =
      categoriaReporteFiltro === "Todos" || reporte.categoria.toLowerCase() === categoriaReporteFiltro.toLowerCase()
    const coincideEstado = estadoReporteFiltro === "Todos" || reporte.estado === estadoReporteFiltro
    return coincideBusqueda && coincideCategoria && coincideEstado
  })

  const getBadgeVariant = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case "crítico":
        return "destructive"
      case "moderado":
        return "default"
      case "leve":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "destructive"
      case "En Proceso":
        return "default"
      case "Resuelto":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog Comunitario LimpIA</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Mantente informado con contenido educativo sobre gestión de residuos y conoce los reportes de nuestra
          comunidad
        </p>
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="educativo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="educativo" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Contenido Educativo
          </TabsTrigger>
          <TabsTrigger value="reportes" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Reportes de la Comunidad
          </TabsTrigger>
        </TabsList>

        {/* Tab de Contenido Educativo */}
        <TabsContent value="educativo" className="space-y-8">
          {/* Filtros para artículos */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categorias.map((categoria) => (
              <Badge
                key={categoria}
                variant={categoria === categoriaFiltro ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setCategoriaFiltro(categoria)}
              >
                {categoria}
              </Badge>
            ))}
          </div>

          {/* Artículo destacado */}
          {articulosFiltrados.length > 0 && (
            <Card className="mb-12 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={articulosFiltrados[0].imagen || "/placeholder.svg"}
                    alt={articulosFiltrados[0].titulo}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <Badge className="mb-3">{articulosFiltrados[0].categoria}</Badge>
                  <h2 className="text-2xl font-bold mb-3">{articulosFiltrados[0].titulo}</h2>
                  <p className="text-gray-600 mb-4">{articulosFiltrados[0].resumen}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {articulosFiltrados[0].autor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {articulosFiltrados[0].fecha}
                    </div>
                    <span>{articulosFiltrados[0].tiempoLectura} de lectura</span>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${articulosFiltrados[0].id}`}>
                      Leer Artículo Completo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Grid de artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articulosFiltrados.slice(1).map((articulo) => (
              <Card key={articulo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={articulo.imagen || "/placeholder.svg"}
                    alt={articulo.titulo}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3">{articulo.categoria}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{articulo.titulo}</CardTitle>
                  <CardDescription className="line-clamp-3">{articulo.resumen}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {articulo.autor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {articulo.fecha}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{articulo.tiempoLectura} de lectura</span>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${articulo.id}`}>Leer Más</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {articulosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron artículos</h3>
              <p className="text-gray-500">Intenta con otros filtros</p>
            </div>
          )}
        </TabsContent>

        {/* Tab de Reportes de la Comunidad */}
        <TabsContent value="reportes" className="space-y-8">
          {/* Barra de búsqueda para reportes */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar reportes..."
                value={busquedaReportes}
                onChange={(e) => setBusquedaReportes(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros para reportes */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Select value={categoriaReporteFiltro} onValueChange={setCategoriaReporteFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoriasReportes.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={estadoReporteFiltro} onValueChange={setEstadoReporteFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosReportes.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid de reportes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportesFiltrados.map((reporte) => (
              <Card key={reporte.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={reporte.imagen || "/placeholder.svg"}
                    alt={reporte.titulo}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={getBadgeVariant(reporte.categoria)}>
                      {reporte.categoria.charAt(0).toUpperCase() + reporte.categoria.slice(1)}
                    </Badge>
                    <Badge variant={getEstadoBadgeVariant(reporte.estado)}>{reporte.estado}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      <Camera className="w-3 h-3 mr-1" />
                      Foto
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{reporte.titulo}</CardTitle>
                  <CardDescription className="line-clamp-3">{reporte.descripcion}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{reporte.ubicacion}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {reporte.autor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {reporte.fecha}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{reporte.reportes} reportes similares</span>
                      <span>{reporte.comentarios} comentarios</span>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/mapa?lat=${reporte.coordenadas.lat}&lng=${reporte.coordenadas.lng}`}>
                        Ver en Mapa
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reportesFiltrados.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron reportes</h3>
              <p className="text-gray-500">Intenta con otros términos de búsqueda o filtros</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
