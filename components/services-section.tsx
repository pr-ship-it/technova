"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { MessageSquareText, TrendingUp, ShieldCheck, Globe, ChevronDown, ChevronUp } from "lucide-react"
import ServiceCard from "./service-card"
import { useState } from "react"
import FeaturedAIService from "./featured-ai-service"

export default function ServicesSection() {
  const { t } = useLanguage()
  const [areAllExpanded, setAreAllExpanded] = useState(false)

  const toggleAllExpanded = () => {
    setAreAllExpanded(!areAllExpanded)
  }

  const services = [
    {
      icon: <MessageSquareText className="w-12 h-12 text-blue-500" />,
      titleKey: "services.chatbots.title",
      descriptionKey: "services.chatbots.description",
      detailTitleKey: "services.chatbots.detail.title",
      detailDescriptionKey: "services.chatbots.detail.description",
      detailFeaturesKey: "services.chatbots.detail.features",
      detailCtaKey: "services.chatbots.detail.cta",
      delay: 0.1,
      slug: "chatbots-inteligentes",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      titleKey: "services.marketing.title",
      descriptionKey: "services.marketing.description",
      detailTitleKey: "services.marketing.detail.title",
      detailDescriptionKey: "services.marketing.detail.description",
      detailFeaturesKey: "services.marketing.detail.features",
      detailCtaKey: "services.marketing.detail.cta",
      delay: 0.2,
      slug: "marketing-digital",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-yellow-500" />,
      titleKey: "services.security.title",
      descriptionKey: "services.security.description",
      detailTitleKey: "services.security.detail.title",
      detailDescriptionKey: "services.security.detail.description",
      detailFeaturesKey: "services.security.detail.features",
      detailCtaKey: "services.security.detail.cta",
      delay: 0.3,
      slug: "ciberseguridad-blockchain",
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-500" />,
      titleKey: "services.design.title",
      descriptionKey: "services.design.description",
      detailTitleKey: "services.design.detail.title",
      detailDescriptionKey: "services.design.detail.description",
      detailFeaturesKey: "services.design.detail.features",
      detailCtaKey: "services.design.detail.cta",
      delay: 0.4,
      slug: "diseno-web",
    },
  ]

  return (
    <section id="services" className="py-20 relative z-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-4 gold-text gold-text-lg">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </motion.div>

        {/* Servicio Principal Destacado */}
        <FeaturedAIService />

        <div className="text-center mb-8">
          <button
            onClick={toggleAllExpanded}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/40 transition-colors duration-300 font-medium"
          >
            <span className="mr-2">{areAllExpanded ? "Ver menos en todos" : "Ver más en todos"}</span>
            {areAllExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative max-w-7xl mx-auto" >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descriptionKey)}
              detailTitleKey={service.detailTitleKey}
              detailDescriptionKey={service.detailDescriptionKey}
              detailFeaturesKey={service.detailFeaturesKey}
              detailCtaKey={service.detailCtaKey}
              delay={service.delay}
              slug={service.slug}
              isExpanded={areAllExpanded}
              toggleExpand={toggleAllExpanded}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

