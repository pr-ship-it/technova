import { Brain } from "lucide-react"
import ServiceDetail from "@/components/service-detail"
import ContactSection from "@/components/contact-section"
import AIEnterpriseSimulator from "@/components/ai-enterprise-simulator"

export default function AIEnterprisePage() {
  return (
    <>
      <ServiceDetail
        title="Inteligencia Artificial Empresarial"
        description="Revolucionamos la forma en que las empresas operan mediante soluciones de IA avanzada que automatizan procesos, optimizan recursos y potencian la toma de decisiones estratégicas. Nuestros sistemas de IA empresarial aprenden y evolucionan continuamente, adaptándose a las necesidades cambiantes de tu negocio para mantenerte a la vanguardia de tu industria con un ROI promedio del 300%."
        icon={<Brain className="w-12 h-12 text-white" />}
        image="/interconnected-ai-workflows.png"
        color="bg-blue-600"
        features={[
          "Automatización inteligente de procesos empresariales",
          "Análisis predictivo con precisión superior al 94%",
          "Asistentes virtuales corporativos personalizados",
          "Optimización de recursos mediante aprendizaje automático",
          "Sistemas de recomendación para toma de decisiones",
          "Integración con plataformas empresariales existentes",
        ]}
        benefits={[
          "Reducción de costos operativos hasta un 70%",
          "Aumento de productividad en un 45% promedio",
          "Mejora en la precisión de pronósticos comerciales",
          "Identificación temprana de oportunidades de mercado",
          "Personalización avanzada de experiencias de cliente",
          "Escalabilidad inmediata sin costos adicionales significativos",
        ]}
        ctaText="Implementar IA Empresarial"
        simulationComponent={<AIEnterpriseSimulator />}
      />
      <ContactSection />
    </>
  )
}
