"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.team": "Reseñas",

    // Hero
    "hero.slogan": "Transforma tu Negocio con Inteligencia Artificial – Soluciones para el Retail Hispano",
    "hero.cta": "¡Contáctanos Hoy!",

    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Soluciones tecnológicas avanzadas para impulsar tu negocio",

    // Chatbots
    "services.chatbots.title": "Chatbots Inteligentes",
    "services.chatbots.description":
      "Automatiza la atención al cliente con chatbots personalizados para WhatsApp, Telegram y Discord. Disponibles 24/7.",
    "services.chatbots.detail.title": "Revoluciona tu Atención al Cliente",
    "services.chatbots.detail.description":
      "Nuestros chatbots utilizan IA avanzada para entender el contexto y las necesidades específicas de tus clientes hispanos. Disponibles 24/7, pueden manejar múltiples conversaciones simultáneas, reducir tiempos de espera y aumentar la satisfacción del cliente en un 85%.",
    "services.chatbots.detail.features":
      "• Integración con WhatsApp, Telegram y Discord\n• Reconocimiento de lenguaje natural en español e inglés\n• Personalización con tu marca y tono de comunicación\n• Análisis de sentimiento para detectar clientes insatisfechos\n• Transferencia inteligente a agentes humanos cuando sea necesario",
    "services.chatbots.detail.cta": "Implementa Chatbots",

    // Marketing
    "services.marketing.title": "Marketing Digital",
    "services.marketing.description":
      "Estrategias de marketing digital enfocadas en la audiencia hispana con un enfoque cultural único. Aumenta tu engagement.",
    "services.marketing.detail.title": "Conecta con la Audiencia Hispana",
    "services.marketing.detail.description":
      "Desarrollamos estrategias de marketing digital que resuenan culturalmente con la comunidad hispana en EE.UU., México y Latinoamérica. Nuestro enfoque combina análisis de datos con conocimiento cultural profundo para crear campañas que generan un 40% más de engagement que el promedio del mercado.",
    "services.marketing.detail.features":
      "• Campañas multicanal (redes sociales, email, SEM)\n• Contenido bilingüe culturalmente relevante\n• Segmentación geográfica y demográfica precisa\n• Análisis de comportamiento del consumidor hispano\n• Optimización continua basada en resultados",
    "services.marketing.detail.cta": "Potencia tu Marketing",

    // Security
    "services.security.title": "Ciberseguridad y Blockchain",
    "services.security.description":
      "Protege tu negocio con soluciones avanzadas de ciberseguridad y tecnología blockchain. Garantiza la integridad de tus datos.",
    "services.security.detail.title": "Protección Digital de Vanguardia",
    "services.security.detail.description":
      "En un mundo donde los ataques cibernéticos aumentan un 300% anualmente, protegemos tu negocio con soluciones de seguridad de nivel empresarial adaptadas a empresas medianas y pequeñas. Nuestra tecnología blockchain garantiza la integridad de tus datos y transacciones con un nivel de seguridad previamente solo disponible para grandes corporaciones.",
    "services.security.detail.features":
      "• Evaluación completa de vulnerabilidades\n• Protección contra ransomware y phishing\n• Autenticación de doble factor y biométrica\n• Contratos inteligentes para transacciones seguras\n• Cumplimiento con regulaciones internacionales",
    "services.security.detail.cta": "Asegura tu Negocio",

    // Design
    "services.design.title": "Diseño Web y Promociones",
    "services.design.description":
      "Diseño web profesional y campañas promocionales digitales para aumentar tu presencia online. Optimizado para conversiones.",
    "services.design.detail.title": "Presencia Digital que Impacta",
    "services.design.detail.description":
      "Creamos sitios web y campañas promocionales que no solo se ven impresionantes sino que convierten visitantes en clientes. Nuestros diseños están optimizados para SEO, velocidad de carga y experiencia de usuario, resultando en un aumento promedio del 65% en conversiones para nuestros clientes del sector retail.",
    "services.design.detail.features":
      "• Diseño web responsive y accesible\n• Optimización para motores de búsqueda (SEO)\n• Integración de e-commerce y pasarelas de pago\n• Campañas promocionales estacionales\n• Análisis de comportamiento del usuario y mejora continua",
    "services.design.detail.cta": "Transforma tu Presencia",

    // About
    "about.title": "Sobre Nosotros",
    "about.description":
      "En TechNova AI nos dedicamos a ayudar a negocios hispanos a modernizarse con tecnología avanzada. Nuestro equipo de expertos combina conocimiento técnico con entendimiento cultural para ofrecer soluciones que realmente funcionan para el mercado hispano.",

    // Testimonials
    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.subtitle":
      "Descubre cómo nuestras soluciones tecnológicas han transformado negocios en el sector retail hispano.",

    // CTA
    "cta.title": "Comienza Tu Transformación Digital",
    "cta.subtitle": "Escanea el Código QR o Visítanos",
    "cta.button": "Contáctanos",

    // Footer
    "footer.rights": "Todos los derechos reservados",
    "footer.contact": "Contacto",
    "footer.follow": "Síguenos",

    // Team
    "team.title": "Nuestro Equipo",
    "team.subtitle": "Conoce a los expertos detrás de TechNova AI",
    "team.backToTeam": "Volver al equipo",

    "team.ceo.name": "Luis H.",
    "team.ceo.position": "CEO & Fundador",
    "team.ceo.description": "Apasionado por los negocios y emprendedor. Con una larga y sólida trayectoria, Luis fundó TechNova con el objetivo de brindar el servicio más completo.",

    "team.cto.name": "Manu C.",
    "team.cto.position": "CTO",
    "team.cto.description": "Fanático de la tecnología, Manu lidera el desarrollo de nuestras soluciones de IA, asegurándose de que sean prácticas y efectivas para nuestros clientes.",

    "team.marketing.name": "Ariel S.",
    "team.marketing.position": "MKT Director",
    "team.marketing.description": "Ariel crea campañas que conectan con la audiencia hispana, usando su conocimiento del mercado para generar impacto real.",

    "team.AI.name": "Pedro P.",
    "team.AI.position": "AI Developer",
    "team.AI.description": "Pedro es el cerebro detrás de nuestros chatbots, trabajando para que entiendan y respondan como un verdadero amigo.",

    "team.web.name": "Ivan C.",
    "team.web.position": "WEB Developer",
    "team.web.description": "Ivan diseña sitios web que son fáciles de usar y atractivos, ayudando a nuestros clientes a destacar en línea.",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.team": "Team",

    // Hero
    "hero.slogan": "Transform Your Business with Artificial Intelligence – Solutions for Hispanic Retail",
    "hero.cta": "Contact Us Today!",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Advanced technological solutions to boost your business",

    // Chatbots
    "services.chatbots.title": "Intelligent Chatbots",
    "services.chatbots.description":
      "Automate customer service with customized chatbots for WhatsApp, Telegram, and Discord. Available 24/7.",
    "services.chatbots.detail.title": "Revolutionize Your Customer Service",
    "services.chatbots.detail.description":
      "Our chatbots use advanced AI to understand the context and specific needs of your Hispanic customers. Available 24/7, they can handle multiple simultaneous conversations, reduce wait times, and increase customer satisfaction by 85%.",
    "services.chatbots.detail.features":
      "• Integration with WhatsApp, Telegram, and Discord\n• Natural language recognition in Spanish and English\n• Customization with your brand and communication tone\n• Sentiment analysis to detect dissatisfied customers\n• Intelligent transfer to human agents when necessary",
    "services.chatbots.detail.cta": "Implement Chatbots",

    // Marketing
    "services.marketing.title": "Digital Marketing",
    "services.marketing.description":
      "Digital marketing strategies focused on the Hispanic audience with a unique cultural approach. Increase your engagement.",
    "services.marketing.detail.title": "Connect with the Hispanic Audience",
    "services.marketing.detail.description":
      "We develop digital marketing strategies that culturally resonate with the Hispanic community in the US, Mexico, and Latin America. Our approach combines data analysis with deep cultural knowledge to create campaigns that generate 40% more engagement than the market average.",
    "services.marketing.detail.features":
      "• Multichannel campaigns (social media, email, SEM)\n• Culturally relevant bilingual content\n• Precise geographic and demographic segmentation\n• Hispanic consumer behavior analysis\n• Continuous optimization based on results",
    "services.marketing.detail.cta": "Boost Your Marketing",

    // Security
    "services.security.title": "Cybersecurity & Blockchain",
    "services.security.description":
      "Protect your business with advanced cybersecurity solutions and blockchain technology. Ensure data integrity.",
    "services.security.detail.title": "Cutting-Edge Digital Protection",
    "services.security.detail.description":
      "In a world where cyber attacks increase by 300% annually, we protect your business with enterprise-level security solutions adapted for medium and small businesses. Our blockchain technology ensures the integrity of your data and transactions with a level of security previously only available to large corporations.",
    "services.security.detail.features":
      "• Comprehensive vulnerability assessment\n• Protection against ransomware and phishing\n• Two-factor and biometric authentication\n• Smart contracts for secure transactions\n• Compliance with international regulations",
    "services.security.detail.cta": "Secure Your Business",

    // Design
    "services.design.title": "Web Design & Promotions",
    "services.design.description":
      "Professional web design and digital promotional campaigns to increase your online presence. Optimized for conversions.",
    "services.design.detail.title": "Digital Presence that Impacts",
    "services.design.detail.description":
      "We create websites and promotional campaigns that not only look impressive but convert visitors into customers. Our designs are optimized for SEO, loading speed, and user experience, resulting in an average 65% increase in conversions for our retail sector clients.",
    "services.design.detail.features":
      "• Responsive and accessible web design\n• Search engine optimization (SEO)\n• E-commerce and payment gateway integration\n• Seasonal promotional campaigns\n• User behavior analysis and continuous improvement",
    "services.design.detail.cta": "Transform Your Presence",

    // About
    "about.title": "About Us",
    "about.description":
      "At TechNova AI, we are dedicated to helping Hispanic businesses modernize with advanced technology. Our team of experts combines technical knowledge with cultural understanding to deliver solutions that truly work for the Hispanic market.",

    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle":
      "Discover how our technological solutions have transformed businesses in the Hispanic retail sector.",

    // CTA
    "cta.title": "Start Your Digital Transformation",
    "cta.subtitle": "Scan the QR Code or Visit Us",
    "cta.button": "Contact Us",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.contact": "Contact",
    "footer.follow": "Follow Us",

    // Team
    "team.title": "Our Team",
    "team.subtitle": "Meet the experts behind TechNova AI",
    "team.backToTeam": "Back to team",

    "team.ceo.name": "Luis H.",
    "team.ceo.position": "CEO & Founder",
    "team.ceo.description": "Business enthusiast and entrepreneur. With years of experience, Luis started TechNova to offer top-notch services.",

    "team.cto.name": "Manu C.",
    "team.cto.position": "CTO",
    "team.cto.description": "Tech lover, Manu leads the creation of our AI solutions, making sure they’re practical and effective for our clients.",

    "team.marketing.name": "Ariel S.",
    "team.marketing.position": "Marketing Director",
    "team.marketing.description": "Ariel builds campaigns that click with Hispanic audiences, using market know-how to make a real impact.",

    "team.AI.name": "Pedro P.",
    "team.AI.position": "AI Developer",
    "team.AI.description": "Pedro is the mastermind behind our chatbots, working to make them understand and respond like a true friend.",

    "team.web.name": "Ivan C.",
    "team.web.position": "WEB Developer",
    "team.web.description": "Ivan crafts user-friendly and eye-catching websites, helping our clients shine online.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
