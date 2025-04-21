"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import LogoWithFallback from "./logo-with-fallback"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-visible">
      <div className="container mx-auto px-4 z-20 relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 relative w-64 h-64 md:w-80 md:h-80 mx-auto"
          >
            <div className="w-full h-full relative overflow-hidden rounded-full">
              <LogoWithFallback
                src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745273166/Texto_del_p%C3%A1rrafo_otxb9f.png"
                alt="TechNova AI Logo"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Título con la nueva fuente One Day */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full mb-12 px-4 md:px-0"
          >
            <h1 style={{color:"#F59E0B",fontSize:"30px",textShadow:"1px 2px 5px #F59E0B"}} className="gold-text-fixed mx-auto">TechNova AI</h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl max-w-3xl mb-10 neon-text"
          >
            {t("hero.slogan")}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="#contact" className="cta-button group">
              {t("hero.cta")}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
