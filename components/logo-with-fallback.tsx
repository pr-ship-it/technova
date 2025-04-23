"use client"

import { useState } from "react"

interface LogoWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function LogoWithFallback({
  src,
  alt,
  width = 100,
  height = 100,
  className = "",
  
}: LogoWithFallbackProps) {

 

  // Mostrar la imagen con manejadores de eventos
  return (
    <img
      src={src} // Usa la prop src en lugar de una URL fija
      alt={alt}
      width={width}
      height={height}
      className={`${className} transition-opacity duration-300`}
      style={{borderRadius:"50%"}}
    />
  )
}