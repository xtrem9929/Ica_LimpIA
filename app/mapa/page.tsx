"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import MapaInteractivo from "@/components/mapa-interactivo"
import FormularioUbicacion from "@/components/formulario-ubicacion"
import { MapPin, AlertTriangle, Recycle, Filter, Plus } from "lucide-react"

// Datos de ejemplo
const puntosIniciales = [
  {
    id: 1,
    lat: -14.0678,
    lng: -75.7286,
    tipo: "reporte" as const,
    titulo: "Basura acumulada en Plaza de Armas",
    descripcion: "Gran cantidad de residuos sólidos acumulados en la esquina de la plaza principal",
    categoria: "crítico",
    estado: "Pendiente",
    fecha: "2024-01-15",
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    lat: -14.0695,
    lng: -75.7301,
    tipo: "acopio" as const,
    titulo: "Centro de Acopio Municipal",
    descripcion: "Punto de recolección oficial de la municipalidad",
    categoria: "mixto",
    fecha: "2024-01-10",
    telefono: "+51 956 123 456",
    horario: "Lunes a Viernes 8:00 - 17:00",
  },
  {
    id: 3,
    lat: -14.0661,
    lng: -75.7271,
    tipo: "reporte" as const,
    titulo: "Contenedor desbordado",
    descripcion: "Contenedor de basura completamente lleno y desbordado",
    categoria: "moderado",
    estado: "En Proceso",
    fecha: "2024-01-14",
  },
  {
    id: 4,
    lat: -14.0702,
    lng: -75.7315,
    tipo: "acopio" as const,
    titulo: "Recicladora San Martín",
    descripcion: "Centro especializado en reciclaje de plásticos y papel",
    categoria: "plástico",
    fecha: "2024-01-08",
    telefono: "+51 956 789 012",
    horario: "Lunes a Sábado 7:00 - 18:00",
  },
  {
    id: 5,
    lat: -14.0645,
    lng: -75.7255,
    tipo: "reporte" as const,
    titulo: "Residuos en vía pública",
    descripcion: "Bolsas de basura abandonadas en la acera",
    categoria: "leve",
    estado: "Resuelto",
    fecha: "2024-01-12",
  },
  {
    id: 6,
    lat: -14.072,
    lng: -75.733,
    tipo: "acopio" as const,
    titulo: "EcoVidrio Ica",
    descripcion: "Especialistas en recolección y reciclaje de vidrio",
    categoria: "vidrio",
    fecha: "2024-01-05",
    telefono: "+51 956 345 678",
    horario: "Martes a Domingo 9:00 - 16:00",
  },
  {
    id: 7,
    lat: -14.063,
    lng: -75.724,
    tipo: "reporte" as const,
    titulo: "Punto crítico de acumulación",
    descripcion: "Zona donde se acumula basura constantemente por falta de contenedores",
    categoria: "crítico",
    estado: "Pendiente",
    fecha: "2024-01-16",
    imagen: "/placeholder.svg?height=200&width=300",
  },
]

export default function MapaPage() {
  const [puntos, setPuntos] = useState(puntosIniciales)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [tabActiva, setTabActiva] = useState("mapa")

  const agregarPunto = (nuevoPunto: any) => {
    const punto = {
      ...nuevoPunto,
      id: Date.now(),
      lat: Number.parseFloat(nuevoPunto.lat),
      lng: Number.parseFloat(nuevoPunto.lng),
    }
    setPuntos((prev) => [...prev, punto])
    setTabActiva("mapa")
  }

  const opcionesFiltro = [
    { value: "todos", label: "Todos los puntos", count: puntos.length },
    { value: "crítico", label: "Reportes críticos", count: puntos.filter((p) => p.categoria === "crítico").length },
    { value: "moderado", label: "Reportes moderados", count: puntos.filter((p) => p.categoria === "moderado").length },
    { value: "leve", label: "Reportes leves", count: puntos.filter((p) => p.categoria === "leve").length },
    { value: "plástico", label: "Acopio plástico", count: puntos.filter((p) => p.categoria === "plástico").length },
    { value: "papel", label: "Acopio papel", count: puntos.filter((p) => p.categoria === "papel").length },
    { value: "vidrio", label: "Acopio vidrio", count: puntos.filter((p) => p.categoria === "vidrio").length },
    { value: "orgánico", label: "Acopio orgánico", count: puntos.filter((p) => p.categoria === "orgánico").length },
    {
      value: "electrónico",
      label: "Acopio electrónico",
      count: puntos.filter((p) => p.categoria === "electrónico").length,
    },
    { value: "mixto", label: "Acopio mixto", count: puntos.filter((p) => p.categoria === "mixto").length },
  ]

  const estadisticas = {
    totalReportes: puntos.filter((p) => p.tipo === "reporte").length,
    reportesPendientes: puntos.filter((p) => p.tipo === "reporte" && p.estado === "Pendiente").length,
    reportesResueltos: puntos.filter((p) => p.tipo === "reporte" && p.estado === "Resuelto").length,
    puntosAcopio: puntos.filter((p) => p.tipo === "acopio").length,
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Mapa Interactivo de Residuos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Visualiza reportes de problemas y puntos de acopio de residuos sólidos en Ica. Contribuye reportando problemas
          o registrando nuevos puntos de recolección.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{estadisticas.totalReportes}</div>
            <div className="text-sm text-gray-600">Total Reportes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{estadisticas.reportesPendientes}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{estadisticas.reportesResueltos}</div>
            <div className="text-sm text-gray-600">Resueltos</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Recycle className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{estadisticas.puntosAcopio}</div>
            <div className="text-sm text-gray-600">Puntos Acopio</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principales */}
      <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mapa" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Ver Mapa
          </TabsTrigger>
          <TabsTrigger value="reportar" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Reportar Problema
          </TabsTrigger>
          <TabsTrigger value="acopio" className="flex items-center gap-2">
            <Recycle className="w-4 h-4" />
            Registrar Acopio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mapa" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
              <CardDescription>Filtra los puntos mostrados en el mapa por tipo y categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar filtro" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      {opcionesFiltro.map((opcion) => (
                        <SelectItem key={opcion.value} value={opcion.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{opcion.label}</span>
                            <Badge variant="secondary" className="ml-2">
                              {opcion.count}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTabActiva("reportar")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Reportar
                  </Button>
                  <Button variant="outline" onClick={() => setTabActiva("acopio")} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Acopio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa */}
          <MapaInteractivo puntos={puntos} filtroTipo={filtroTipo} />
        </TabsContent>

        <TabsContent value="reportar">
          <FormularioUbicacion tipo="reporte" onSubmit={agregarPunto} />
        </TabsContent>

        <TabsContent value="acopio">
          <FormularioUbicacion tipo="acopio" onSubmit={agregarPunto} />
        </TabsContent>
      </Tabs>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo usar el mapa?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Reportar Problemas
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Identifica problemas de residuos en tu zona</li>
                <li>• Toma una foto del problema</li>
                <li>• Proporciona tu ubicación exacta</li>
                <li>• Clasifica el nivel de prioridad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Recycle className="w-4 h-4 text-blue-500" />
                Registrar Puntos de Acopio
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Registra centros de reciclaje</li>
                <li>• Especifica tipos de residuos aceptados</li>
                <li>• Incluye horarios de atención</li>
                <li>• Proporciona información de contacto</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
