"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { Menu, X, Globe } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoWithFallback from "./logo-with-fallback"
import NavbarWhatsappButton from "./navbar-whatsapp-button"
import "./navigation.css"

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  // Función para construir URLs correctamente
  const getUrl = (sectionId: string) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`
  }

  return (
    <motion.nav
    style={{alignItems:"center",display:"flex"}}  
    className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link href="/" className="logo-link">
              <LogoWithFallback
                src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745273166/Texto_del_p%C3%A1rrafo_otxb9f.png"
                alt="TechNova AI Logo"
                width={50}
                height={50}
                className="logo-image"
              />
              <span className="logo-text small-logo-text">TechNova AI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Link href={getUrl("home")} className="nav-link">
              {t("nav.home")}
            </Link>
            <Link href={getUrl("services")} className="nav-link">
              {t("nav.services")}
            </Link>
            <Link href={getUrl("about")} className="nav-link">
              {t("nav.about")}
            </Link>
            <Link href="/nuestra-historia" className="nav-link">
              Nuestra Historia
            </Link>
            <Link href="/equipo" className="nav-link">
              {t("nav.team")}
            </Link>
          

            {/* Botón de WhatsApp en la barra de navegación */}
            <NavbarWhatsappButton />

            <button onClick={toggleLanguage} className="language-button">
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-controls">
            {/* Botón de WhatsApp para móvil */}
            <div className="mobile-whatsapp">
              <NavbarWhatsappButton />
            </div>

            <button onClick={toggleLanguage} className="mobile-language-button">
              <Globe size={14} />
              <span className="language-text">{language.toUpperCase()}</span>
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-menu-container">
            <Link href={getUrl("home")} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              {t("nav.home")}
            </Link>
            <Link href={getUrl("services")} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              {t("nav.services")}
            </Link>
            <Link href={getUrl("about")} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              {t("nav.about")}
            </Link>
            <Link href="/nuestra-historia" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              Nuestra Historia
            </Link>
            <Link href="/equipo" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              {t("nav.team")}
            </Link>
            
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
