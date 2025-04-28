"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import LogoWithFallback from "./logo-with-fallback"
import "./hero-section.css"
export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-visible">
      <div className="container mx-auto px-4 z-20 relative">
        <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center">

        <div className="relative w-[350px] h-[350px] mx-auto animate-border-glow rounded-full">
  <img
    src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745420643/brain_yesjdw.jpg"
    alt="Animated GIF"
    className="w-full h-full rounded-full"
  />
  <style jsx>{`
    @keyframes glowMove {
      0% {
        box-shadow: 0 4px 20px rgba(7, 181, 250, 0.8);
      }
      25% {
        box-shadow: 4px 0 20px rgba(7, 181, 250, 0.8);
      }
      50% {
        box-shadow: 0 -4px 20px rgba(7, 181, 250, 0.8);
      }
      75% {
        box-shadow: -4px 0 20px rgba(7, 181, 250, 0.8);
      }
      100% {
        box-shadow: 0 4px 20px rgba(7, 181, 250, 0.8);
      }
    }

    .animate-border-glow {
      animation: glowMove 4s infinite linear;
      
      background-color: white;
    }
  `}</style>
</div>

  
</div>

          {/* Título con la nueva fuente One Day */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full mb-12 px-4 md:px-0"
          >
            <h1 style={{color:"#F59E0B",fontSize:"30px",marginTop:"38px",textShadow:"1px 2px 5px #F59E0B"}} className="gold-text-fixed mx-auto">TechNova AI</h1>
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
            <a href="/contact" className="cta-button group">
              {t("hero.cta")}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

