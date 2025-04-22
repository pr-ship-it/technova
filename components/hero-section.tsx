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
        <div className="flex flex-col items-center text-center">

    <div  style={{display:"absolute",top:"100px", filter: "drop-shadow(0 4px 8px rgba(7, 181, 250, 0.88))"}} className="w-full h-full relative overflow-hidden rounded-full">
      <img
        src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745342459/Dise-o-sin-t-tulo-1--unscreen_ra8ewe.gif"
        alt="Animated GIF"
        className="w-[650px] h-[650px]"
       
      />
    </div>
  
</div>

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
