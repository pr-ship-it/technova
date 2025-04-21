"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ServiceDetailProps {
  title: string
  description: string
  features: string[]
  benefits: string[]
  icon: React.ReactNode
  image: string
  color: string
  ctaText: string
  simulationComponent?: React.ReactNode
}

export default function ServiceDetail({
  title,
  description,
  features,
  benefits,
  icon,
  image,
  color,
  ctaText,
  simulationComponent,
}: ServiceDetailProps) {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/#services"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        <span>{t("nav.services")}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className={`inline-flex items-center justify-center p-3 rounded-full ${color} mb-6`}>{icon}</div>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gold-text">{title}</h1>
          <p className="text-xl text-gray-300 mb-8">{description}</p>
          <Link href="#contacto" className="cta-button inline-block">
            {ctaText}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {simulationComponent ? (
            simulationComponent
          ) : (
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto object-cover" />
              <div className={`absolute inset-0 ${color.replace("bg-", "bg-")} opacity-20 mix-blend-overlay`}></div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Características</h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className={`inline-block w-6 h-6 rounded-full ${color} flex-shrink-0 mr-3 mt-1`}></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Beneficios</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className={`inline-block w-6 h-6 rounded-full ${color} flex-shrink-0 mr-3 mt-1`}></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 gold-text">¿Listo para empezar?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a transformar tu negocio.
        </p>
        <Link href="#contacto" className="cta-button-gold inline-block">
          Solicitar Información
        </Link>
      </motion.div>
    </div>
  )
}
