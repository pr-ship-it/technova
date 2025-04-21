"use client"

import { useEffect, useRef } from "react"

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para que ocupe toda la pantalla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Llamar a resize inicialmente y en cada cambio de tamaño de ventana
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const particlesArray: Particle[] = []
    const numberOfParticles = 100
    const maxDistance = 150

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
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Colores futuristas
        const colors = ["#0070f3", "#00c8ff", "#00ffea", "#0047ab", "#4b0082"]
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
            ctx!.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.5})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    // Dibujar cuadrícula futurista
    function drawGrid() {
      const gridSize = 50
      const gridOpacity = 0.1

      ctx!.strokeStyle = `rgba(0, 200, 255, ${gridOpacity})`
      ctx!.lineWidth = 0.5

      // Líneas horizontales
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(canvas.width, y)
        ctx!.stroke()
      }

      // Líneas verticales
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, canvas.height)
        ctx!.stroke()
      }
    }

    // Dibujar circuitos digitales
    function drawCircuits() {
      const numberOfCircuits = 15

      for (let i = 0; i < numberOfCircuits; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const length = Math.random() * 200 + 50
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
      drawGrid()
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" style={{ opacity: 0.8 }} />
}
