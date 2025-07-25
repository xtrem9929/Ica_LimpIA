"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormularioUbicacionProps {
  tipo: "reporte" | "acopio"
  onSubmit: (data: any) => void
  onCancel?: () => void
}

export default function FormularioUbicacion({ tipo, onSubmit, onCancel }: FormularioUbicacionProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    lat: "",
    lng: "",
    direccion: "",
    telefono: "",
    horario: "",
    imagen: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [ubicacionLoading, setUbicacionLoading] = useState(false)
  const [imagenPreview, setImagenPreview] = useState<string | null>(null)
  const { toast } = useToast()

  const opcionesReporte = [
    { value: "crítico", label: "Crítico - Requiere atención inmediata" },
    { value: "moderado", label: "Moderado - Problema considerable" },
    { value: "leve", label: "Leve - Problema menor" },
  ]

  const opcionesAcopio = [
    { value: "plástico", label: "Plástico - Botellas, envases" },
    { value: "papel", label: "Papel - Cartón, periódicos" },
    { value: "vidrio", label: "Vidrio - Botellas, frascos" },
    { value: "orgánico", label: "Orgánico - Restos de comida" },
    { value: "electrónico", label: "Electrónico - Dispositivos, baterías" },
    { value: "mixto", label: "Mixto - Varios tipos de residuos" },
  ]

  const obtenerUbicacion = () => {
    setUbicacionLoading(true)

    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive",
      })
      setUbicacionLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prev) => ({
          ...prev,
          lat: latitude.toString(),
          lng: longitude.toString(),
        }))

        // Geocodificación inversa para obtener la dirección
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&language=es`,
          )
          const data = await response.json()
          if (data.results && data.results[0]) {
            setFormData((prev) => ({
              ...prev,
              direccion: data.results[0].formatted,
            }))
          }
        } catch (error) {
          console.error("Error en geocodificación:", error)
        }

        setUbicacionLoading(false)
        toast({
          title: "Ubicación obtenida",
          description: "Se ha obtenido tu ubicación actual",
        })
      },
      (error) => {
        setUbicacionLoading(false)
        toast({
          title: "Error de ubicación",
          description: "No se pudo obtener tu ubicación. Ingresa las coordenadas manualmente.",
          variant: "destructive",
        })
      },
    )
  }

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: "La imagen debe ser menor a 5MB",
          variant: "destructive",
        })
        return
      }

      setFormData((prev) => ({ ...prev, imagen: file }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagenPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const eliminarImagen = () => {
    setFormData((prev) => ({ ...prev, imagen: null }))
    setImagenPreview(null)
  }

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validaciones
    if (!formData.titulo || !formData.descripcion || !formData.categoria) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!formData.lat || !formData.lng) {
      toast({
        title: "Ubicación requerida",
        description: "Por favor proporciona las coordenadas de ubicación",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (tipo === "acopio" && !formData.telefono) {
      toast({
        title: "Teléfono requerido",
        description: "Los puntos de acopio requieren un número de contacto",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      // Simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const nuevoItem = {
        tipo,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        lat: formData.lat,
        lng: formData.lng,
        direccion: formData.direccion,
        ...(tipo === "acopio" && {
          telefono: formData.telefono,
          horario: formData.horario || "No especificado",
        }),
        ...(tipo === "reporte" && {
          estado: "Pendiente",
        }),
        imagen: formData.imagen ? URL.createObjectURL(formData.imagen) : undefined,
      }

      onSubmit(nuevoItem)

      toast({
        title: tipo === "reporte" ? "Reporte enviado" : "Punto de acopio registrado",
        description: `Tu ${tipo === "reporte" ? "reporte" : "punto de acopio"} ha sido registrado exitosamente`,
      })

      // Limpiar formulario
      setFormData({
        titulo: "",
        descripcion: "",
        categoria: "",
        lat: "",
        lng: "",
        direccion: "",
        telefono: "",
        horario: "",
        imagen: null,
      })
      setImagenPreview(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{tipo === "reporte" ? "Reportar Problema de Residuos" : "Registrar Punto de Acopio"}</CardTitle>
        <CardDescription>
          {tipo === "reporte"
            ? "Ayuda a mantener Ica limpia reportando problemas de residuos sólidos"
            : "Registra un nuevo punto de recolección de residuos para la comunidad"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarSubmit} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
              placeholder={tipo === "reporte" ? "Ej: Basura acumulada en esquina" : "Ej: Centro de Reciclaje Municipal"}
              required
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
              placeholder={
                tipo === "reporte"
                  ? "Describe el problema detalladamente..."
                  : "Describe los servicios y tipos de residuos que acepta..."
              }
              rows={3}
              required
            />
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoria">{tipo === "reporte" ? "Nivel de Prioridad *" : "Tipo de Residuos *"}</Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, categoria: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {(tipo === "reporte" ? opcionesReporte : opcionesAcopio).map((opcion) => (
                  <SelectItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ubicación */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ubicación *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={obtenerUbicacion}
                disabled={ubicacionLoading}
                className="flex items-center gap-2 bg-transparent"
              >
                {ubicacionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                Obtener mi ubicación
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitud *</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lat: e.target.value }))}
                  placeholder="-14.0678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitud *</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lng: e.target.value }))}
                  placeholder="-75.7286"
                  required
                />
              </div>
            </div>

            {formData.direccion && (
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => setFormData((prev) => ({ ...prev, direccion: e.target.value }))}
                  placeholder="Dirección aproximada"
                />
              </div>
            )}
          </div>

          {/* Campos específicos para acopio */}
          {tipo === "acopio" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono de Contacto *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                  placeholder="+51 956 123 456"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horario de Atención</Label>
                <Input
                  id="horario"
                  value={formData.horario}
                  onChange={(e) => setFormData((prev) => ({ ...prev, horario: e.target.value }))}
                  placeholder="Ej: Lunes a Viernes 8:00 - 17:00"
                />
              </div>
            </>
          )}

          {/* Imagen */}
          <div className="space-y-2">
            <Label htmlFor="imagen">Imagen {tipo === "reporte" ? "(Recomendada)" : "(Opcional)"}</Label>
            <div className="flex items-center gap-4">
              <Input id="imagen" type="file" accept="image/*" onChange={manejarImagen} className="flex-1" />
              <Button type="button" variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Camera className="w-4 h-4" />
                Seleccionar
              </Button>
            </div>
            <p className="text-xs text-gray-500">Máximo 5MB. Formatos: JPG, PNG, WebP</p>

            {imagenPreview && (
              <div className="relative inline-block">
                <img
                  src={imagenPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                  onClick={eliminarImagen}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : tipo === "reporte" ? (
                "Enviar Reporte"
              ) : (
                "Registrar Punto de Acopio"
              )}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
