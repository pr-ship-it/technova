import TeamMemberDetail from "@/components/team-member-detail"

export default function MiguelSanchezPage() {
  return (
    <TeamMemberDetail
      name="Miguel Sánchez"
      position="Director de Marketing"
      description="Estratega digital con MBA de ESADE. Pionero en marketing multicultural, desarrolló campañas virales para Nike y Coca-Cola en mercados hispanos."
      longDescription={`Miguel Sánchez es un innovador en el campo del marketing digital con una especialización única en mercados hispanos. Con un MBA de ESADE Business School y una licenciatura en Comunicación, Miguel ha combinado su formación académica con un profundo entendimiento cultural para revolucionar cómo las marcas se conectan con audiencias hispanas.

      Antes de unirse a TechNova AI, Miguel trabajó en agencias de publicidad de primer nivel donde lideró campañas digitales para marcas globales como Nike, Coca-Cola y Samsung, enfocándose específicamente en mercados hispanos en Estados Unidos y Latinoamérica. Sus campañas se destacaron por su autenticidad cultural y resultados excepcionales, generando un 40% más de engagement que las campañas tradicionales.

      En 2020, Miguel se unió a nuestro equipo como Director de Marketing, donde ha implementado estrategias innovadoras que combinan análisis de datos con insights culturales. Su enfoque ha permitido a nuestros clientes conectar genuinamente con consumidores hispanos, resultando en campañas que no solo aumentan las ventas sino que construyen lealtad de marca a largo plazo.

      Miguel es conocido por su habilidad para identificar tendencias emergentes en el comportamiento del consumidor latino y traducirlas en estrategias de marketing efectivas y culturalmente relevantes.`}
      image="/confident-hispanic-marketer.png"
      email="miguel@TechNovaAI.com"
      education={[
        "MBA con especialización en Marketing Digital, ESADE Business School",
        "Licenciatura en Comunicación, Universidad Iberoamericana",
        "Certificación en Análisis de Datos para Marketing, Google",
        "Diplomado en Comportamiento del Consumidor, Northwestern University",
      ]}
      experience={[
        "Director de Marketing, TechNova AI (2020-presente)",
        "Director de Estrategia Multicultural, Ogilvy (2016-2020)",
        "Gerente de Marketing Digital, Unilever (2013-2016)",
        "Consultor de Marketing, Deloitte Digital (2010-2013)",
      ]}
      achievements={[
        "Premio Effie por Excelencia en Marketing Multicultural (2019)",
        "Campaña 'Raíces Digitales' para Nike: 300% ROI y 5M+ interacciones",
        "Desarrollo del framework 'Cultural Digital Engagement' adoptado por múltiples agencias",
        "Ponente principal en el Hispanic Marketing Forum durante 3 años consecutivos",
      ]}
      languages={["Español (nativo)", "Inglés (fluido)", "Portugués (intermedio)", "Francés (básico)"]}
    />
  )
}
