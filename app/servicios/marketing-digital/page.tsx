import { TrendingUp } from "lucide-react"
import ServiceDetail from "@/components/service-detail"
import ContactSection from "@/components/contact-section"
import MarketingSimulator from "@/components/marketing-simulator"

export default function MarketingDigitalPage() {
  return (
    <>
      <ServiceDetail
        title="Marketing Digital"
        description="Desarrollamos estrategias de marketing digital que resuenan culturalmente con la comunidad hispana en EE.UU., México y Latinoamérica. Nuestro enfoque combina análisis de datos con conocimiento cultural profundo para crear campañas que generan un 40% más de engagement que el promedio del mercado."
        icon={<TrendingUp className="w-12 h-12 text-white" />}
        image="/placeholder.svg?height=600&width=800"
        color="bg-green-600"
        features={[
          "Campañas multicanal (redes sociales, email, SEM, display)",
          "Contenido bilingüe culturalmente relevante",
          "Segmentación geográfica y demográfica precisa",
          "Análisis de comportamiento del consumidor hispano",
          "Optimización continua basada en resultados",
          "Estrategias de remarketing y fidelización",
        ]}
        benefits={[
          "Aumento del 40% en engagement comparado con campañas genéricas",
          "Incremento del 35% en conversiones para el mercado hispano",
          "Mejor retorno de inversión publicitaria (ROAS)",
          "Construcción de relaciones duraderas con clientes hispanos",
          "Posicionamiento como marca culturalmente consciente",
          "Expansión efectiva a nuevos mercados hispanos",
        ]}
        ctaText="Potencia tu Marketing Digital"
        simulationComponent={<MarketingSimulator />}
      />
      <ContactSection />
    </>
  )
}
