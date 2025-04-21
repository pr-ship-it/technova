"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Award, Briefcase, GraduationCap, Globe, Home } from "lucide-react"
import Link from "next/link"

interface TeamMemberDetailProps {
  name: string
  position: string
  description: string
  longDescription: string
  image: string
  email: string
  education: string[]
  experience: string[]
  achievements: string[]
  languages: string[]
}

export default function TeamMemberDetail({
  name,
  position,
  description,
  longDescription,
  image,
  email,
  education,
  experience,
  achievements,
  languages,
}: TeamMemberDetailProps) {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Navegación mejorada */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <Home size={16} className="mr-2" />
          <span>Inicio</span>
        </Link>
        <span className="text-gray-500">/</span>
        <Link href="/equipo" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          <span>{t("team.backToTeam")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna izquierda - Información principal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/30 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 gold-text">{name}</h1>
                <p className="text-xl text-blue-300 mb-4">{position}</p>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  <span>{email}</span>
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Biografía</h2>
              <p className="text-gray-300 mb-6">{description}</p>
              <div className="space-y-4 text-gray-300">
                {longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Columna derecha - Detalles adicionales */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8">
            {/* Educación */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Educación</h2>
              </div>
              <ul className="space-y-3">
                {education.map((item, index) => (
                  <li key={index} className="text-gray-300 flex">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiencia */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-green-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Experiencia</h2>
              </div>
              <ul className="space-y-3">
                {experience.map((item, index) => (
                  <li key={index} className="text-gray-300 flex">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logros */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Logros</h2>
              </div>
              <ul className="space-y-3">
                {achievements.map((item, index) => (
                  <li key={index} className="text-gray-300 flex">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Idiomas */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <Globe className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Idiomas</h2>
              </div>
              <ul className="space-y-3">
                {languages.map((item, index) => (
                  <li key={index} className="text-gray-300 flex">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlaces de navegación adicionales */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Navegación</h2>
              <div className="space-y-3">
                <Link href="/" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Volver a Inicio
                </Link>
                <Link href="/equipo" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Ver Equipo Completo
                </Link>
                <Link href="/#services" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Nuestros Servicios
                </Link>
                <Link href="/#contact" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Botones de navegación en la parte inferior */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link href="/" className="cta-button">
          Volver a Inicio
        </Link>
        <Link href="/equipo" className="cta-button-gold">
          Ver Equipo Completo
        </Link>
      </div>
    </div>
  )
}
