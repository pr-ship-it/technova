"use client"

import type React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  detailTitleKey: string
  detailDescriptionKey: string
  detailFeaturesKey: string
  detailCtaKey: string
  delay: number
  slug: string
  isExpanded: boolean
  toggleExpand: () => void
}

export default function ServiceCard({
  icon,
  title,
  description,
  detailTitleKey,
  detailDescriptionKey,
  detailFeaturesKey,
  detailCtaKey,
  delay,
  slug,
  isExpanded,
  toggleExpand,
}: ServiceCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`service-card ${isExpanded ? "expanded" : ""} flex flex-col relative z-20`}
    >
      <div className="flex flex-col items-center text-center flex-grow">
        <div className="mb-4 glow-effect">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
      </div>

      <div className="flex justify-center space-x-3 w-full mt-auto">
        <button
          onClick={toggleExpand}
          className="service-button service-button-blue flex items-center justify-center"
          aria-expanded={isExpanded}
        >
          <span className="mr-1">{isExpanded ? "Ver menos" : "Ver más"}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <Link
          href={`/servicios/${slug}`}
          className="service-button service-button-green flex items-center justify-center"
        >
          <span className="mr-1">Detalles</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-700"
          >
            <h4 className="text-lg font-bold mb-3 text-blue-400">{t(detailTitleKey)}</h4>
            <p className="text-gray-300 mb-4">{t(detailDescriptionKey)}</p>

            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
              <h5 className="font-bold mb-2 text-white">Características principales:</h5>
              <pre className="whitespace-pre-line text-gray-300 font-sans text-sm">{t(detailFeaturesKey)}</pre>
            </div>

            <div className="flex justify-center">
              <Link href={`/servicios/${slug}`} className="cta-button text-sm py-2 px-4">
                {t(detailCtaKey)}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
