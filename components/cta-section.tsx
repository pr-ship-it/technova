"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { QrCode } from "lucide-react"

// Importar el componente de botones sociales
import { SocialButtonsRow } from "./social-buttons"

export default function CtaSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eliminamos los elementos de fondo */}

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-exo2 font-bold mb-4 gold-text gold-text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t("cta.title")}
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("cta.subtitle")}
              </motion.p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.div
                className="bg-gray p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-48 h-48 relative flex items-center justify-center bg-white">
                  <QrCode className="w-36 h-36 text-black" />
                  {/* Eliminamos la animación del borde */}
                </div>
              </motion.div>

              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-lg mb-6 text-gray-300">
                  <span className="block font-bold text-white mb-2">AiSmartTechnology.com</span>
                  info@ 
                  <br />
                  +52-998-9071829
                </p>
                <a href="#contact" className="cta-button-gold inline-block mb-4">
                  {t("cta.button")}
                </a>
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">{t("footer.follow")}</p>
                  <SocialButtonsRow />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
