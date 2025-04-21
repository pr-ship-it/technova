"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function FuturisticBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Configuración básica
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Posicionar cámara
    camera.position.z = 30

    // Crear partículas
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    // Colores futuristas
    const colors = [
      new THREE.Color(0x0070f3), // azul
      new THREE.Color(0x00c8ff), // cian claro
      new THREE.Color(0x00ffea), // turquesa
      new THREE.Color(0x4b0082), // índigo
      new THREE.Color(0x9400d3), // violeta
    ]

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Posiciones
      posArray[i] = (Math.random() - 0.5) * 100
      posArray[i + 1] = (Math.random() - 0.5) * 100
      posArray[i + 2] = (Math.random() - 0.5) * 100

      // Colores
      const color = colors[Math.floor(Math.random() * colors.length)]
      colorsArray[i] = color.r
      colorsArray[i + 1] = color.g
      colorsArray[i + 2] = color.b
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    // Material para partículas
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })

    // Crear sistema de partículas
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Crear líneas de cuadrícula
    const gridHelper = new THREE.GridHelper(100, 50, 0x0088ff, 0x0044aa)
    gridHelper.position.y = -20
    scene.add(gridHelper)

    // Crear líneas de conexión
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00a2ff,
      transparent: true,
      opacity: 0.2,
    })

    const linesCount = 20
    const linesGroup = new THREE.Group()

    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry()
      const points = []

      const startX = (Math.random() - 0.5) * 80
      const startY = (Math.random() - 0.5) * 80
      const startZ = (Math.random() - 0.5) * 80

      points.push(new THREE.Vector3(startX, startY, startZ))

      // Crear línea con varios segmentos
      const segments = Math.floor(Math.random() * 3) + 2
      let currentX = startX
      let currentY = startY
      let currentZ = startZ

      for (let j = 0; j < segments; j++) {
        currentX += (Math.random() - 0.5) * 20
        currentY += (Math.random() - 0.5) * 20
        currentZ += (Math.random() - 0.5) * 20

        points.push(new THREE.Vector3(currentX, currentY, currentZ))
      }

      lineGeometry.setFromPoints(points)
      const line = new THREE.Line(lineGeometry, linesMaterial)
      linesGroup.add(line)
    }

    scene.add(linesGroup)

    // Manejar cambio de tamaño de ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animación
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)

      // Rotar partículas suavemente
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      // Responder al movimiento del mouse
      particlesMesh.rotation.x += mouseY * 0.0005
      particlesMesh.rotation.y += mouseX * 0.0005

      linesGroup.rotation.x += 0.001
      linesGroup.rotation.y += 0.001

      // Responder al movimiento del mouse
      linesGroup.rotation.x += mouseY * 0.001
      linesGroup.rotation.y += mouseX * 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Liberar memoria
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      linesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ opacity: 0.7 }} />
}
