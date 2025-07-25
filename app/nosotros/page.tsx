import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, Mail, MapPin, Recycle, BookOpen, Users, Target, Eye, Lightbulb } from "lucide-react"
import Image from "next/image"

const equipo = [
  {
    id: 1,
    nombre: "Ing. Erwin Peña Casas",
    rol: "Docente Supervisor",
    especialidad: "Introducción a la Ingeniería de Sistemas",
    descripcion:
      "Docente de la Facultad de Ingeniería de Sistemas, supervisor y guía del proyecto LimpIA Ica, con experiencia en desarrollo de proyectos tecnológicos de impacto social.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    email: "ewin.pena@unica.edu.pe",
  },
  {
    id: 2,
    nombre: "Jhamir Pérez Injante",
    rol: "Líder de Proyecto",
    especialidad: "Ingeniería de Sistemas",
    descripcion:
      "Estudiante de Ingeniería de Sistemas especializado en gestión de proyectos y desarrollo de aplicaciones web con enfoque en sostenibilidad urbana.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    github: "#",
    email: "jhamir.perez@estudiante.unica.edu.pe",
  },
  {
    id: 3,
    nombre: "Manuel Alviar Carhuayo",
    rol: "Desarrollador Full Stack",
    especialidad: "Ingeniería de Sistemas",
    descripcion:
      "Especializado en desarrollo web frontend y backend, con experiencia en bases de datos y APIs para aplicaciones de impacto social.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    github: "#",
    email: "manuel.alviar@estudiante.unica.edu.pe",
  },
  {
    id: 4,
    nombre: "Johan Ore Huillca",
    rol: "Especialista en Base de Datos",
    especialidad: "Ingeniería de Sistemas",
    descripcion:
      "Enfocado en el diseño y optimización de sistemas de información para la gestión eficiente de datos ambientales y reportes ciudadanos.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    github: "#",
    email: "johan.ore@estudiante.unica.edu.pe",
  },
  {
    id: 5,
    nombre: "Aldhair Navarrete Osis",
    rol: "Diseñador UX/UI",
    especialidad: "Ingeniería de Sistemas",
    descripcion:
      "Especializado en experiencia de usuario y diseño de interfaces, enfocado en crear soluciones digitales intuitivas para la participación ciudadana.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    linkedin: "#",
    email: "aldhair.navarrete@estudiante.unica.edu.pe",
  },
  {
    id: 6,
    nombre: "Jeremy Curioso Hernández",
    rol: "Analista de Sistemas",
    especialidad: "Ingeniería de Sistemas",
    descripcion:
      "Especializado en análisis de requerimientos y arquitectura de sistemas, enfocado en soluciones tecnológicas para gestión urbana sostenible.",
    imagen: "/placeholder.svg?height=300&width=300",
    universidad: "Universidad Nacional San Luis Gonzaga de Ica",
    github: "#",
    email: "jeremy.curioso@estudiante.unica.edu.pe",
  },
]

