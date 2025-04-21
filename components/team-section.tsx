"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import proeba from "../public/images/confident-latino-director.png"
interface TeamMemberProps {
  name: string
  position: string
  description: string
  image: string
  delay: number
  email: string
  slug: string
}

const TeamMember = ({ name, position, description, image, delay, email, slug }: TeamMemberProps) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,112,243,0.3)] text-center">
        {/* Imagen redonda */}
        <Link href={`/equipo/${slug}`} className="block mb-4">
          <div className="relative mx-auto w-32 h-32 overflow-hidden rounded-full border-2 border-blue-500/30 group-hover:border-blue-500/70 transition-colors duration-300">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay con efecto hover */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>
        </Link>

        {/* Información básica */}
        <Link href={`/equipo/${slug}`} className="block">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-blue-300 font-medium mb-3">{position}</p>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">{description}</p>
        </Link>

        {/* Email de contacto - ahora fuera del enlace principal */}
        <div className="flex justify-center">
          <a
            href={`mailto:${email}`}
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center text-sm"
          >
            <Mail size={14} className="mr-2" />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}



export default function TeamSection() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      nameKey: "team.ceo.name",
      positionKey: "team.ceo.position",
      descriptionKey: "team.ceo.description",
      image: "https://i.ibb.co/mFzC6yDg/Imagen-de-Whats-App-2025-04-21-a-las-15-42-14-58234dd9.jpg",
      delay: 0.1,
      email: "carlos@TechNovaAI.com",
      slug: "Luis H.",
    },

    {
      nameKey: "team.marketing.name",
      positionKey: "team.marketing.position",
      descriptionKey: "team.marketing.description",
      image: "https://i.ibb.co/p6WdYvpS/ar.jpg",
      delay: 0.3,
      email: "miguel@TechNovaAI.com",
      slug: "Ariel-D",
    },
    {
      nameKey: "team.security.name",
      positionKey: "team.security.position",
      descriptionKey: "team.security.description",
      image: "https://i.ibb.co/v6BbP9RG/Chat-GPT-Image-21-abr-2025-03-35-07-p-m.png",
      delay: 0.4,
      email: "laura@TechNovaAI.com",
      slug: "Ivan-G",
    },
  ]

  return (
    <section id="team" className="py-20 relative">
      {/* Eliminamos el fondo con efecto glassmorphism */}

      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-4 gold-text gold-text-lg">{t("team.title")}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </motion.div>

        {/* Panel de cristal - simplificado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={t(member.nameKey)}
              position={t(member.positionKey)}
              description={t(member.descriptionKey)}
              image={member.image}
              delay={member.delay}
              email={member.email}
              slug={member.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
