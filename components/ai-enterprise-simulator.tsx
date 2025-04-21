"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Cpu,
  BarChart3,
  Bot,
  Network,
  ChevronRight,
  Database,
  Factory,
  Workflow,
  PieChart,
  Users,
  BarChart,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react"

export default function AIEnterpriseSimulator() {
  const [activeTab, setActiveTab] = useState<"automation" | "analytics" | "assistant">("automation")
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [systemInitialized, setSystemInitialized] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedProcess, setSelectedProcess] = useState<string>("inventory")
  const [automationLevel, setAutomationLevel] = useState<number>(50)
  const [optimizationResults, setOptimizationResults] = useState<{
    efficiency: number
    costReduction: number
    timeReduction: number
    qualityImprovement: number
  } | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Datos para el simulador
  const businessProcesses = [
    { id: "inventory", name: "Gestión de Inventario", icon: <Database size={16} /> },
    { id: "customer", name: "Servicio al Cliente", icon: <Users size={16} /> },
    { id: "production", name: "Línea de Producción", icon: <Factory size={16} /> },
    { id: "logistics", name: "Logística y Distribución", icon: <Workflow size={16} /> },
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

    // Clase para las partículas
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      blinking: boolean
      blinkSpeed: number
      opacity: number
      blinkDirection: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3

        // Colores futuristas para IA
        const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#8b5cf6", "#a78bfa", "#10b981"]
        this.color = colors[Math.floor(Math.random() * colors.length)]

        // Efecto de parpadeo
        this.blinking = Math.random() > 0.7
        this.blinkSpeed = Math.random() * 0.05 + 0.01
        this.opacity = Math.random() * 0.5 + 0.5
        this.blinkDirection = 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Actualizar efecto de parpadeo
        if (this.blinking) {
          this.opacity += this.blinkDirection * this.blinkSpeed

          if (this.opacity >= 1) {
            this.opacity = 1
            this.blinkDirection = -1
          } else if (this.opacity <= 0.2) {
            this.opacity = 0.2
            this.blinkDirection = 1
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Crear partículas
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 8000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Función para conectar partículas cercanas
    const connectParticles = () => {
      const maxDistance = 100

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Dibujar circuitos digitales
    const drawCircuits = () => {
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

        ctx.strokeStyle = `rgba(59, 130, 246, 0.15)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.quadraticCurveTo(cpX, cpY, endX, endY)
        ctx.stroke()

        // Añadir nodos en los extremos
        ctx.fillStyle = `rgba(59, 130, 246, 0.3)`
        ctx.beginPath()
        ctx.arc(startX, startY, 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(endX, endY, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Dibujar código binario
    const drawBinaryCode = () => {
      ctx.font = "10px monospace"
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)"

      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const binary = Math.random() > 0.5 ? "1" : "0"
        ctx.fillText(binary, x, y)
      }
    }

    // Función de animación
    const animate = () => {
      // Limpiar canvas con un fondo semitransparente para crear efecto de estela
      ctx.fillStyle = "rgba(17, 24, 39, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar elementos de fondo
      drawCircuits()
      drawBinaryCode()

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

  // Efecto para inicializar el sistema después de la animación de intro
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
        setSystemInitialized(true)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  // Función para iniciar la simulación
  const startSimulation = () => {
    setIsRunning(true)
    setProgress(0)
    setOptimizationResults(null)
    setAiSuggestions([])

    // Simulación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          generateResults()
          return 100
        }
        return prev + 2
      })
    }, 150)

    return () => clearInterval(interval)
  }

  // Función para detener la simulación
  const stopSimulation = () => {
    setIsRunning(false)
  }

  // Generar resultados simulados
  const generateResults = () => {
    // Calcular resultados basados en el proceso seleccionado y nivel de automatización
    const baseEfficiency = 20 + Math.floor(Math.random() * 10)
    const baseCostReduction = 15 + Math.floor(Math.random() * 10)
    const baseTimeReduction = 25 + Math.floor(Math.random() * 15)
    const baseQualityImprovement = 10 + Math.floor(Math.random() * 10)

    // Ajustar según el nivel de automatización
    const automationMultiplier = automationLevel / 50

    setOptimizationResults({
      efficiency: Math.min(95, Math.floor(baseEfficiency * automationMultiplier)),
      costReduction: Math.min(85, Math.floor(baseCostReduction * automationMultiplier)),
      timeReduction: Math.min(90, Math.floor(baseTimeReduction * automationMultiplier)),
      qualityImprovement: Math.min(80, Math.floor(baseQualityImprovement * automationMultiplier)),
    })

    // Generar sugerencias de IA
    const suggestions = [
      "Incrementar automatización en puntos críticos del proceso para mejorar eficiencia en un 15% adicional",
      "Implementar sistema de predicción de demanda para optimizar inventario y reducir costos",
      "Integrar análisis de datos en tiempo real para identificar cuellos de botella operativos",
      "Añadir capacidades de aprendizaje automático para adaptación continua a patrones cambiantes",
    ]

    setAiSuggestions(suggestions)
    setShowSuggestions(true)
  }

  // Formatear porcentaje
  const formatPercent = (value: number) => {
    return `${value}%`
  }

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
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
                        "0 0 20px 5px rgba(59, 130, 246, 0.5)",
                        "0 0 40px 10px rgba(59, 130, 246, 0.7)",
                        "0 0 20px 5px rgba(59, 130, 246, 0.5)",
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
                        <Brain size={32} className="text-blue-400" />
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
                  <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]"></div>
                  <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.7)]"></div>
                  <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]"></div>
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
                  className="absolute -bottom-16 right-0 text-indigo-500/70"
                >
                  <Database size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="absolute -right-16 top-0 text-purple-500/70"
                >
                  <Network size={20} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-blue-400 font-medium text-center w-48"
                >
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                    IA Empresarial
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
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              IA Empresarial
            </div>
            <div className="text-xs text-blue-400">Simulador de Automatización</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("automation")}
            className={`p-2 rounded-md ${
              activeTab === "automation" ? `bg-blue-500/20 text-blue-300` : "text-blue-400/70 hover:bg-blue-900/30"
            } transition-colors`}
          >
            <Workflow size={18} />
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`p-2 rounded-md ${
              activeTab === "analytics" ? `bg-blue-500/20 text-blue-300` : "text-blue-400/70 hover:bg-blue-900/30"
            } transition-colors`}
          >
            <BarChart size={18} />
          </button>
          <button
            onClick={() => setActiveTab("assistant")}
            className={`p-2 rounded-md ${
              activeTab === "assistant" ? `bg-blue-500/20 text-blue-300` : "text-blue-400/70 hover:bg-blue-900/30"
            } transition-colors`}
          >
            <Bot size={18} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="h-[400px] relative z-10">
        {activeTab === "automation" && (
          <div className="h-full bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-4">
              Automatización Inteligente de Procesos
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    <Workflow className="w-4 h-4 mr-2 text-blue-400" />
                    Seleccionar Proceso Empresarial
                  </h4>
                  <div className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">IA Optimizado</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {businessProcesses.map((process) => (
                    <div
                      key={process.id}
                      className={`p-3 rounded-lg border ${
                        selectedProcess === process.id ? "border-blue-500 bg-blue-500/10" : "border-gray-700"
                      } cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden group`}
                      onClick={() => setSelectedProcess(process.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 bg-black/30 rounded-full">
                          {process.icon}
                        </div>
                        <span className="flex-grow font-medium">{process.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Nivel de Automatización</label>
                    <span className="text-sm text-blue-400">{automationLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={automationLevel}
                    onChange={(e) => setAutomationLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Básico</span>
                    <span>Avanzado</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/20 mb-4">
                  <div className="flex items-center text-xs text-blue-300 mb-2">
                    <Brain className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                    <span className="font-medium">Análisis IA</span>
                  </div>
                  <div className="text-xs text-gray-300">
                    {selectedProcess === "inventory" &&
                      "La gestión de inventario puede optimizarse hasta un 85% con IA predictiva que anticipa demanda y reduce excedentes."}
                    {selectedProcess === "customer" &&
                      "El servicio al cliente puede mejorar su eficiencia en un 75% con asistentes virtuales que aprenden de cada interacción."}
                    {selectedProcess === "production" &&
                      "Las líneas de producción pueden incrementar su rendimiento hasta un 70% con sistemas de mantenimiento predictivo."}
                    {selectedProcess === "logistics" &&
                      "La logística puede reducir costos hasta un 65% con optimización de rutas y predicción de demanda en tiempo real."}
                  </div>
                </div>

                {!isRunning ? (
                  <button
                    onClick={startSimulation}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center"
                  >
                    <Play size={16} className="mr-2" />
                    Iniciar Simulación de Automatización
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Simulando automatización...</span>
                      <span className="text-sm text-gray-300">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs text-gray-400 italic">
                        Analizando procesos y aplicando algoritmos de optimización...
                      </div>
                      <button onClick={stopSimulation} className="text-red-400 hover:text-red-300 text-xs">
                        Detener
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {optimizationResults && (
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-medium text-white mb-4 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                    Resultados de Optimización
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Mejora de Eficiencia</div>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-white mr-2">
                          {formatPercent(optimizationResults.efficiency)}
                        </div>
                        <div className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                          +{Math.floor(optimizationResults.efficiency / 3)}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                        <div
                          className="h-1.5 rounded-full bg-green-500"
                          style={{ width: `${optimizationResults.efficiency}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Reducción de Costos</div>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-white mr-2">
                          {formatPercent(optimizationResults.costReduction)}
                        </div>
                        <div className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                          +{Math.floor(optimizationResults.costReduction / 4)}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${optimizationResults.costReduction}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Reducción de Tiempo</div>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-white mr-2">
                          {formatPercent(optimizationResults.timeReduction)}
                        </div>
                        <div className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                          +{Math.floor(optimizationResults.timeReduction / 3.5)}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                        <div
                          className="h-1.5 rounded-full bg-purple-500"
                          style={{ width: `${optimizationResults.timeReduction}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Mejora de Calidad</div>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-white mr-2">
                          {formatPercent(optimizationResults.qualityImprovement)}
                        </div>
                        <div className="px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                          +{Math.floor(optimizationResults.qualityImprovement / 4)}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                        <div
                          className="h-1.5 rounded-full bg-yellow-500"
                          style={{ width: `${optimizationResults.qualityImprovement}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-xs text-blue-300">
                        <Brain className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                        <span className="font-medium">Recomendaciones IA</span>
                      </div>
                      <button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="text-xs text-blue-400 flex items-center"
                      >
                        {showSuggestions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showSuggestions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-2 mt-2">
                            {aiSuggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start text-xs text-gray-300">
                                <ChevronRight size={14} className="text-blue-400 mt-0.5 mr-1 flex-shrink-0" />
                                <span>{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="h-full bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-4">
              Análisis Predictivo Empresarial
            </h3>

            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <PieChart size={48} className="text-blue-400 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium text-gray-300 mb-2">Análisis Predictivo</h4>
                <p className="text-sm text-gray-400 max-w-md">
                  Seleccione un proceso empresarial en la pestaña de Automatización para visualizar análisis predictivos
                  y tendencias basadas en IA.
                </p>
                <button
                  onClick={() => setActiveTab("automation")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm"
                >
                  Configurar Automatización
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assistant" && (
          <div className="h-full bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-4">
              Asistente IA Empresarial
            </h3>

            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <Bot size={48} className="text-blue-400 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium text-gray-300 mb-2">Asistente Virtual</h4>
                <p className="text-sm text-gray-400 max-w-md">
                  Configure y ejecute una simulación de automatización para recibir recomendaciones personalizadas de
                  nuestro asistente IA.
                </p>
                <button
                  onClick={() => setActiveTab("automation")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm"
                >
                  Configurar Automatización
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
