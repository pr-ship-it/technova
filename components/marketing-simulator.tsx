"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp,
  Users,
  Target,
  BarChart,
  PieChart,
  Globe,
  Search,
  Mail,
  Instagram,
  Zap,
  Database,
  Cpu,
  BrainCircuit,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Layers,
  ArrowRight,
} from "lucide-react"

export default function MarketingSimulator() {
  const [activeTab, setActiveTab] = useState<"campaign" | "analytics">("campaign")
  const [campaignName, setCampaignName] = useState("Promoción Verano 2025")
  const [targetAudience, setTargetAudience] = useState("Hispanos 25-45 años")
  const [budget, setBudget] = useState(1500)
  const [channels, setChannels] = useState<string[]>(["social", "email"])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    impressions: number
    clicks: number
    conversions: number
    roi: number
  }>({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    roi: 0,
  })
  const [showIntro, setShowIntro] = useState(true)
  const [systemInitialized, setSystemInitialized] = useState(false)
  const [showHologram, setShowHologram] = useState(false)
  const [hologramType, setHologramType] = useState<"audience" | "channels" | "results">("audience")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeAudienceSegment, setActiveAudienceSegment] = useState(0)
  const [showAudienceInsight, setShowAudienceInsight] = useState(false)
  const [aiRecommendation, setAiRecommendation] = useState(false)

  // Audiencias disponibles
  const audienceSegments = [
    {
      id: "young-adults",
      name: "Jóvenes Adultos Hispanos",
      age: "18-24 años",
      interests: ["Tecnología", "Redes sociales", "Entretenimiento", "Educación"],
      channels: ["Instagram", "TikTok", "YouTube"],
      insight:
        "Este segmento prefiere contenido visual y experiencias interactivas. Responden mejor a campañas con influencers y contenido auténtico.",
    },
    {
      id: "professionals",
      name: "Profesionales Hispanos",
      age: "25-45 años",
      interests: ["Finanzas", "Desarrollo profesional", "Tecnología", "Familia"],
      channels: ["LinkedIn", "Facebook", "Email"],
      insight:
        "Este segmento valora contenido informativo y soluciones prácticas. Responden mejor a testimonios y casos de éxito.",
    },
    {
      id: "families",
      name: "Familias Hispanas",
      age: "30-55 años",
      interests: ["Hogar", "Educación", "Salud", "Ahorro"],
      channels: ["Facebook", "YouTube", "Email", "WhatsApp"],
      insight:
        "Este segmento prioriza valores familiares y seguridad. Responden mejor a ofertas con beneficios a largo plazo y contenido educativo.",
    },
    {
      id: "seniors",
      name: "Adultos Mayores Hispanos",
      age: "55+ años",
      interests: ["Salud", "Familia", "Tradiciones", "Comunidad"],
      channels: ["Facebook", "Email", "TV Digital"],
      insight:
        "Este segmento prefiere comunicación clara y directa. Responden mejor a mensajes que reflejen valores tradicionales y comunidad.",
    },
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
    const numberOfParticles = 80
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

        // Colores futuristas para marketing
        const colors = ["#00c853", "#64dd17", "#aeea00", "#00e676", "#1de9b6"]
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
            ctx!.strokeStyle = `rgba(0, 200, 83, ${opacity * 0.3})`
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

        ctx!.strokeStyle = `rgba(0, 255, 100, 0.15)`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(startX, startY)
        ctx!.quadraticCurveTo(cpX, cpY, endX, endY)
        ctx!.stroke()

        // Añadir nodos en los extremos
        ctx!.fillStyle = `rgba(0, 255, 100, 0.3)`
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

  // Función para manejar la selección de canales
  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel))
    } else {
      setChannels([...channels, channel])
    }
  }

  // Función para iniciar la campaña
  const startCampaign = () => {
    setIsRunning(true)
    setProgress(0)
    setResults({
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0,
    })

    // Simulación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Generar resultados simulados
          const baseImpressions = Math.floor(budget * 10 * (1 + Math.random() * 0.5))
          const baseClicks = Math.floor(baseImpressions * (0.03 + Math.random() * 0.05))
          const baseConversions = Math.floor(baseClicks * (0.1 + Math.random() * 0.15))
          const baseRoi = (baseConversions * 50 - budget) / budget

          // Ajustar según canales seleccionados
          const channelMultiplier = 1 + channels.length * 0.2

          setResults({
            impressions: Math.floor(baseImpressions * channelMultiplier),
            clicks: Math.floor(baseClicks * channelMultiplier),
            conversions: Math.floor(baseConversions * channelMultiplier),
            roi: baseRoi * channelMultiplier,
          })
          return 100
        }
        return prev + 5
      })
    }, 300)

    return () => clearInterval(interval)
  }

  // Función para detener la campaña
  const stopCampaign = () => {
    setIsRunning(false)
  }

  // Función para formatear números
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num))
  }

  // Función para mostrar el holograma
  const showHologramView = (type: "audience" | "channels" | "results") => {
    setHologramType(type)
    setShowHologram(true)
  }

  // Función para navegar entre segmentos de audiencia
  const navigateAudienceSegment = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveAudienceSegment((prev) => (prev + 1) % audienceSegments.length)
    } else {
      setActiveAudienceSegment((prev) => (prev - 1 + audienceSegments.length) % audienceSegments.length)
    }
  }

  // Función para mostrar recomendación de IA
  const toggleAiRecommendation = () => {
    setAiRecommendation(!aiRecommendation)
  }

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-green-500/30 shadow-[0_0_30px_rgba(0,200,83,0.3)] relative">
      {/* Canvas para efectos de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/20"></div>
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
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px 5px rgba(0, 200, 83, 0.5)",
                        "0 0 40px 10px rgba(0, 200, 83, 0.7)",
                        "0 0 20px 5px rgba(0, 200, 83, 0.5)",
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
                        <TrendingUp size={32} className="text-green-400" />
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
                  <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-green-400 shadow-[0_0_10px_rgba(0,200,83,0.7)]"></div>
                  <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(100,221,23,0.7)]"></div>
                  <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(174,234,0,0.7)]"></div>
                </motion.div>

                {/* Anillos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 -m-4 border-2 border-green-500/30 rounded-full"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute inset-0 -m-8 border border-green-500/20 rounded-full"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute inset-0 -m-12 border border-green-500/10 rounded-full"
                ></motion.div>

                {/* Símbolos tecnológicos flotando */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-16 left-0 text-green-500/70"
                >
                  <Target size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-16 right-0 text-lime-500/70"
                >
                  <BarChart size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="absolute -right-16 top-0 text-yellow-500/70"
                >
                  <Users size={20} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-green-400 font-medium text-center w-48"
                >
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-300">
                    MarketingAI Pro
                  </div>
                  <div className="text-xs text-green-500 mt-1">Inicializando sistema...</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra superior */}
      <div className="relative z-10 flex justify-between items-center p-3 border-b border-green-500/30 bg-gradient-to-r from-green-900/50 to-lime-900/30 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mr-2 relative overflow-hidden">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 bg-green-400/30 rounded-full"
            ></motion.div>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">
              MarketingAI Pro
            </div>
            <div className="text-xs text-green-400">Sistema Avanzado de Campañas</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("campaign")}
            className={`p-2 rounded-md ${
              activeTab === "campaign" ? `bg-green-500/20 text-green-300` : "text-green-400/70 hover:bg-green-900/30"
            } transition-colors`}
          >
            <Target size={18} />
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`p-2 rounded-md ${
              activeTab === "analytics" ? `bg-green-500/20 text-green-300` : "text-green-400/70 hover:bg-green-900/30"
            } transition-colors`}
          >
            <BarChart size={18} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="h-[400px] relative z-10">
        {activeTab === "campaign" && (
          <div className="h-full bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300 mb-4">
              Configuración de Campaña Inteligente
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    <Cpu className="w-4 h-4 mr-2 text-green-400" />
                    Nombre de Campaña
                  </h4>
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">IA Optimizado</div>
                </div>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-black/60 border border-green-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
                />
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-400" />
                    Audiencia Objetivo
                  </h4>
                  <button
                    onClick={() => showHologramView("audience")}
                    className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center"
                  >
                    <Layers className="w-3 h-3 mr-1" />
                    Vista 3D
                  </button>
                </div>

                <div className="relative">
                  <div className="flex items-center mb-3">
                    <button
                      onClick={() => navigateAudienceSegment("prev")}
                      className="p-1 rounded-full bg-green-900/30 text-green-400 hover:bg-green-900/50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-white font-medium">{audienceSegments[activeAudienceSegment].name}</div>
                      <div className="text-xs text-green-400">{audienceSegments[activeAudienceSegment].age}</div>
                    </div>
                    <button
                      onClick={() => navigateAudienceSegment("next")}
                      className="p-1 rounded-full bg-green-900/30 text-green-400 hover:bg-green-900/50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {audienceSegments[activeAudienceSegment].interests.map((interest, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 rounded-full bg-green-900/20 border border-green-500/30 text-xs text-green-300"
                      >
                        {interest}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAudienceInsight(!showAudienceInsight)}
                    className="w-full py-1.5 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 text-sm flex items-center justify-center"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 mr-1.5" />
                    {showAudienceInsight ? "Ocultar Insight de IA" : "Mostrar Insight de IA"}
                  </button>

                  <AnimatePresence>
                    {showAudienceInsight && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 p-3 rounded-lg bg-green-900/20 border border-green-500/20"
                      >
                        <div className="text-xs text-green-200">{audienceSegments[activeAudienceSegment].insight}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    <Database className="w-4 h-4 mr-2 text-green-400" />
                    Presupuesto Inteligente
                  </h4>
                  <div className="text-white font-bold">${budget}</div>
                </div>

                <div className="mb-2">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-lime-400"
                      style={{ width: `${(budget / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>$500</span>
                  <span>$5,000</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number.parseInt(e.target.value))}
                  className="w-full mt-2 accent-green-500"
                />

                <div className="mt-3 p-2 rounded-lg bg-green-900/20 border border-green-500/20">
                  <div className="flex items-center text-xs text-green-300">
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                    Recomendación IA: Presupuesto óptimo para este segmento: ${1200 + activeAudienceSegment * 300}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-green-400" />
                    Canales de Marketing
                  </h4>
                  <button
                    onClick={() => showHologramView("channels")}
                    className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center"
                  >
                    <Layers className="w-3 h-3 mr-1" />
                    Vista 3D
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={`p-3 rounded-lg border ${
                      channels.includes("social") ? "border-green-500 bg-green-500/10" : "border-gray-700"
                    } cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden group`}
                    onClick={() => toggleChannel("social")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 bg-black/30 rounded-full">
                        <Instagram size={16} className="text-green-400" />
                      </div>
                      <span className="flex-grow font-medium">Redes Sociales</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border ${
                      channels.includes("search") ? "border-green-500 bg-green-500/10" : "border-gray-700"
                    } cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden group`}
                    onClick={() => toggleChannel("search")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 bg-black/30 rounded-full">
                        <Search size={16} className="text-green-400" />
                      </div>
                      <span className="flex-grow font-medium">Búsqueda</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border ${
                      channels.includes("email") ? "border-green-500 bg-green-500/10" : "border-gray-700"
                    } cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden group`}
                    onClick={() => toggleChannel("email")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 bg-black/30 rounded-full">
                        <Mail size={16} className="text-green-400" />
                      </div>
                      <span className="flex-grow font-medium">Email</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border ${
                      channels.includes("display") ? "border-green-500 bg-green-500/10" : "border-gray-700"
                    } cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden group`}
                    onClick={() => toggleChannel("display")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 bg-black/30 rounded-full">
                        <Layers size={16} className="text-green-400" />
                      </div>
                      <span className="flex-grow font-medium">Display</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={toggleAiRecommendation}
                  className="w-full py-1.5 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 text-sm flex items-center justify-center mt-3"
                >
                  <BrainCircuit className="w-3.5 h-3.5 mr-1.5" />
                  {aiRecommendation ? "Ocultar Recomendación" : "Obtener Recomendación IA"}
                </button>

                <AnimatePresence>
                  {aiRecommendation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-3 rounded-lg bg-green-900/20 border border-green-500/20"
                    >
                      <div className="text-xs text-green-200">
                        <p className="mb-2">
                          <span className="font-bold">Recomendación IA:</span> Para el segmento "
                          {audienceSegments[activeAudienceSegment].name}", los canales más efectivos son:
                        </p>
                        <ul className="space-y-1 pl-4">
                          {audienceSegments[activeAudienceSegment].channels.map((channel, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-3 h-3 mr-1 text-green-400" />
                              {channel}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4">
                {!isRunning ? (
                  <button
                    onClick={startCampaign}
                    disabled={channels.length === 0}
                    className={`w-full py-3 rounded-lg text-white relative overflow-hidden group ${
                      channels.length === 0 ? "bg-gray-600" : "bg-gradient-to-r from-green-600 to-green-500"
                    } transition-colors`}
                  >
                    {channels.length > 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    )}
                    <span className="relative z-10 font-medium flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Iniciar Campaña Inteligente
                    </span>
                  </button>
                ) : (
                  <div>
                    <div className="relative w-full h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-500 to-lime-400"
                        style={{ width: `${progress}%` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-0 left-0 h-full w-20 bg-white/20"
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        style={{ display: progress < 100 ? "block" : "none" }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>Progreso: {progress}%</span>
                      <button onClick={stopCampaign} className="text-red-400 hover:text-red-300">
                        Detener
                      </button>
                    </div>

                    {progress > 30 && progress < 100 && (
                      <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20 mb-3">
                        <div className="flex items-center text-xs text-green-300">
                          <BrainCircuit className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                          <span>
                            IA analizando patrones de comportamiento para {audienceSegments[activeAudienceSegment].name}
                            ...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="h-full bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300 mb-4">
              Análisis Avanzado de Resultados
            </h3>

            {progress < 100 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-900/50 to-green-800/50 flex items-center justify-center mb-4 relative">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  ></motion.div>
                  <PieChart size={24} className="text-green-400" />
                </div>
                <p className="text-gray-400 max-w-xs">
                  {isRunning
                    ? "Campaña en progreso. Los resultados analíticos se mostrarán al finalizar."
                    : "Inicia una campaña para visualizar análisis predictivos y resultados en tiempo real."}
                </p>
                {!isRunning && (
                  <button
                    onClick={() => setActiveTab("campaign")}
                    className="mt-4 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors"
                  >
                    Configurar Campaña
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-white flex items-center">
                      <Cpu className="w-4 h-4 mr-2 text-green-400" />
                      Resumen de Campaña
                    </h4>
                    <button
                      onClick={() => showHologramView("results")}
                      className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center"
                    >
                      <Layers className="w-3 h-3 mr-1" />
                      Vista 3D
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Nombre</div>
                      <div className="text-sm text-white">{campaignName}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Audiencia</div>
                      <div className="text-sm text-white">{audienceSegments[activeAudienceSegment].name}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Presupuesto</div>
                      <div className="text-sm text-white">${budget}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Canales</div>
                      <div className="text-sm text-white">
                        {channels.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                    <div className="flex items-center text-xs text-green-300 mb-2">
                      <BrainCircuit className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                      <span className="font-medium">Análisis IA</span>
                    </div>
                    <div className="text-xs text-gray-300">
                      Esta campaña está superando en un 23% el rendimiento promedio para el segmento seleccionado.
                      Recomendamos aumentar la inversión en los canales de mayor rendimiento.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Users size={16} className="text-green-500 mr-2" />
                      <h4 className="font-medium text-white">Impresiones</h4>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-white">{formatNumber(results.impressions)}</div>
                      <div className="ml-2 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">+35%</div>
                    </div>
                    <div className="w-full bg-gray-800 h-1 my-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-lime-400"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-400">vs. promedio del mercado</p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Target size={16} className="text-blue-500 mr-2" />
                      <h4 className="font-medium text-white">Clics</h4>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-white">{formatNumber(results.clicks)}</div>
                      <div className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">+28%</div>
                    </div>
                    <div className="w-full bg-gray-800 h-1 my-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-400">
                      CTR: {((results.clicks / results.impressions) * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <BarChart size={16} className="text-purple-500 mr-2" />
                      <h4 className="font-medium text-white">Conversiones</h4>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-white">{formatNumber(results.conversions)}</div>
                      <div className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">+42%</div>
                    </div>
                    <div className="w-full bg-gray-800 h-1 my-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Tasa: {((results.conversions / results.clicks) * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <TrendingUp size={16} className="text-yellow-500 mr-2" />
                      <h4 className="font-medium text-white">ROI</h4>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-white">{(results.roi * 100).toFixed(2)}%</div>
                      <div className="ml-2 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">+15%</div>
                    </div>
                    <div className="w-full bg-gray-800 h-1 my-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(results.roi * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-400">Ganancia: ${formatNumber(budget * results.roi)}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <BrainCircuit className="w-4 h-4 mr-2 text-green-400" />
                    Recomendaciones de IA
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                      <div className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-green-200">
                          Aumentar presupuesto en {channels.includes("social") ? "Instagram" : channels[0]} en un 20%
                          para maximizar conversiones.
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                      <div className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-green-200">
                          Optimizar contenido para {audienceSegments[activeAudienceSegment].name} enfocándose en{" "}
                          {audienceSegments[activeAudienceSegment].interests[0]} y{" "}
                          {audienceSegments[activeAudienceSegment].interests[1]}.
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                      <div className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-green-200">
                          Implementar estrategia de retargeting para aumentar conversiones en un 25% adicional.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={startCampaign}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 transition-colors relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    <span className="relative z-10 font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimizar y Relanzar
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Vista holográfica */}
        <AnimatePresence>
          {showHologram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-2xl max-h-96 mx-auto">
                <button
                  onClick={() => setShowHologram(false)}
                  className="absolute top-4 right-4 z-30 p-1 rounded-full bg-gray-800/80 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-64 h-64 relative"
                    >
                      {hologramType === "audience" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <motion.div
                              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                              className="w-40 h-40 rounded-full bg-green-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            ></motion.div>
                            <motion.div
                              animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                              className="w-56 h-56 rounded-full border border-green-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            ></motion.div>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                              className="w-72 h-72 rounded-full border border-green-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            ></motion.div>

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                              <div className="text-xl font-bold text-green-400 mb-2">
                                {audienceSegments[activeAudienceSegment].name}
                              </div>
                              <div className="text-sm text-green-300">
                                {audienceSegments[activeAudienceSegment].age}
                              </div>
                            </div>

                            {audienceSegments[activeAudienceSegment].interests.map((interest, index) => {
                              const angle =
                                (index * 2 * Math.PI) / audienceSegments[activeAudienceSegment].interests.length
                              const radius = 100
                              const x = radius * Math.cos(angle)
                              const y = radius * Math.sin(angle)
                              return (
                                <motion.div
                                  key={index}
                                  className="absolute bg-green-900/80 px-2 py-1 rounded-lg text-green-300 text-xs border border-green-500/30"
                                  style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: "translate(-50%, -50%)",
                                  }}
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, delay: index * 0.5, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  {interest}
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {hologramType === "channels" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              {/* Canal Superior - Social */}
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                  animate={{ scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                  className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center"
                                >
                                  <Instagram size={24} className="text-green-300" />
                                </motion.div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/70 px-3 py-1 rounded-lg border border-green-500/30">
                                  <div className="text-xs text-green-300 whitespace-nowrap">Redes Sociales</div>
                                </div>
                              </div>

                              {/* Canal Inferior - Búsqueda */}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                <motion.div
                                  animate={{ scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY }}
                                  className="w-16 h-16 rounded-full bg-blue-500/30 flex items-center justify-center"
                                >
                                  <Search size={24} className="text-blue-300" />
                                </motion.div>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/70 px-3 py-1 rounded-lg border border-blue-500/30">
                                  <div className="text-xs text-blue-300 whitespace-nowrap">Búsqueda</div>
                                </div>
                              </div>

                              {/* Canal Izquierdo - Email */}
                              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                  animate={{ scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY }}
                                  className="w-16 h-16 rounded-full bg-purple-500/30 flex items-center justify-center"
                                >
                                  <Mail size={24} className="text-purple-300" />
                                </motion.div>
                                <div className="absolute top-1/2 left-full transform translate-y-[-50%] ml-2 bg-black/70 px-3 py-1 rounded-lg border border-purple-500/30">
                                  <div className="text-xs text-purple-300 whitespace-nowrap">Email</div>
                                </div>
                              </div>

                              {/* Canal Derecho - Display */}
                              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                  animate={{ scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 2, delay: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                  className="w-16 h-16 rounded-full bg-yellow-500/30 flex items-center justify-center"
                                >
                                  <Layers size={24} className="text-yellow-300" />
                                </motion.div>
                                <div className="absolute top-1/2 right-full transform translate-y-[-50%] mr-2 bg-black/70 px-3 py-1 rounded-lg border border-yellow-500/30">
                                  <div className="text-xs text-yellow-300 whitespace-nowrap">Display</div>
                                </div>
                              </div>
                            </motion.div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <div className="w-40 h-40 rounded-full border border-green-500/30 relative">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-lg font-bold text-green-400">Canales</div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )}

                      {hologramType === "results" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <motion.div
                              animate={{ rotateY: 360 }}
                              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                  <motion.div
                                    animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-32 h-32 rounded-full bg-green-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  ></motion.div>
                                  <motion.div
                                    animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-48 h-48 rounded-full border border-green-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  ></motion.div>
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-64 h-64 rounded-full border border-green-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  ></motion.div>

                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-xl font-bold text-green-400 mb-2">ROI</div>
                                    <div className="text-2xl font-bold text-white">
                                      {(results.roi * 100).toFixed(2)}%
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <motion.div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900/80 px-3 py-2 rounded-lg border border-blue-500/30"
                                animate={{ y: ["-10%", "10%", "-10%"] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <div className="text-center">
                                  <div className="text-xs text-blue-300 mb-1">Impresiones</div>
                                  <div className="text-sm font-bold text-white">
                                    {formatNumber(results.impressions)}
                                  </div>
                                </div>
                              </motion.div>

                              <motion.div
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-purple-900/80 px-3 py-2 rounded-lg border border-purple-500/30"
                                animate={{ y: ["10%", "-10%", "10%"] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <div className="text-center">
                                  <div className="text-xs text-purple-300 mb-1">Conversiones</div>
                                  <div className="text-sm font-bold text-white">
                                    {formatNumber(results.conversions)}
                                  </div>
                                </div>
                              </motion.div>

                              <motion.div
                                className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-900/80 px-3 py-2 rounded-lg border border-green-500/30"
                                animate={{ x: ["-10%", "10%", "-10%"] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <div className="text-center">
                                  <div className="text-xs text-green-300 mb-1">Presupuesto</div>
                                  <div className="text-sm font-bold text-white">${budget}</div>
                                </div>
                              </motion.div>

                              <motion.div
                                className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-yellow-900/80 px-3 py-2 rounded-lg border border-yellow-500/30"
                                animate={{ x: ["10%", "-10%", "10%"] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <div className="text-center">
                                  <div className="text-xs text-yellow-300 mb-1">Clics</div>
                                  <div className="text-sm font-bold text-white">{formatNumber(results.clicks)}</div>
                                </div>
                              </motion.div>
                            </motion.div>

                            <div className="absolute inset-0">
                              <motion.div
                                className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-green-400"
                                animate={{ scale: [1, 3, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-blue-400"
                                animate={{ scale: [1, 3, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                              />
                              <motion.div
                                className="absolute top-1/4 left-3/4 w-1 h-1 rounded-full bg-purple-400"
                                animate={{ scale: [1, 3, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                              />
                              <motion.div
                                className="absolute top-3/4 left-3/4 w-1 h-1 rounded-full bg-yellow-400"
                                animate={{ scale: [1, 3, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
