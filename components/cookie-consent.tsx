"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya ha aceptado las cookies
    const hasConsent = localStorage.getItem("cookieConsent")
    if (!hasConsent) {
      // Mostrar el banner después de un breve retraso
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900/95 backdrop-blur-md border-t border-blue-500/30"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Utilizamos cookies</h3>
                <p className="text-gray-300 text-sm">
                  Este sitio utiliza cookies para mejorar tu experiencia, personalizar contenido y analizar el tráfico.
                  Al hacer clic en "Aceptar", consientes el uso de cookies según nuestra{" "}
                  <Link href="/politica-privacidad" className="text-blue-400 hover:underline">
                    política de privacidad
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
