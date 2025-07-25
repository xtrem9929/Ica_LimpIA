"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Users,
  Recycle,
  Heart,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Clock,
  Star,
} from "lucide-react"

const faqs = [
  {
    pregunta: "¿Cómo puedo reportar un punto crítico de basura?",
    respuesta:
      "Puedes reportar puntos críticos directamente desde nuestro mapa interactivo. Solo necesitas hacer clic en 'Reportar Problema', completar el formulario con la descripción y ubicación, y opcionalmente adjuntar una foto. Tu reporte será revisado y procesado por nuestro equipo.",
  },
  {
    pregunta: "¿Es gratuito usar la plataforma LimpIA Ica?",
    respuesta:
      "Sí, LimpIA Ica es completamente gratuita para todos los ciudadanos. Nuestro objetivo es facilitar la participación ciudadana en la gestión de residuos sin barreras económicas.",
  },
  {
    pregunta: "¿Cómo puedo encontrar puntos de reciclaje cerca de mi casa?",
    respuesta:
      "En la sección 'Mapa' puedes filtrar por tipo de residuo y ver todos los puntos de acopio disponibles. Cada punto incluye información sobre horarios, contacto y tipos de residuos que acepta.",
  },
  {
    pregunta: "¿Qué tipos de residuos puedo reciclar en Ica?",
    respuesta:
      "En Ica puedes reciclar plásticos, papel, cartón, vidrio, metales y residuos electrónicos. También hay puntos específicos para residuos orgánicos que se destinan al compostaje.",
  },
  {
    pregunta: "¿Cómo puedo unirme como voluntario?",
    respuesta:
      "Puedes registrarte como voluntario completando el formulario en esta página o contactándonos directamente. Organizamos actividades regulares de limpieza, educación ambiental y promoción del reciclaje.",
  },
  {
    pregunta: "¿Qué pasa después de que hago un reporte?",
    respuesta:
      "Una vez que envías un reporte, nuestro equipo lo revisa y lo clasifica según su prioridad. Luego se coordina con las autoridades locales correspondientes para su atención. Puedes seguir el estado de tu reporte en la plataforma.",
  },
]

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    distrito: "",
    tipoConsulta: "",
    prioridad: "",
    mensaje: "",
    tipoParticipacion: "",
    aceptaTerminos: false,
    aceptaNewsletter: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido"
    }

    if (formData.telefono && !/^[0-9]{9}$/.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Ingresa un número de teléfono válido (9 dígitos)"
    }

    if (!formData.tipoConsulta) {
      newErrors.tipoConsulta = "Selecciona el tipo de consulta"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio"
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres"
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simular envío del formulario
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Formulario enviado:", formData)
      setSubmitStatus("success")

      // Limpiar formulario después del éxito
      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          distrito: "",
          tipoConsulta: "",
          prioridad: "",
          mensaje: "",
          tipoParticipacion: "",
          aceptaTerminos: false,
          aceptaNewsletter: false,
        })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")
      console.error("Error al enviar formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200"
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baja":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Contacto y Participación
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ¿Tienes preguntas, sugerencias o quieres unirte a nuestra misión? Estamos aquí para escucharte y trabajar
          juntos por una Ica más limpia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de contacto mejorado */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                <div>
                  <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                  <CardDescription className="text-blue-100">
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Estado de envío */}
              {submitStatus === "success" && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información personal */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        placeholder="Ej: Juan Pérez García"
                        className={`mt-1 ${errors.nombre ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                        required
                      />
                      {errors.nombre && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.nombre}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                        className={`mt-1 ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                        placeholder="999 999 999"
                        className={`mt-1 ${errors.telefono ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                      />
                      {errors.telefono && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.telefono}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="distrito" className="text-sm font-medium text-gray-700">
                        Distrito
                      </Label>
                      <Select value={formData.distrito} onValueChange={(value) => handleInputChange("distrito", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona tu distrito" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ica">Ica</SelectItem>
                          <SelectItem value="la-tinguina">La Tinguiña</SelectItem>
                          <SelectItem value="los-aquijes">Los Aquijes</SelectItem>
                          <SelectItem value="ocucaje">Ocucaje</SelectItem>
                          <SelectItem value="pachacutec">Pachacutec</SelectItem>
                          <SelectItem value="parcona">Parcona</SelectItem>
                          <SelectItem value="pueblo-nuevo">Pueblo Nuevo</SelectItem>
                          <SelectItem value="salas">Salas</SelectItem>
                          <SelectItem value="san-jose-de-los-molinos">San José de los Molinos</SelectItem>
                          <SelectItem value="san-juan-bautista">San Juan Bautista</SelectItem>
                          <SelectItem value="santiago">Santiago</SelectItem>
                          <SelectItem value="subtanjalla">Subtanjalla</SelectItem>
                          <SelectItem value="tate">Tate</SelectItem>
                          <SelectItem value="yauca-del-rosario">Yauca del Rosario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Detalles de la consulta */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Detalles de tu Consulta</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipoConsulta" className="text-sm font-medium text-gray-700">
                        Tipo de Consulta *
                      </Label>
                      <Select
                        value={formData.tipoConsulta}
                        onValueChange={(value) => handleInputChange("tipoConsulta", value)}
                      >
                        <SelectTrigger className={`mt-1 ${errors.tipoConsulta ? "border-red-500" : "border-gray-300"}`}>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta-general">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Consulta General
                            </div>
                          </SelectItem>
                          <SelectItem value="reporte-problema">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Problema con Reporte
                            </div>
                          </SelectItem>
                          <SelectItem value="sugerencia">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Sugerencia
                            </div>
                          </SelectItem>
                          <SelectItem value="voluntariado">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Voluntariado
                            </div>
                          </SelectItem>
                          <SelectItem value="alianza">
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              Propuesta de Alianza
                            </div>
                          </SelectItem>
                          <SelectItem value="soporte-tecnico">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Soporte Técnico
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.tipoConsulta && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.tipoConsulta}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="prioridad" className="text-sm font-medium text-gray-700">
                        Prioridad
                      </Label>
                      <Select
                        value={formData.prioridad}
                        onValueChange={(value) => handleInputChange("prioridad", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona la prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baja">
                            <Badge className="bg-green-100 text-green-800 border-green-200">Baja</Badge>
                          </SelectItem>
                          <SelectItem value="media">
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Media</Badge>
                          </SelectItem>
                          <SelectItem value="alta">
                            <Badge className="bg-red-100 text-red-800 border-red-200">Alta</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      placeholder="Cuéntanos en detalle en qué podemos ayudarte. Incluye toda la información relevante..."
                      rows={5}
                      className={`mt-1 resize-none ${errors.mensaje ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                      required
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.mensaje ? (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.mensaje}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-xs">Mínimo 10 caracteres</p>
                      )}
                      <p className="text-gray-400 text-xs">{formData.mensaje.length}/500</p>
                    </div>
                  </div>
                </div>

                {/* Participación */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Participación (Opcional)</h3>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      ¿Te interesa participar como voluntario?
                    </Label>
                    <Select
                      value={formData.tipoParticipacion}
                      onValueChange={(value) => handleInputChange("tipoParticipacion", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-interesado">No estoy interesado</SelectItem>
                        <SelectItem value="voluntario-general">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Voluntario General
                          </div>
                        </SelectItem>
                        <SelectItem value="reciclador">
                          <div className="flex items-center gap-2">
                            <Recycle className="w-4 h-4" />
                            Reciclador
                          </div>
                        </SelectItem>
                        <SelectItem value="promotor-ambiental">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Promotor Ambiental
                          </div>
                        </SelectItem>
                        <SelectItem value="educador">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Educador Comunitario
                          </div>
                        </SelectItem>
                        <SelectItem value="desarrollador">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Colaborador Técnico
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terminos"
                      checked={formData.aceptaTerminos}
                      onCheckedChange={(checked) => handleInputChange("aceptaTerminos", checked as boolean)}
                      className={errors.aceptaTerminos ? "border-red-500" : ""}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terminos" className="text-sm font-medium cursor-pointer">
                        Acepto los{" "}
                        <a href="/terminos" className="text-blue-600 hover:underline font-semibold">
                          términos de uso
                        </a>{" "}
                        y la{" "}
                        <a href="/privacidad" className="text-blue-600 hover:underline font-semibold">
                          política de privacidad
                        </a>{" "}
                        *
                      </Label>
                      {errors.aceptaTerminos && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.aceptaTerminos}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.aceptaNewsletter}
                      onCheckedChange={(checked) => handleInputChange("aceptaNewsletter", checked as boolean)}
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer">
                      Quiero recibir noticias y actualizaciones sobre LimpIA Ica por correo electrónico
                    </Label>
                  </div>
                </div>

                {/* Botón de envío */}
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isSubmitting || submitStatus === "success"}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : submitStatus === "success" ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      ¡Mensaje Enviado!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </div>
                  )}
                </Button>

                {/* Tiempo de respuesta estimado */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Tiempo de respuesta estimado: 24-48 horas</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Información de contacto y participación */}
        <div className="space-y-6">
          {/* Información de contacto */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">contacto@limpiaica.pe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                <Phone className="w-5 h-5 text-cyan-600" />
                <div>
                  <p className="font-medium text-gray-800">Teléfono</p>
                  <p className="text-sm text-gray-600">+51 056 123 456</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Dirección</p>
                  <p className="text-sm text-gray-600">
                    Universidad Nacional San Luis Gonzaga de Ica
                    <br />
                    Av. Los Maestros S/N, Ica
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redes sociales */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Síguenos en Redes Sociales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Formas de participar */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Formas de Participar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Users className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Voluntario</p>
                  <p className="text-sm text-gray-600">Participa en actividades de limpieza y educación ambiental</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Recycle className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Reciclador</p>
                  <p className="text-sm text-gray-600">Únete a nuestra red de recicladores registrados</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors">
                <Heart className="w-5 h-5 text-cyan-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Promotor Ambiental</p>
                  <p className="text-sm text-gray-600">Ayuda a educar y sensibilizar a tu comunidad</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Preguntas Frecuentes
        </h2>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                    {faq.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.respuesta}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Call to action final */}
      <div className="text-center mt-16">
        <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-cyan-50 max-w-4xl mx-auto shadow-lg border-0">
          <CardContent className="py-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              ¡Únete al Cambio!
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Cada acción cuenta. Ya sea reportando un problema, reciclando correctamente o participando como
              voluntario, tu contribución hace la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="/mapa" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Reportar Ahora
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <a href="/blog" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Aprender Más
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
