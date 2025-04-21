import { ShieldCheck } from "lucide-react"
import ServiceDetail from "@/components/service-detail"
import ContactSection from "@/components/contact-section"
import SecuritySimulator from "@/components/security-simulator"

export default function CiberseguridadPage() {
  return (
    <>
      <ServiceDetail
        title="Ciberseguridad y Blockchain"
        description="En un mundo donde los ataques cibernéticos aumentan un 300% anualmente, protegemos tu negocio con soluciones de seguridad de nivel empresarial adaptadas a empresas medianas y pequeñas. Nuestra tecnología blockchain garantiza la integridad de tus datos y transacciones con un nivel de seguridad previamente solo disponible para grandes corporaciones."
        icon={<ShieldCheck className="w-12 h-12 text-white" />}
        image="/placeholder.svg?height=600&width=800"
        color="bg-yellow-600"
        features={[
          "Evaluación completa de vulnerabilidades y amenazas",
          "Protección contra ransomware, malware y phishing",
          "Autenticación de doble factor y biométrica",
          "Contratos inteligentes para transacciones seguras",
          "Cumplimiento con regulaciones internacionales",
          "Monitoreo continuo y respuesta a incidentes",
        ]}
        benefits={[
          "Reducción del 95% en riesgo de brechas de seguridad",
          "Protección de datos sensibles de clientes y operaciones",
          "Transacciones verificables e inmutables con blockchain",
          "Cumplimiento con normativas de protección de datos",
          "Continuidad del negocio ante amenazas cibernéticas",
          "Confianza incrementada de clientes y socios comerciales",
        ]}
        ctaText="Asegura tu Negocio"
        simulationComponent={<SecuritySimulator />}
      />
      <ContactSection />
    </>
  )
}
