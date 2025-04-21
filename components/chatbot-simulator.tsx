"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, Settings, Shield, Zap, Database, Cpu, BrainCircuit } from "lucide-react"

export default function ChatbotSimulator() {
  const [activeTab, setActiveTab] = useState<"chat" | "config">("chat")
  const [messages, setMessages] = useState<Array<{ text: string; sender: "bot" | "user"; timestamp: Date }>>([])
  const [userInput, setUserInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [botInitialized, setBotInitialized] = useState(false)
  const [botThinking, setBotThinking] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [botName, setBotName] = useState("SmartBot")
  const [welcomeMessage, setWelcomeMessage] = useState(
    "¡Hola! Soy el asistente virtual de TechNova AI. ¿En qué puedo ayudarte hoy?",
  )
  const [primaryColor, setPrimaryColor] = useState("#0070f3")
  const [isConfiguring, setIsConfiguring] = useState(true)
  const [configStep, setConfigStep] = useState(1)
  const [savedConfig, setSavedConfig] = useState(false)
  const [showBotAnimation, setShowBotAnimation] = useState(false)

  // Respuestas predefinidas para la simulación
  const botResponses = [
    "Puedo ayudarte con información sobre nuestros servicios de chatbots inteligentes. Utilizamos tecnología de vanguardia para crear asistentes virtuales que revolucionarán tu negocio.",
    "Nuestros chatbots utilizan algoritmos de IA avanzada para entender el contexto y las necesidades específicas de tus clientes. Podemos procesar lenguaje natural con una precisión del 98%.",
    "La integración es sencilla con WhatsApp, Telegram, Facebook Messenger y tu sitio web. Nuestro sistema unificado permite gestionar todas las conversaciones desde una única plataforma.",
    "La implementación toma aproximadamente 2 semanas y ofrecemos soporte técnico 24/7. Nuestro equipo de expertos estará contigo en cada paso del proceso.",
    "¿Te gustaría agendar una demostración personalizada con uno de nuestros especialistas? Podemos mostrarte casos de éxito específicos para tu industria.",
  ]

  // Efecto para la animación de partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para que ocupe toda la pantalla
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    // Llamar a resize inicialmente y en cada cambio de tamaño de ventana
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const particlesArray: Particle[] = []
    const numberOfParticles = 100
    const maxDistance = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Colores futuristas
        const colors = ["#0070f3", "#00c8ff", "#00ffea", "#3377ff", "#4b0082"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Mover partículas
        this.x += this.speedX
        this.y += this.speedY

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Inicializar partículas
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Dibujar líneas entre partículas cercanas
    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx!.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.3})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    // Dibujar circuitos digitales
    function drawCircuits() {
      const numberOfCircuits = 15

      for (let i = 0; i < numberOfCircuits; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const length = Math.random() * 150 + 50
        const angle = Math.random() * Math.PI * 2

        const endX = startX + Math.cos(angle) * length
        const endY = startY + Math.sin(angle) * length

        // Punto de control para curva
        const cpX = (startX + endX) / 2 + (Math.random() - 0.5) * 50
        const cpY = (startY + endY) / 2 + (Math.random() - 0.5) * 50

        ctx!.strokeStyle = `rgba(0, 255, 200, 0.15)`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(startX, startY)
        ctx!.quadraticCurveTo(cpX, cpY, endX, endY)
        ctx!.stroke()

        // Añadir nodos en los extremos
        ctx!.fillStyle = `rgba(0, 255, 200, 0.3)`
        ctx!.beginPath()
        ctx!.arc(startX, startY, 2, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(endX, endY, 2, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Función de animación
    function animate() {
      // Limpiar canvas con un fondo semitransparente para crear efecto de estela
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar elementos de fondo
      drawCircuits()

      // Actualizar y dibujar partículas
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connectParticles()

      requestAnimationFrame(animate)
    }

    // Iniciar animación
    animate()

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Efecto para inicializar el bot después de la animación de intro
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
        setBotInitialized(true)

        // Añadir mensaje inicial después de un breve retraso
        setTimeout(() => {
          setMessages([
            {
              text: "Hola, soy SmartBot AI, tu asistente virtual con inteligencia artificial avanzada. ¿En qué puedo ayudarte hoy?",
              sender: "bot",
              timestamp: new Date(),
            },
          ])
        }, 500)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Función para enviar mensaje
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!userInput.trim()) return

    // Agregar mensaje del usuario
    const newUserMessage = {
      text: userInput,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setUserInput("")

    // Simular respuesta del bot
    setIsTyping(true)
    setBotThinking(true)

    setTimeout(() => {
      setBotThinking(false)

      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botResponse = {
          text: randomResponse,
          sender: "bot" as const,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 500)
    }, 2000)
  }

  // Función para guardar configuración
  const saveConfiguration = () => {
    setIsConfiguring(false)
    setSavedConfig(true)
    setTimeout(() => {
      setSavedConfig(false)
    }, 2000)
  }

  // Avanzar al siguiente paso de configuración
  const nextConfigStep = () => {
    if (configStep < 3) {
      setConfigStep(configStep + 1)
    } else {
      saveConfiguration()
    }
  }

  // Retroceder al paso anterior de configuración
  const prevConfigStep = () => {
    if (configStep > 1) {
      setConfigStep(configStep - 1)
    }
  }

  // Formatear hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(0,112,243,0.3)] relative">
      {/* Canvas para efectos de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20"></div>
      </div>

      {/* Animación de introducción */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px 5px rgba(0, 112, 243, 0.5)",
                        "0 0 40px 10px rgba(0, 112, 243, 0.7)",
                        "0 0 20px 5px rgba(0, 112, 243, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 rounded-full"
                  ></motion.div>

                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <div className="relative">
                          <div className="flex space-x-4">
                            <motion.div
                              animate={{
                                backgroundColor: ["#0070f3", "#00c8ff", "#0070f3"],
                                boxShadow: [
                                  "0 0 5px 2px rgba(0, 112, 243, 0.5)",
                                  "0 0 10px 4px rgba(0, 200, 255, 0.7)",
                                  "0 0 5px 2px rgba(0, 112, 243, 0.5)",
                                ],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="w-6 h-6 rounded-full"
                            ></motion.div>
                            <motion.div
                              animate={{
                                backgroundColor: ["#0070f3", "#00c8ff", "#0070f3"],
                                boxShadow: [
                                  "0 0 5px 2px rgba(0, 112, 243, 0.5)",
                                  "0 0 10px 4px rgba(0, 200, 255, 0.7)",
                                  "0 0 5px 2px rgba(0, 112, 243, 0.5)",
                                ],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              className="w-6 h-6 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Anillos orbitando */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 -m-8"
                  style={{
                    width: "calc(100% + 4rem)",
                    height: "calc(100% + 4rem)",
                    marginLeft: "-2rem",
                    marginTop: "-2rem",
                  }}
                >
                  <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(0,112,243,0.7)]"></div>
                  <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,200,255,0.7)]"></div>
                  <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(75,0,130,0.7)]"></div>
                </motion.div>

                {/* Anillos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 -m-4 border-2 border-blue-500/30 rounded-full"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute inset-0 -m-8 border border-blue-500/20 rounded-full"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute inset-0 -m-12 border border-blue-500/10 rounded-full"
                ></motion.div>

                {/* Símbolos tecnológicos flotando */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-16 left-0 text-blue-500/70"
                >
                  <Cpu size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-16 right-0 text-cyan-500/70"
                >
                  <Database size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="absolute -right-16 top-0 text-purple-500/70"
                >
                  <Shield size={20} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-blue-400 font-medium text-center w-48"
                >
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    SmartBot AI
                  </div>
                  <div className="text-xs text-blue-500 mt-1">Inicializando sistema...</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra superior */}
      <div className="relative z-10 flex justify-between items-center p-3 border-b border-blue-500/30 bg-gradient-to-r from-blue-900/50 to-indigo-900/30 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-2 relative overflow-hidden">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 bg-blue-400/30 rounded-full"
            ></motion.div>
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              SmartBot AI
            </div>
            <div className="text-xs text-blue-400">Asistente Virtual Avanzado</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`p-2 rounded-md ${
              activeTab === "chat" ? `bg-blue-500/20 text-blue-300` : "text-blue-400/70 hover:bg-blue-900/30"
            } transition-colors`}
          >
            <MessageSquare size={18} />
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`p-2 rounded-md ${
              activeTab === "config" ? `bg-blue-500/20 text-blue-300` : "text-blue-400/70 hover:bg-blue-900/30"
            } transition-colors`}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="h-[400px] relative z-10">
        {activeTab === "chat" && (
          <div className="flex flex-col h-full relative">
            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                        : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-blue-500/30 text-white shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-2">
                          <BrainCircuit className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                          SmartBot AI
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">{formatTime(msg.timestamp)}</p>
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escritura */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="max-w-[80%] rounded-lg p-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-blue-500/30 text-white backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-2">
                        <BrainCircuit className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        SmartBot AI
                      </span>
                    </div>

                    {botThinking ? (
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-blue-300">Procesando consulta</div>
                        <div className="relative w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-400"
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-400"
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 1.5,
                            delay: 0.2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-400"
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 1.5,
                            delay: 0.4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-black/60 backdrop-blur-sm border-t border-blue-500/20 flex"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-900/80 border border-blue-500/30 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        {activeTab === "config" && (
          <div className="h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
              Configuración Avanzada de IA
            </h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-blue-400" />
                  Capacidades Cognitivas
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Procesamiento de Lenguaje Natural", value: 95 },
                    { name: "Reconocimiento de Intenciones", value: 92 },
                    { name: "Análisis de Sentimientos", value: 88 },
                    { name: "Memoria Contextual", value: 90 },
                  ].map((capability) => (
                    <div key={capability.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{capability.name}</span>
                        <span className="text-blue-400">{capability.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${capability.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                  Seguridad y Protección
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Encriptación Avanzada", active: true },
                    { name: "Detección de Amenazas", active: true },
                    { name: "Autenticación Biométrica", active: true },
                    { name: "Protección Anti-Phishing", active: false },
                  ].map((feature) => (
                    <div
                      key={feature.name}
                      className={`p-3 rounded-lg border ${
                        feature.active ? "border-blue-500/40 bg-blue-500/10" : "border-gray-700 bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${feature.active ? "bg-green-400" : "bg-gray-500"}`}
                        ></div>
                        <span className={feature.active ? "text-gray-200" : "text-gray-400"}>{feature.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-400" />
                  Rendimiento del Sistema
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Velocidad de Respuesta</div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        12ms
                      </div>
                      <div className="text-xs text-green-400">-3ms desde última optimización</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Precisión de Respuestas</div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        98.7%
                      </div>
                      <div className="text-xs text-green-400">+1.2% desde última actualización</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Capacidad de Procesamiento</div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        1.2TB/s
                      </div>
                      <div className="text-xs text-blue-400">Óptimo para operaciones complejas</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-cyan-400" />
                  Integraciones Activas
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "WhatsApp", icon: "📱", active: true },
                    { name: "Telegram", icon: "✈️", active: true },
                    { name: "Facebook", icon: "👤", active: true },
                    { name: "Instagram", icon: "📷", active: false },
                    { name: "Sitio Web", icon: "🌐", active: true },
                    { name: "Email", icon: "📧", active: true },
                  ].map((integration) => (
                    <div
                      key={integration.name}
                      className={`p-3 rounded-lg border ${
                        integration.active ? "border-blue-500/40 bg-blue-500/10" : "border-gray-700 bg-gray-800/50"
                      } flex items-center`}
                    >
                      <span className="mr-2">{integration.icon}</span>
                      <span className={integration.active ? "text-gray-200" : "text-gray-400"}>{integration.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