const funcionalidades = [
  {
    icono: <MapPin className="w-6 h-6" />,
    titulo: "Reportar puntos críticos",
    descripcion: "Identifica y reporta acumulación de basura con geolocalización precisa",
  },
  {
    icono: <Recycle className="w-6 h-6" />,
    titulo: "Ubicar puntos de reciclaje",
    descripcion: "Encuentra centros de acopio en tiempo real cerca de tu ubicación",
  },
  {
    icono: <BookOpen className="w-6 h-6" />,
    titulo: "Información educativa",
    descripcion: "Accede a guías sobre separación de residuos y compostaje",
  },
  {
    icono: <Users className="w-6 h-6" />,
    titulo: "Actividades comunitarias",
    descripcion: "Conéctate con voluntariados y eventos ambientales locales",
  },
]

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Conoce Nuestro Equipo</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Somos estudiantes de la Facultad de Ingeniería de Sistemas de la Universidad Nacional San Luis Gonzaga de Ica,
          comprometidos con la transformación de nuestra ciudad hacia un futuro más sostenible
        </p>
      </div>

      {/* Visión - Mejorada visualmente */}
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 md:p-12">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Eye className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra Visión</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl leading-relaxed font-light">
                Ser la <span className="font-semibold text-cyan-200">principal herramienta tecnológica</span> de impacto
                social en Ica, reconocida por empoderar a la comunidad en la conservación del espacio público y
                facilitar una
                <span className="font-semibold text-cyan-200">
                  {" "}
                  gestión urbana más eficiente, transparente y colaborativa
                </span>{" "}
                para el año 2030.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                <span className="text-cyan-200 font-semibold">Meta: 2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ¿A qué se dedica? - Mejorada visualmente */}
      <div className="mb-16">
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¿A qué se dedica LimpIA Ica?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  <span className="font-semibold text-blue-600">"LimpIA Ica"</span> es una plataforma web desarrollada
                  por estudiantes de
                  <span className="font-semibold"> Ingeniería de Sistemas</span> de la Universidad Nacional San Luis
                  Gonzaga de Ica, orientada a mejorar la{" "}
                  <span className="font-semibold text-cyan-600">gestión de residuos sólidos urbanos</span> a través de
                  la tecnología, participación ciudadana y educación ambiental.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Funcionalidades */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">La plataforma permite:</h3>
                  </div>
                  <div className="space-y-4">
                    {funcionalidades.map((func, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                          <div className="text-blue-600">{func.icono}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{func.titulo}</h4>
                          <p className="text-gray-600 text-sm">{func.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Objetivo */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-cyan-100 p-2 rounded-lg mr-3">
                      <Target className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Nuestro objetivo:</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Impulsar una ciudad más{" "}
                      <span className="font-semibold text-cyan-600">limpia, sostenible y organizada</span>, integrando a
                      ciudadanos, autoridades locales y recicladores en una
                      <span className="font-semibold text-blue-600"> red colaborativa de acción</span>.
                    </p>
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-cyan-600" />
                        <span className="font-semibold text-gray-800">Impacto esperado:</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Mayor participación ciudadana</li>
                        <li>• Gestión más eficiente de residuos</li>
                        <li>• Ciudad más limpia y sostenible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Equipo */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipo.map((miembro) => (
            <Card key={miembro.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={miembro.imagen || "/placeholder.svg"}
                  alt={miembro.nombre}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{miembro.nombre}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary" className="mb-2">
                    {miembro.rol}
                  </Badge>
                  <br />
                  <span className="text-sm">{miembro.especialidad}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{miembro.descripcion}</p>
                <p className="text-xs text-gray-500 mb-4">{miembro.universidad}</p>
                <div className="flex gap-3">
                  {miembro.linkedin && (
                    <a href={miembro.linkedin} className="text-cyan-600 hover:text-blue-800">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {miembro.github && (
                    <a href={miembro.github} className="text-gray-800 hover:text-gray-600">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  <a href={`mailto:${miembro.email}`} className="text-blue-600 hover:text-green-800">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Objetivos Estratégicos */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Objetivos Estratégicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <p className="text-gray-600">
                  Desarrollar una plataforma web y móvil funcional que permita reportar, visualizar y clasificar
                  espacios públicos deteriorados, con datos georreferenciados y soporte fotográfico.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-cyan-600 font-bold text-sm">2</span>
                </div>
                <p className="text-gray-600">
                  Fomentar alianzas con municipalidades, juntas vecinales y organizaciones civiles, para que los
                  reportes generados tengan respuesta efectiva y trazabilidad.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <p className="text-gray-600">
                  Crear campañas de sensibilización ciudadana para aumentar el uso de la plataforma y fortalecer la
                  conciencia sobre la importancia del cuidado del espacio público.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-cyan-600 font-bold text-sm">4</span>
                </div>
                <p className="text-gray-600">
                  Implementar un sistema de analítica de datos e informes automatizados, que permita generar
                  estadísticas y mapas de calor para la toma de decisiones por parte de las autoridades.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institución de respaldo */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Institución de Respaldo</CardTitle>
          <CardDescription className="text-center">Proyecto desarrollado bajo el respaldo académico de</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-lg font-bold text-blue-600">UNICA</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Universidad Nacional San Luis Gonzaga de Ica</h3>
              <p className="text-sm text-gray-600">Facultad de Ingeniería de Sistemas</p>
              <p className="text-sm text-gray-600">Ica - Perú</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to action */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold mb-4">¿Quieres Colaborar con Nosotros?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Si eres estudiante, profesional o ciudadano comprometido con el desarrollo sostenible de Ica, nos encantaría
          conocer tus ideas y propuestas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contacto"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Únete como Voluntario
          </a>
          <a
            href="mailto:equipo@limpiaica.pe"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Enviar Propuesta
          </a>
        </div>
      </div>
    </div>
  )
}
