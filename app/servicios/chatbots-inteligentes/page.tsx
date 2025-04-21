import { MessageSquareText } from "lucide-react"
import ServiceDetail from "@/components/service-detail"
import ContactSection from "@/components/contact-section"
import ChatbotSimulator from "@/components/chatbot-simulator"

export default function ChatbotsPage() {
  return (
    <>
      <ServiceDetail
        title="Chatbots Inteligentes"
        description="Automatiza la atención al cliente con chatbots personalizados que entienden el contexto y las necesidades específicas de tus clientes hispanos. Disponibles 24/7, pueden manejar múltiples conversaciones simultáneas, reducir tiempos de espera y aumentar la satisfacción del cliente."
        icon={<MessageSquareText className="w-12 h-12 text-white" />}
        image="/placeholder.svg?height=600&width=800"
        color="bg-blue-600"
        features={[
          "Integración con WhatsApp, Telegram, Facebook Messenger y Discord",
          "Reconocimiento de lenguaje natural en español e inglés",
          "Personalización con tu marca y tono de comunicación",
          "Análisis de sentimiento para detectar clientes insatisfechos",
          "Transferencia inteligente a agentes humanos cuando sea necesario",
          "Aprendizaje continuo basado en interacciones previas",
        ]}
        benefits={[
          "Atención al cliente 24/7 sin costos adicionales de personal",
          "Reducción del 70% en tiempos de espera para consultas frecuentes",
          "Aumento del 85% en la satisfacción del cliente",
          "Capacidad para manejar picos de demanda sin degradación del servicio",
          "Recopilación automática de datos para mejorar productos y servicios",
          "ROI positivo en menos de 6 meses para la mayoría de los negocios",
        ]}
        ctaText="Implementa Chatbots Inteligentes"
        simulationComponent={<ChatbotSimulator />}
      />
      <ContactSection />
    </>
  )
}
