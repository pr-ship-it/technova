"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, Layers, Smartphone, Monitor, Tablet, Layout, Check } from "lucide-react"

export default function WebDesignSimulator() {
  const [activeTab, setActiveTab] = useState<"design" | "preview">("design")
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1)
  const [colorScheme, setColorScheme] = useState<"blue" | "purple" | "green" | "orange">("purple")
  const [layout, setLayout] = useState<"modern" | "classic" | "minimal">("modern")
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isCustomizing, setIsCustomizing] = useState(true)

  // Colores para cada esquema
  const colorSchemes = {
    blue: {
      primary: "#0070f3",
      secondary: "#0050b3",
      accent: "#00c8ff",
      bg: "#f0f7ff",
    },
    purple: {
      primary: "#8a2be2",
      secondary: "#6a0dad",
      accent: "#c77dff",
      bg: "#f5f0ff",
    },
    green: {
      primary: "#00c853",
      secondary: "#009624",
      accent: "#5efc82",
      bg: "#f0fff4",
    },
    orange: {
      primary: "#ff6d00",
      secondary: "#c43c00",
      accent: "#ffab40",
      bg: "#fff5f0",
    },
  }

  // Obtener el esquema de color actual
  const currentColors = colorSchemes[colorScheme]

  // Obtener información de la plantilla seleccionada
  const getTemplateInfo = () => {
    switch (selectedTemplate) {
      case 1:
        return {
          type: "restaurante",
          title: "Mi Restaurante",
          sections: ["Menú", "Reservas", "Ubicación"],
          icon: "🍽️",
        }
      case 2:
        return {
          type: "medicina",
          title: "Centro Médico",
          sections: ["Servicios", "Doctores", "Citas"],
          icon: "🏥",
        }
      case 3:
        return {
          type: "tecnología",
          title: "Tech Solutions",
          sections: ["Productos", "Servicios", "Soporte"],
          icon: "💻",
        }
      default:
        return {
          type: "general",
          title: "Mi Sitio Web",
          sections: ["Inicio", "Servicios", "Contacto"],
          icon: "🌐",
        }
    }
  }

  const templateInfo = getTemplateInfo()

  // Función para finalizar personalización
  const finishCustomization = () => {
    setIsCustomizing(false)
  }

  // Función para volver a personalizar
  const startCustomizing = () => {
    setIsCustomizing(true)
  }

  // Referencia al canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Efecto para inicializar y limpiar la animación
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño del contenedor
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

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

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Colores que combinan con el tema de diseño web
        const colors = ["#9333ea", "#a855f7", "#c084fc", "#38bdf8", "#7dd3fc"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
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
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Crear partículas
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 10000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Función para conectar partículas cercanas
    const connectParticles = () => {
      if (!ctx) return
      const maxDistance = 100

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Opacidad basada en la distancia
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Dibujar elementos de diseño web (wireframes, grids, etc.)
    const drawDesignElements = () => {
      if (!ctx) return

      // Dibujar algunos elementos de grid y wireframe aleatoriamente
      if (Math.random() < 0.01) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 30 + 10

        ctx.strokeStyle = "rgba(147, 51, 234, 0.2)"
        ctx.lineWidth = 0.5
        ctx.strokeRect(x, y, size, size)

        // Líneas internas para simular wireframes
        ctx.beginPath()
        ctx.moveTo(x, y + size / 3)
        ctx.lineTo(x + size, y + size / 3)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x, y + (size / 3) * 2)
        ctx.lineTo(x + size, y + (size / 3) * 2)
        ctx.stroke()
      }
    }

    // Función de animación
    const animate = () => {
      // Limpiar canvas con un poco de opacidad para crear efecto de estela
      if (ctx) {
        ctx.fillStyle = "rgba(17, 24, 39, 0.1)" // Color de fondo con opacidad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      connectParticles()
      drawDesignElements()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animación
    animate()

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
      {/* Canvas para el efecto de partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Barra superior */}
      <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-purple-500/15 relative z-10">
        <div className="flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-500" />
          <span className="font-medium">Diseño Web AI</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("design")}
            className={`p-2 rounded-md ${
              activeTab === "design" ? "bg-purple-500/20" : "hover:bg-gray-800"
            } transition-colors`}
          >
            <Layers size={16} />
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`p-2 rounded-md ${
              activeTab === "preview" ? "bg-purple-500/20" : "hover:bg-gray-800"
            } transition-colors`}
          >
            <Layout size={16} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="h-[400px] relative z-10">
        {activeTab === "design" && (
          <div className="h-full bg-gray-950 p-4 overflow-y-auto">
            {isCustomizing ? (
              <>
                <h3 className="text-lg font-bold text-white mb-4">Personaliza tu Sitio Web</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Plantilla</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 1, name: "Restaurante", image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745853992/modern-restaurant-website_weleyt.png" },
                        { id: 2, name: "Medicina", image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745853991/modern-medical-template_axqift.png" },
                        { id: 3, name: "Tecnología", image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745853992/nebula-tech_tc9i8c.png" },
                      ].map((template) => (
                        <div
                          key={template.id}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                            selectedTemplate === template.id ? "border-purple-500" : "border-transparent"
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
                            <img
                              src={template.image || "/placeholder.svg"}
                              alt={`Plantilla de ${template.name}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-xs text-white font-medium">{template.name}</span>
                            </div>
                          </div>
                          {selectedTemplate === template.id && (
                            <div className="absolute top-1 right-1 bg-purple-500 rounded-full p-0.5">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Esquema de Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["blue", "purple", "green", "orange"] as const).map((scheme) => (
                        <div
                          key={scheme}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                            colorScheme === scheme ? "border-purple-500" : "border-transparent"
                          }`}
                          onClick={() => setColorScheme(scheme)}
                        >
                          <div className="h-10 w-full" style={{ backgroundColor: colorSchemes[scheme].primary }}></div>
                          {colorScheme === scheme && (
                            <div className="absolute top-1 right-1 bg-white rounded-full p-0.5">
                              <Check size={12} className="text-black" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Estilo de Diseño</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["modern", "classic", "minimal"] as const).map((style) => (
                        <div
                          key={style}
                          className={`p-3 rounded-lg border ${
                            layout === style ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
                          } cursor-pointer hover:bg-gray-800 transition-colors text-center`}
                          onClick={() => setLayout(style)}
                        >
                          <span className="capitalize">{style}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vista Previa en Dispositivo</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setDevice("desktop")}
                        className={`flex-1 p-2 rounded-lg border ${
                          device === "desktop" ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
                        } flex items-center justify-center`}
                      >
                        <Monitor size={16} className="mr-1" />
                        <span className="text-sm">Desktop</span>
                      </button>
                      <button
                        onClick={() => setDevice("tablet")}
                        className={`flex-1 p-2 rounded-lg border ${
                          device === "tablet" ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
                        } flex items-center justify-center`}
                      >
                        <Tablet size={16} className="mr-1" />
                        <span className="text-sm">Tablet</span>
                      </button>
                      <button
                        onClick={() => setDevice("mobile")}
                        className={`flex-1 p-2 rounded-lg border ${
                          device === "mobile" ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
                        } flex items-center justify-center`}
                      >
                        <Smartphone size={16} className="mr-1" />
                        <span className="text-sm">Mobile</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={finishCustomization}
                    className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors mt-4"
                  >
                    Aplicar Cambios
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Diseño Completado!</h3>
                <p className="text-gray-300 mb-6 max-w-xs">
                  Tu sitio web ha sido personalizado según tus preferencias. Puedes ver la vista previa o seguir
                  editando.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    Ver Vista Previa
                  </button>
                  <button
                    onClick={startCustomizing}
                    className="px-4 py-2 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
                  >
                    Seguir Editando
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "preview" && (
          <div className="h-full bg-gray-950 p-4 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Vista Previa</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setDevice("desktop")}
                  className={`p-1.5 rounded-md ${
                    device === "desktop" ? "bg-purple-500/20 text-purple-400" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setDevice("tablet")}
                  className={`p-1.5 rounded-md ${
                    device === "tablet" ? "bg-purple-500/20 text-purple-400" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  className={`p-1.5 rounded-md ${
                    device === "mobile" ? "bg-purple-500/20 text-purple-400" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg overflow-hidden relative">
              {/* Barra de navegación simulada */}
              <div className="p-3 flex justify-between items-center" style={{ backgroundColor: currentColors.primary }}>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-white mr-2 flex items-center justify-center text-xs">
                    {templateInfo.icon}
                  </div>
                  <div className="text-white text-sm font-medium">{templateInfo.title}</div>
                </div>
                <div className="flex space-x-3">
                  {templateInfo.sections.map((section, index) => (
                    <div
                      key={index}
                      className={`${device === "mobile" && index > 0 ? "hidden" : ""} text-xs text-white/80 px-2 py-1 rounded hover:bg-white/10 cursor-pointer`}
                    >
                      {section}
                    </div>
                  ))}
                  {device === "desktop" && (
                    <div className="text-xs text-white/80 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
                      Contacto
                    </div>
                  )}
                </div>
              </div>

              {/* Contenido simulado */}
              <div style={{ backgroundColor: currentColors.bg, padding: "1rem" }}>
                {/* Hero section */}
                <div
                  className="rounded-lg p-4 mb-4 flex flex-col items-center text-center"
                  style={{ backgroundColor: currentColors.secondary + "20" }}
                >
                  <div className="w-full h-32 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={`https://res.cloudinary.com/dllkefj8m/image/upload/v1745853992/nebula-tech_tc9i8c.png`}
                      alt="Hero image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="w-48 h-6 rounded-full mb-2"
                    style={{ backgroundColor: currentColors.secondary + "50" }}
                  ></div>
                  <div
                    className="w-64 h-4 rounded-full mb-1"
                    style={{ backgroundColor: currentColors.secondary + "30" }}
                  ></div>
                  <div
                    className="w-56 h-4 rounded-full mb-3"
                    style={{ backgroundColor: currentColors.secondary + "30" }}
                  ></div>
                  <div className="w-32 h-8 rounded-full" style={{ backgroundColor: currentColors.accent }}></div>
                </div>

                {/* Contenido principal */}
                <div className={`grid ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"} gap-4 mb-4`}>
                  <div className="rounded-lg p-3" style={{ backgroundColor: "white" }}>
                    <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: currentColors.accent }}></div>
                    <div
                      className="w-32 h-4 rounded-full mb-2"
                      style={{ backgroundColor: currentColors.secondary + "30" }}
                    ></div>
                    <div
                      className="w-full h-3 rounded-full mb-1"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                    <div
                      className="w-full h-3 rounded-full mb-1"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                    <div
                      className="w-3/4 h-3 rounded-full"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: "white" }}>
                    <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: currentColors.accent }}></div>
                    <div
                      className="w-32 h-4 rounded-full mb-2"
                      style={{ backgroundColor: currentColors.secondary + "30" }}
                    ></div>
                    <div
                      className="w-full h-3 rounded-full mb-1"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                    <div
                      className="w-full h-3 rounded-full mb-1"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                    <div
                      className="w-3/4 h-3 rounded-full"
                      style={{ backgroundColor: currentColors.secondary + "20" }}
                    ></div>
                  </div>
                </div>

                {/* Sección final */}
                <div className="rounded-lg p-4 flex flex-col items-center" style={{ backgroundColor: "white" }}>
                  <div
                    className="w-40 h-5 rounded-full mb-3"
                    style={{ backgroundColor: currentColors.secondary + "40" }}
                  ></div>
                  <div className="flex space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: currentColors.primary }}></div>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: currentColors.primary }}></div>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: currentColors.primary }}></div>
                  </div>
                  <div
                    className="w-full h-24 rounded-lg mt-4"
                    style={{ backgroundColor: currentColors.secondary + "10" }}
                  >
                    <div className="flex justify-center pt-4">
                      <div
                        className="w-24 h-4 rounded-full"
                        style={{ backgroundColor: currentColors.secondary + "30" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setActiveTab("design")}
                className="px-4 py-2 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
              >
                Volver a Editar
              </button>
              <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                Finalizar Diseño
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

