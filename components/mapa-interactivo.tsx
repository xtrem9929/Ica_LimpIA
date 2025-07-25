"use client"

import { useEffect, useRef, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Punto {
  id: number
  lat: number
  lng: number
  tipo: "reporte" | "acopio"
  titulo: string
  descripcion: string
  categoria: string
  fecha: string
  estado?: string
  telefono?: string
  horario?: string
  imagen?: string
}

interface MapaInteractivoProps {
  puntos: Punto[]
  filtroTipo: string
}

export default function MapaInteractivo({ puntos, filtroTipo }: MapaInteractivoProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Memorizar puntos filtrados para evitar recreaciones innecesarias
  const puntosFiltrados = useMemo(() => {
    if (filtroTipo === "todos") return puntos
    return puntos.filter((punto) => punto.categoria.toLowerCase() === filtroTipo.toLowerCase())
  }, [puntos, filtroTipo])

  // Inicializar mapa
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = () => {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current!, {
          center: { lat: -14.0678, lng: -75.7286 },
          zoom: 14,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        })
        mapInstanceRef.current = map
      } else {
        // Fallback a OpenStreetMap si Google Maps no está disponible
        initOpenStreetMap()
      }
    }

    const initOpenStreetMap = () => {
      if (typeof window !== "undefined" && !window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.onload = () => {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)

          const map = window.L.map(mapRef.current!).setView([-14.0678, -75.7286], 14)
          window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map)
          mapInstanceRef.current = map
        }
        document.head.appendChild(script)
      }
    }

    if (window.google) {
      initMap()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_X0Q&libraries=places&callback=initGoogleMap`
      script.async = true
      script.defer = true
      window.initGoogleMap = initMap
      document.head.appendChild(script)
    }

    return () => {
      if (window.initGoogleMap) {
        delete window.initGoogleMap
      }
    }
  }, [])

  // Actualizar marcadores cuando cambien los puntos filtrados
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => {
      if (window.google && marker.setMap) {
        marker.setMap(null)
      } else if (window.L && marker.remove) {
        marker.remove()
      }
    })
    markersRef.current = []

    // Agregar nuevos marcadores
    puntosFiltrados.forEach((punto) => {
      if (window.google && window.google.maps) {
        const marker = new window.google.maps.Marker({
          position: { lat: punto.lat, lng: punto.lng },
          map: mapInstanceRef.current,
          title: punto.titulo,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: punto.tipo === "reporte" ? "#ef4444" : "#3b82f6",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold text-sm">${punto.titulo}</h3>
              <p class="text-xs text-gray-600 mb-2">${punto.descripcion}</p>
              <div class="flex items-center gap-2 text-xs">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">${punto.categoria}</span>
                <span class="text-gray-500">${punto.fecha}</span>
              </div>
              ${punto.telefono ? `<p class="text-xs mt-1">📞 ${punto.telefono}</p>` : ""}
              ${punto.horario ? `<p class="text-xs">🕒 ${punto.horario}</p>` : ""}
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(mapInstanceRef.current, marker)
        })

        markersRef.current.push(marker)
      } else if (window.L) {
        const marker = window.L.marker([punto.lat, punto.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div>
              <h3 style="font-weight: bold; font-size: 14px;">${punto.titulo}</h3>
              <p style="font-size: 12px; color: #666; margin: 8px 0;">${punto.descripcion}</p>
              <div style="font-size: 11px;">
                <span style="background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px;">${punto.categoria}</span>
                <span style="color: #666; margin-left: 8px;">${punto.fecha}</span>
              </div>
              ${punto.telefono ? `<p style="font-size: 11px; margin-top: 4px;">📞 ${punto.telefono}</p>` : ""}
              ${punto.horario ? `<p style="font-size: 11px;">🕒 ${punto.horario}</p>` : ""}
            </div>
          `)

        markersRef.current.push(marker)
      }
    })
  }, [puntosFiltrados])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Mapa Interactivo de Ica
          <Badge variant="secondary" className="ml-auto">
            {puntosFiltrados.length} puntos
          </Badge>
        </CardTitle>
        <CardDescription>
          Visualiza reportes de problemas y puntos de acopio. Haz clic en los marcadores para ver más detalles.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapRef} className="w-full h-[600px] rounded-lg" style={{ minHeight: "600px" }} />

        {/* Leyenda */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border z-10 max-h-32 overflow-y-auto">
          <h4 className="font-semibold text-sm mb-2">Leyenda</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Reportes de Problemas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Puntos de Acopio</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
