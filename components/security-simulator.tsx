"use client"

import { useState, useRef, useEffect } from "react"
import { ShieldCheck, Lock, AlertTriangle, CheckCircle, XCircle, Server, Database, Globe, Cpu } from "lucide-react"

export default function SecuritySimulator() {
  const [activeTab, setActiveTab] = useState<"scan" | "blockchain">("scan")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState<{
    vulnerabilities: { severity: "high" | "medium" | "low"; name: string; description: string }[]
    score: number
    scannedItems: number
  }>({
    vulnerabilities: [],
    score: 0,
    scannedItems: 0,
  })

  const [blockchainData, setBlockchainData] = useState<{
    blocks: { id: number; hash: string; timestamp: Date; verified: boolean }[]
    transactions: number
    isVerified: boolean
  }>({
    blocks: [],
    transactions: 0,
    isVerified: false,
  })

  const [selectedSystem, setSelectedSystem] = useState<"web" | "network" | "database" | "all">("web")
  const [isBlockchainActive, setIsBlockchainActive] = useState(false)
  const [blockchainProgress, setBlockchainProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

        // Colores futuristas para ciberseguridad y blockchain
        const colors = ["#ffd700", "#ffaa00", "#ff8c00", "#4169e1", "#1e90ff"]
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
            ctx!.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.3})`
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

        ctx!.strokeStyle = `rgba(255, 170, 0, 0.15)`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(startX, startY)
        ctx!.quadraticCurveTo(cpX, cpY, endX, endY)
        ctx!.stroke()

        // Añadir nodos en los extremos
        ctx!.fillStyle = `rgba(255, 170, 0, 0.3)`
        ctx!.beginPath()
        ctx!.arc(startX, startY, 2, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(endX, endY, 2, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Dibujar código binario
    function drawBinaryCode() {
      ctx!.font = "10px monospace"
      ctx!.fillStyle = "rgba(255, 215, 0, 0.2)"

      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const binary = Math.random() > 0.5 ? "1" : "0"
        ctx!.fillText(binary, x, y)
      }
    }

    // Dibujar hexágonos (representando bloques)
    function drawHexagons() {
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 15 + 5

        ctx!.strokeStyle = "rgba(30, 144, 255, 0.2)"
        ctx!.lineWidth = 1
        ctx!.beginPath()

        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j
          const hx = x + size * Math.cos(angle)
          const hy = y + size * Math.sin(angle)

          if (j === 0) {
            ctx!.moveTo(hx, hy)
          } else {
            ctx!.lineTo(hx, hy)
          }
        }

        ctx!.closePath()
        ctx!.stroke()
      }
    }

    // Función de animación
    function animate() {
      // Limpiar canvas con un fondo semitransparente para crear efecto de estela
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar elementos de fondo
      drawCircuits()
      drawBinaryCode()
      drawHexagons()

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

  // Función para iniciar escaneo de seguridad
  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResults({
      vulnerabilities: [],
      score: 0,
      scannedItems: 0,
    })

    // Simulación de progreso
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          generateScanResults()
          return 100
        }
        return prev + 2
      })
    }, 150)

    return () => clearInterval(interval)
  }

  // Generar resultados simulados del escaneo
  const generateScanResults = () => {
    // Vulnerabilidades potenciales
    const potentialVulnerabilities = [
      {
        severity: "high",
        name: "Inyección SQL",
        description: "Posible vulnerabilidad de inyección SQL en formulario de login",
      },
      {
        severity: "high",
        name: "XSS Persistente",
        description: "Vulnerabilidad de Cross-Site Scripting en comentarios",
      },
      {
        severity: "high",
        name: "Exposición de datos sensibles",
        description: "Información confidencial transmitida sin cifrar",
      },
      { severity: "medium", name: "CSRF", description: "Falta de protección contra Cross-Site Request Forgery" },
      {
        severity: "medium",
        name: "Configuración incorrecta",
        description: "Servidor con configuración de seguridad débil",
      },
      { severity: "medium", name: "Autenticación débil", description: "Política de contraseñas insuficiente" },
      {
        severity: "low",
        name: "Cookies sin flags de seguridad",
        description: "Cookies sin atributos HttpOnly y Secure",
      },
      { severity: "low", name: "Cabeceras HTTP inseguras", description: "Falta de cabeceras de seguridad importantes" },
      { severity: "low", name: "Información expuesta", description: "Exposición de información en mensajes de error" },
    ] as const

    // Seleccionar vulnerabilidades aleatoriamente según el sistema seleccionado
    let vulnerabilities: typeof potentialVulnerabilities = []

    if (selectedSystem === "all") {
      // Más vulnerabilidades para escaneo completo
      const count = 4 + Math.floor(Math.random() * 3)
      const shuffled = [...potentialVulnerabilities].sort(() => 0.5 - Math.random())
      vulnerabilities = shuffled.slice(0, count)
    } else {
      // Menos vulnerabilidades para escaneos específicos
      const count = 1 + Math.floor(Math.random() * 3)
      const shuffled = [...potentialVulnerabilities].sort(() => 0.5 - Math.random())
      vulnerabilities = shuffled.slice(0, count)
    }

    // Calcular puntuación de seguridad (más vulnerabilidades = puntuación más baja)
    const highCount = vulnerabilities.filter((v) => v.severity === "high").length
    const mediumCount = vulnerabilities.filter((v) => v.severity === "medium").length
    const lowCount = vulnerabilities.filter((v) => v.severity === "low").length

    const baseScore = 100
    const highPenalty = highCount * 15
    const mediumPenalty = mediumCount * 8
    const lowPenalty = lowCount * 3

    const score = Math.max(0, baseScore - highPenalty - mediumPenalty - lowPenalty)

    // Número de elementos escaneados
    const scannedItems =
      selectedSystem === "all" ? 120 + Math.floor(Math.random() * 50) : 30 + Math.floor(Math.random() * 20)

    setScanResults({
      vulnerabilities,
      score,
      scannedItems,
    })

    setIsScanning(false)
  }

  // Función para iniciar blockchain
  const startBlockchain = () => {
    setIsBlockchainActive(true)
    setBlockchainProgress(0)
    setBlockchainData({
      blocks: [],
      transactions: 0,
      isVerified: false,
    })

    // Simulación de creación de bloques
    const interval = setInterval(() => {
      setBlockchainProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // Añadir un nuevo bloque cada 20%
        if (prev % 20 === 0) {
          addBlock()
        }

        return prev + 4
      })
    }, 200)

    return () => clearInterval(interval)
  }

  // Añadir un bloque a la cadena
  const addBlock = () => {
    const newBlock = {
      id: blockchainData.blocks.length + 1,
      hash: generateRandomHash(),
      timestamp: new Date(),
      verified: true,
    }

    const newTransactions = blockchainData.transactions + Math.floor(Math.random() * 5) + 1

    setBlockchainData({
      blocks: [...blockchainData.blocks, newBlock],
      transactions: newTransactions,
      isVerified: true,
    })
  }

  // Generar hash aleatorio
  const generateRandomHash = () => {
    const characters = "0123456789abcdef"
    let hash = "0x"
    for (let i = 0; i < 40; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return hash
  }

  // Formatear hash para mostrar
  const formatHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl relative">
      {/* Canvas para efectos de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-900/20"></div>
      </div>

      {/* Barra superior */}
      <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-yellow-500/15 relative z-10">
        <div className="flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="font-medium">Seguridad & Blockchain</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("scan")}
            className={`p-2 rounded-md ${
              activeTab === "scan" ? "bg-yellow-500/20" : "hover:bg-gray-800"
            } transition-colors`}
          >
            <Lock size={16} />
          </button>
          <button
            onClick={() => setActiveTab("blockchain")}
            className={`p-2 rounded-md ${
              activeTab === "blockchain" ? "bg-yellow-500/20" : "hover:bg-gray-800"
            } transition-colors`}
          >
            <Database size={16} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="h-[400px] relative z-10">
        {activeTab === "scan" && (
          <div className="h-full bg-gray-950/70 backdrop-blur-sm p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Análisis de Vulnerabilidades</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Seleccionar Sistema</label>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`p-3 rounded-lg border ${
                    selectedSystem === "web" ? "border-yellow-500 bg-yellow-500/10" : "border-gray-700"
                  } cursor-pointer hover:bg-gray-800 transition-colors`}
                  onClick={() => setSelectedSystem("web")}
                >
                  <div className="flex items-center">
                    <Globe size={16} className="mr-2" />
                    <span>Aplicación Web</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    selectedSystem === "network" ? "border-yellow-500 bg-yellow-500/10" : "border-gray-700"
                  } cursor-pointer hover:bg-gray-800 transition-colors`}
                  onClick={() => setSelectedSystem("network")}
                >
                  <div className="flex items-center">
                    <Server size={16} className="mr-2" />
                    <span>Red</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    selectedSystem === "database" ? "border-yellow-500 bg-yellow-500/10" : "border-gray-700"
                  } cursor-pointer hover:bg-gray-800 transition-colors`}
                  onClick={() => setSelectedSystem("database")}
                >
                  <div className="flex items-center">
                    <Database size={16} className="mr-2" />
                    <span>Base de Datos</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    selectedSystem === "all" ? "border-yellow-500 bg-yellow-500/10" : "border-gray-700"
                  } cursor-pointer hover:bg-gray-800 transition-colors`}
                  onClick={() => setSelectedSystem("all")}
                >
                  <div className="flex items-center">
                    <Cpu size={16} className="mr-2" />
                    <span>Escaneo Completo</span>
                  </div>
                </div>
              </div>
            </div>

            {!isScanning && scanProgress === 0 ? (
              <button
                onClick={startScan}
                className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
              >
                Iniciar Análisis de Seguridad
              </button>
            ) : isScanning ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">
                    Escaneando {selectedSystem === "all" ? "todos los sistemas" : selectedSystem}...
                  </span>
                  <span className="text-sm text-gray-300">{scanProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
                  <div
                    className="h-2 rounded-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 italic">
                  Analizando vulnerabilidades potenciales y configuraciones inseguras...
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Resumen del Análisis</h4>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        scanResults.score > 80
                          ? "bg-green-500/20 text-green-400"
                          : scanResults.score > 50
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {scanResults.score > 80 ? "Seguro" : scanResults.score > 50 ? "Atención Requerida" : "Crítico"}
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          scanResults.score > 80
                            ? "bg-green-500"
                            : scanResults.score > 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${scanResults.score}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-bold text-white">{scanResults.score}</span>
                  </div>

                  <div className="text-sm text-gray-300">
                    <p>Elementos analizados: {scanResults.scannedItems}</p>
                    <p>Vulnerabilidades encontradas: {scanResults.vulnerabilities.length}</p>
                    <p>Sistema analizado: {selectedSystem === "all" ? "Completo" : selectedSystem}</p>
                  </div>
                </div>

                <h4 className="font-medium text-white mb-2">Vulnerabilidades Detectadas</h4>
                {scanResults.vulnerabilities.length > 0 ? (
                  <div className="space-y-3">
                    {scanResults.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-start">
                          <div
                            className={`p-1 rounded-full mr-2 mt-1 ${
                              vuln.severity === "high"
                                ? "bg-red-500/20"
                                : vuln.severity === "medium"
                                  ? "bg-yellow-500/20"
                                  : "bg-blue-500/20"
                            }`}
                          >
                            <AlertTriangle
                              size={14}
                              className={
                                vuln.severity === "high"
                                  ? "text-red-500"
                                  : vuln.severity === "medium"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                              }
                            />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h5 className="font-medium text-white">{vuln.name}</h5>
                              <span
                                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                  vuln.severity === "high"
                                    ? "bg-red-500/20 text-red-400"
                                    : vuln.severity === "medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {vuln.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{vuln.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
                    <p className="text-green-400">¡No se encontraron vulnerabilidades!</p>
                  </div>
                )}

                <button
                  onClick={startScan}
                  className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white transition-colors mt-4"
                >
                  Volver a Analizar
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "blockchain" && (
          <div className="h-full bg-gray-950/70 backdrop-blur-sm p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Tecnología Blockchain</h3>

            {!isBlockchainActive && blockchainProgress === 0 ? (
              <div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
                  <h4 className="font-medium text-white mb-2">Protección de Datos con Blockchain</h4>
                  <p className="text-sm text-gray-300 mb-4">
                    Nuestra tecnología blockchain proporciona un nivel de seguridad sin precedentes para sus datos y
                    transacciones. Cada registro se almacena en bloques inmutables y verificables.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-900 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Inmutabilidad</p>
                      <CheckCircle size={20} className="text-green-500 mx-auto mt-1" />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Transparencia</p>
                      <CheckCircle size={20} className="text-green-500 mx-auto mt-1" />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Descentralización</p>
                      <CheckCircle size={20} className="text-green-500 mx-auto mt-1" />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Encriptación</p>
                      <CheckCircle size={20} className="text-green-500 mx-auto mt-1" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={startBlockchain}
                  className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
                >
                  Iniciar Demostración de Blockchain
                </button>
              </div>
            ) : blockchainProgress < 100 ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Creando cadena de bloques...</span>
                  <span className="text-sm text-gray-300">{blockchainProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
                  <div
                    className="h-2 rounded-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${blockchainProgress}%` }}
                  ></div>
                </div>

                {blockchainData.blocks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-white mb-2">Bloques Creados</h4>
                    <div className="space-y-2">
                      {blockchainData.blocks.map((block) => (
                        <div
                          key={block.id}
                          className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <div className="flex items-center">
                              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full mr-2">
                                Bloque #{block.id}
                              </span>
                              <span className="text-xs text-gray-400">{block.timestamp.toLocaleTimeString()}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">Hash: {formatHash(block.hash)}</p>
                          </div>
                          <div>
                            {block.verified ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              <XCircle size={16} className="text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    <h4 className="font-medium text-white">Blockchain Verificada</h4>
                  </div>
                  <p className="text-sm text-gray-300">
                    La cadena de bloques ha sido creada y verificada correctamente. Todos los datos están protegidos con
                    criptografía avanzada y son inmutables.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
                  <h4 className="font-medium text-white mb-2">Estadísticas de la Blockchain</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Bloques</p>
                      <p className="text-xl font-bold text-white">{blockchainData.blocks.length}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Transacciones</p>
                      <p className="text-xl font-bold text-white">{blockchainData.transactions}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Tiempo de Creación</p>
                      <p className="text-xl font-bold text-white">{(blockchainData.blocks.length * 0.8).toFixed(1)}s</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Estado</p>
                      <p className="text-xl font-bold text-green-500">Seguro</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium text-white mb-2">Bloques en la Cadena</h4>
                <div className="space-y-2 mb-4">
                  {blockchainData.blocks.map((block) => (
                    <div
                      key={block.id}
                      className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full mr-2">
                            Bloque #{block.id}
                          </span>
                          <span className="text-xs text-gray-400">{block.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Hash: {formatHash(block.hash)}</p>
                      </div>
                      <div>
                        {block.verified ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startBlockchain}
                  className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
                >
                  Reiniciar Demostración
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
