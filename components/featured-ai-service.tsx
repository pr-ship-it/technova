"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Brain,
  Cpu,
  BarChart3,
  Zap,
  Bot,
  Network,
  ArrowRight,
  ChevronRight,
  Database,
  Factory,
  Building2,
  LineChart,
  Workflow,
  Cog,
  Sparkles,
} from "lucide-react"

export default function FeaturedAIService() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)

  // Características del servicio
  const features = [
    {
      title: "Automatización de Procesos",
      description: "Optimiza flujos de trabajo y reduce costos operativos hasta un 70% con IA avanzada",
      icon: <Workflow className="w-6 h-6" />,
      color: "#3b82f6",
    },
    {
      title: "Análisis Predictivo",
      description: "Anticipa tendencias de mercado y comportamientos de clientes con 94% de precisión",
      icon: <LineChart className="w-6 h-6" />,
      color: "#10b981",
    },
    {
      title: "Asistentes Virtuales",
      description: "Implementa asistentes IA personalizados que operan 24/7 y aprenden continuamente",
      icon: <Bot className="w-6 h-6" />,
      color: "#8b5cf6",
    },
    {
      title: "Optimización de Recursos",
      description: "Reduce desperdicios y maximiza eficiencia con algoritmos de aprendizaje automático",
      icon: <Cog className="w-6 h-6" />,
      color: "#f59e0b",
    },
  ]

  // Efecto para cambiar automáticamente la característica destacada
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [features.length])

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
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 8000))

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

      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animación
    animate()

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Efecto para detectar cuando el componente es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const currentRef = canvasRef.current?.parentElement
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas para efectos de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center mb-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mr-4 relative overflow-hidden">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px 2px rgba(59, 130, 246, 0.5)",
                      "0 0 20px 5px rgba(59, 130, 246, 0.7)",
                      "0 0 10px 2px rgba(59, 130, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full"
                ></motion.div>
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">Servicio Principal</div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
            >
              Inteligencia Artificial Empresarial
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg mb-6"
            >
              Transformamos empresas mediante soluciones de IA avanzada que automatizan procesos, optimizan recursos y
              potencian la toma de decisiones estratégicas. Nuestros sistemas aprenden y evolucionan continuamente,
              adaptándose a las necesidades cambiantes de tu negocio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center text-sm text-blue-300">
                <Cpu className="w-4 h-4 mr-2" />
                <span>Algoritmos Propietarios</span>
              </div>
              <div className="flex items-center text-sm text-blue-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                <span>ROI Promedio 300%</span>
              </div>
              <div className="flex items-center text-sm text-blue-300">
                <Zap className="w-4 h-4 mr-2" />
                <span>Implementación Rápida</span>
              </div>
              <div className="flex items-center text-sm text-blue-300">
                <Network className="w-4 h-4 mr-2" />
                <span>Escalabilidad Total</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/servicios/inteligencia-artificial-empresarial"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group"
              >
                <span>Descubrir Soluciones IA</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="relative">
          <div className="w-full aspect-square relative">
               

            <video style={{borderRadius:"20px"}} src="https://player.vimeo.com/video/1077381495?h=71058eb8ec" autoPlay loop />
    
               </div>
          </div>
        </div>

        {/* Sección de características destacadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Soluciones IA Empresariales</h3>
            <p className="text-gray-400 mt-2">Tecnología de vanguardia adaptada a tus necesidades específicas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className={`p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border ${activeFeature === index ? "border-blue-500/50" : "border-gray-700/50"} hover:border-blue-500/50 transition-colors duration-300 group cursor-pointer`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium" style={{ color: feature.color }}>
                  <span>Explorar</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de industrias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Industrias que Transformamos</h3>
            <p className="text-gray-400 mt-2">Soluciones IA adaptadas a sectores específicos</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Manufactura", icon: <Factory className="w-6 h-6" />, color: "#3b82f6" },
              { name: "Finanzas", icon: <LineChart className="w-6 h-6" />, color: "#10b981" },
              { name: "Salud", icon: <Sparkles className="w-6 h-6" />, color: "#8b5cf6" },
              { name: "Retail", icon: <Building2 className="w-6 h-6" />, color: "#f59e0b" },
              { name: "Logística", icon: <Workflow className="w-6 h-6" />, color: "#ec4899" },
              { name: "Tecnología", icon: <Database className="w-6 h-6" />, color: "#06b6d4" },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
                className="p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${industry.color}20`, color: industry.color }}
                >
                  {industry.icon}
                </div>
                <h5 className="font-medium text-white group-hover:text-blue-400 transition-colors">{industry.name}</h5>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Link
            href="/servicios/inteligencia-artificial-empresarial"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group text-lg"
          >
            <span>Transformar mi Empresa con IA</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="text-gray-400 mt-4">Agenda una consulta gratuita con nuestros expertos en IA</p>
        </motion.div>
      </div>
    </div>
  )
}
