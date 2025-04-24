"use client"

import { useState } from "react"
import { Facebook, Instagram, Linkedin, X } from "lucide-react"
import "./social-buttons.css"
import { useMobile } from "@/hooks/use-mobile"

// Componente para la fila de botones sociales (usado en el footer)
export function SocialButtonsRow() {
  return (
    <div className="social-buttons-row">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button facebook">
        <Facebook size={18} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-button twitter">
        <X size={18} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button instagram">
        <Instagram size={18} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
        <Linkedin size={18} />
      </a>
    </div>
  )
}

// Componente para la columna de botones sociales (flotante en el lado izquierdo)
export function SocialButtonsColumn() {
  const isMobile = useMobile()

  if (isMobile) {
    return null
  }

  return (
    <div className="social-buttons-column">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button facebook">
        <Facebook size={20} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-button twitter">
        <X size={20} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button instagram">
        <Instagram size={20} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
        <Linkedin size={20} />
      </a>
    </div>
  )
}

// Componente para el botón social flotante (visible solo en móvil)
export function FloatingSocialButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  return (
    <div className={`floating-social-button ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Facebook size={24} />}
      </button>

      {isOpen && (
        <div className="floating-social-menu">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button facebook">
            <Facebook size={20} />
          </a>
          <a href="https://x.com/TechNovaAI65057" target="_blank" rel="noopener noreferrer" className="social-button twitter">
            <X size={20} />
          </a>
          <a href="https://www.instagram.com/p/DIzu4ogTh38/?igsh=MTV2cGNsbWdseGh2Zg==" target="_blank" rel="noopener noreferrer" className="social-button instagram">
            <Instagram size={20} />
          </a>
        
        </div>
      )}
    </div>
  )
}
