import { Globe } from "lucide-react"
import ServiceDetail from "@/components/service-detail"
import ContactSection from "@/components/contact-section"
import WebDesignSimulator from "@/components/web-design-simulator"

export default function DisenoWebPage() {
  return (
    <>
      <ServiceDetail
        title="Diseño Web y Promociones"
        description="Creamos sitios web y campañas promocionales que no solo se ven impresionantes sino que convierten visitantes en clientes. Nuestros diseños están optimizados para SEO, velocidad de carga y experiencia de usuario, resultando en un aumento promedio del 65% en conversiones para nuestros clientes del sector retail."
        icon={<Globe className="w-12 h-12 text-white" />}
        image="/placeholder.svg?height=600&width=800"
        color="bg-purple-600"
        features={[
          "Diseño web responsive y accesible para todos los dispositivos",
          "Optimización para motores de búsqueda (SEO)",
          "Integración de e-commerce y pasarelas de pago seguras",
          "Campañas promocionales estacionales y eventos especiales",
          "Análisis de comportamiento del usuario y mejora continua",
          "Contenido bilingüe optimizado para audiencias hispanas",
        ]}
        benefits={[
          "Aumento promedio del 65% en tasas de conversión",
          "Mejora del 45% en posicionamiento en buscadores",
          "Reducción del 60% en tasas de rebote",
          "Experiencia de usuario optimizada para el mercado hispano",
          "Incremento del 70% en tiempo de permanencia en el sitio",
          "Mayor retorno de inversión en campañas promocionales",
        ]}
        ctaText="Transforma tu Presencia Digital"
        simulationComponent={<WebDesignSimulator />}
      />
      <ContactSection />
    </>
  )
}
