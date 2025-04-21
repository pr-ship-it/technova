"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about"  className="py-20 relative">
      {/* Eliminamos el fondo con efecto radial */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
         
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2  className="text-3xl md:text-4xl font-exo2 font-bold mb-8 gold-text gold-text-lg">{t("about.title")}</h2>

          <motion.div
            className="p-8 rounded-xl border border-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{backgroundColor:"rgba(118, 128, 153, 0.73)"}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">{t("about.description")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
