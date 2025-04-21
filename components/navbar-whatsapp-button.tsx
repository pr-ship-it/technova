"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WhatsappIcon from "./whatsapp-icon"

export default function NavbarWhatsappButton() {
  const [isHovered, setIsHovered] = useState(false)

  // Número de WhatsApp (reemplazar con el número real)
  const phoneNumber = "9889071829"

  // Mensaje predeterminado (opcional)
  const message = "Hola! Me gustaría obtener más información sobre sus servicios."

  // URL de WhatsApp con el número y mensaje
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="relative">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contactar por WhatsApp"
      >
        <WhatsappIcon className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm hidden sm:inline">WhatsApp</span>
      </motion.a>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full mt-2 right-0 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm z-50"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            Chatea con nosotros
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
