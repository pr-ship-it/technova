"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Type, Moon, Sun, Maximize, Minimize, X } from "lucide-react"

export default function AccessibilityTools() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100) // Porcentaje del tamaño de fuente
  const [contrast, setContrast] = useState("normal") // normal, high
  const [theme, setTheme] = useState("dark") // light, dark

  // Aplicar cambios de accesibilidad
  const applyAccessibilityChanges = () => {
    // Cambiar tamaño de fuente
    document.documentElement.style.fontSize = `${fontSize}%`

    // Cambiar contraste
    if (contrast === "high") {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Cambiar tema
    if (theme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    }
  }

  // Aplicar cambios cuando se actualicen las opciones
  useState(() => {
    applyAccessibilityChanges()
  })

  // Incrementar tamaño de fuente
  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize((prev) => {
        const newSize = prev + 10
        document.documentElement.style.fontSize = `${newSize}%`
        return newSize
      })
    }
  }

  // Reducir tamaño de fuente
  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize((prev) => {
        const newSize = prev - 10
        document.documentElement.style.fontSize = `${newSize}%`
        return newSize
      })
    }
  }

  // Alternar contraste
  const toggleContrast = () => {
    setContrast((prev) => {
      const newContrast = prev === "normal" ? "high" : "normal"
      if (newContrast === "high") {
        document.documentElement.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
      }
      return newContrast
    })
  }

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark"
      if (newTheme === "light") {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
      } else {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
      }
      return newTheme
    })
  }

  return (
    <>
      {/* Botón de accesibilidad */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Opciones de accesibilidad"
      >
        <Eye size={20} />
      </motion.button>

      {/* Panel de accesibilidad */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900 border-l border-blue-500/30 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Accesibilidad</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Cerrar panel de accesibilidad"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tamaño de texto */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <Type size={18} className="mr-2" />
                  Tamaño de texto
                </h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={decreaseFontSize}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                    aria-label="Reducir tamaño de texto"
                    disabled={fontSize <= 80}
                  >
                    <Minimize size={18} />
                  </button>
                  <span className="text-white font-medium">{fontSize}%</span>
                  <button
                    onClick={increaseFontSize}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                    aria-label="Aumentar tamaño de texto"
                    disabled={fontSize >= 150}
                  >
                    <Maximize size={18} />
                  </button>
                </div>
              </div>

              {/* Contraste */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Contraste</h3>
                <button
                  onClick={toggleContrast}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    contrast === "high" ? "bg-white text-black" : "bg-gray-800 text-white hover:bg-gray-700"
                  } transition-colors`}
                >
                  <span>{contrast === "high" ? "Alto contraste" : "Contraste normal"}</span>
                  <Eye size={18} />
                </button>
              </div>

              {/* Tema */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Tema</h3>
                <button
                  onClick={toggleTheme}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white hover:bg-gray-700"
                  } transition-colors`}
                >
                  <span>{theme === "light" ? "Tema claro" : "Tema oscuro"}</span>
                  {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-8 text-sm text-gray-400">
                <p>
                  Estas opciones de accesibilidad están diseñadas para mejorar tu experiencia en nuestro sitio web. Si
                  necesitas asistencia adicional, por favor{" "}
                  <a href="#contact" className="text-blue-400 hover:underline">
                    contáctanos
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
