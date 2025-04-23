"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { Mail, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TeamMemberProps {
  name: string
  position: string
  description: string
  image: string
  delay: number
  email: string
  slug: string
  onClick: () => void
}

const TeamMember = ({ name, position, description, image, delay, email, slug, onClick }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,112,243,0.3)] text-center">
        {/* Imagen redonda con clic */}
        <div className="block mb-4 relative">
          <div
            onClick={onClick}
            className="relative mx-auto w-32 h-32 overflow-hidden rounded-full border-2 border-blue-500/30 group-hover:border-blue-500/70 transition-colors duration-300 cursor-pointer"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay con flecha al hacer hover */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Información básica */}
        <div className="block">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-blue-300 font-medium mb-3">{position}</p>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">{description}</p>
        </div>

        {/* Email de contacto */}
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
  const [selectedMember, setSelectedMember] = useState<TeamMemberProps | null>(null)

  const teamMembers = [
    {
      nameKey: "team.ceo.name",
      positionKey: "team.ceo.position",
      descriptionKey: "team.ceo.description",
      image: "https://i.ibb.co/mFzC6yDg/Imagen-de-Whats-App-2025-04-21-a-las-15-42-14-58234dd9.jpg",
      delay: 0.1,
      email: "luis@TechNova.com",
      slug: "Luis H.",
    },
    {
      nameKey: "team.marketing.name",
      positionKey: "team.marketing.position",
      descriptionKey: "team.marketing.description",
      image: "https://i.ibb.co/p6WdYvpS/ar.jpg",
      delay: 0.3,
      email: "miguel@TechNova.com",
      slug: "Ariel D",
    },
    {
      nameKey: "team.web.name",
      positionKey: "team.web.position",
      descriptionKey: "team.web.description",
      image: "https://i.ibb.co/v6BbP9RG/Chat-GPT-Image-21-abr-2025-03-35-07-p-m.png",
      delay: 0.4,
      email: "web@TechNova.com",
      slug: "Ivan G",
    },
    {
      nameKey: "team.AI.name",
      positionKey: "team.AI.position",
      descriptionKey: "team.AI.description",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745436600/pedro_jo_yj7otc.jpg",
      delay: 0.4,
      email: "Ai@TechNova.com",
      slug: "Pedro C",
    },
    {
      nameKey: "team.cto.name",
      positionKey: "team.cto.position",
      descriptionKey: "team.cto.description",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745338191/ia_w7tmdf.jpg",
      delay: 0.4,
      email: "Tech@TechNova.com",
      slug: "Manu",
    },
  ]

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-5 gold-text gold-text-lg">
            {t("team.title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
              onClick={() =>
                setSelectedMember({
                  name: t(member.nameKey),
                  position: t(member.positionKey),
                  description: t(member.descriptionKey),
                  image: member.image,
                  delay: member.delay,
                  email: member.email,
                  slug: member.slug,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent
          className="bg-[#121A29] text-white border border-gold-500 rounded-xl max-w-md md:max-w-lg p-6 sm:p-8"
       
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-exo2 font-bold text-gold-400 flex items-center justify-between">
              {selectedMember?.name}
          
            </DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Imagen */}
              <div className="flex justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gold-500/50">
                  <img
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Información */}
              <div className="text-center space-y-3">
                <p className="text-blue-300 font-medium text-lg">{selectedMember.position}</p>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {selectedMember.description}
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
                  >
                    {selectedMember.email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}