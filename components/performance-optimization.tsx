"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function PerformanceOptimization() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Precarga de recursos críticos
    const preloadResources = async () => {
      try {
        console.log("Iniciando precarga de recursos...")

        // Lista de imágenes críticas para precargar
        const criticalImages = [
          "/images/ai-smart-logo.png",
          // Añadir otras imágenes críticas aquí
        ]

        let loadedCount = 0
        const totalImages = criticalImages.length

        // Función para precargar una imagen individual
        const preloadImage = (src: string) => {
          return new Promise((resolve) => {
            console.log(`Intentando precargar: ${src}`)

            const img = new Image()

            img.onload = () => {
              console.log(`Imagen precargada correctamente: ${src}`)
              loadedCount++
              setLoadingProgress((loadedCount / totalImages) * 100)
              resolve(true)
            }

            img.onerror = () => {
              console.warn(`No se pudo precargar la imagen: ${src}`)
              loadedCount++
              setLoadingProgress((loadedCount / totalImages) * 100)
              resolve(false)
            }

            img.src = src
          })
        }

        // Precargar imágenes secuencialmente
        for (const src of criticalImages) {
          await preloadImage(src)
        }

        console.log("Precarga de recursos completada")
      } catch (error) {
        console.error("Error durante la precarga:", error)
      } finally {
        // Siempre ocultar la pantalla de carga después de un tiempo
        setTimeout(() => {
          setIsLoading(false)
          console.log("Carga completada, ocultando pantalla de carga")
        }, 500)
      }
    }

    // Iniciar precarga
    preloadResources()

    // Asegurar que isLoading se establezca en false después de un tiempo máximo
    const safetyTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Tiempo de carga máximo alcanzado, forzando ocultación de pantalla de carga")
        setIsLoading(false)
      }
    }, 5000) // 5 segundos como tiempo máximo de carga

    return () => clearTimeout(safetyTimeout)
  }, [isLoading])

  // Componente de carga que se muestra mientras se cargan los recursos
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <div className="w-48 bg-gray-800 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">Cargando recursos...</p>
      </div>
    )
  }

  // No renderiza nada cuando la carga está completa
  return null
}
