"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de TechNova AI. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Respuestas automáticas basadas en palabras clave
  const autoResponses = [
    {
      keywords: ["precio", "costo", "tarifa", "pagar", "valor"],
      response:
        "Nuestros precios varían según las necesidades específicas de tu negocio. ¿Te gustaría que un asesor te contacte para una cotización personalizada?",
    },
    {
      keywords: ["horario", "atención", "atienden", "disponible"],
      response: "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM (GMT-5).",
    },
    {
      keywords: ["demo", "prueba", "demostración", "probar"],
      response:
        "¡Claro! Ofrecemos demostraciones gratuitas de nuestros servicios. Por favor, déjanos tu correo electrónico y te contactaremos para agendar una sesión.",
    },
    {
      keywords: ["contacto", "teléfono", "email", "correo", "llamar"],
      response:
        "Puedes contactarnos al +1 (555) 123-4567 o enviarnos un correo a info@aismarttech.com. También puedes usar nuestro formulario de contacto en la página.",
    },
    {
      keywords: ["gracias", "thank", "thanks"],
      response: "¡De nada! Estamos aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
    },
  ]

  // Función para generar respuesta automática
  const generateAutoResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase()

    for (const item of autoResponses) {
      if (item.keywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
        return item.response
      }
    }

    return "Gracias por tu mensaje. Un miembro de nuestro equipo te responderá a la brevedad. Si necesitas asistencia inmediata, puedes llamarnos al +1 (555) 123-4567."
  }

  // Función para enviar mensaje
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateAutoResponse(message),
        sender: "bot" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Formatear hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${
              isMinimized ? "bottom-6 right-6 w-72" : "bottom-6 right-6 w-80 sm:w-96"
            } z-50 rounded-lg overflow-hidden shadow-2xl bg-gray-900 border border-blue-500/30`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Encabezado del chat */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <h3 className="text-white font-medium">Chat en vivo</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isMinimized ? "Maximizar chat" : "Minimizar chat"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Cuerpo del chat */}
            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 bg-gray-800">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Formulario para enviar mensajes */}
                <form onSubmit={handleSendMessage} className="p-3 bg-gray-900 border-t border-gray-700 flex">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition-colors"
                    aria-label="Enviar mensaje"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
