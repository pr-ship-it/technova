import TeamMemberDetail from "@/components/team-member-detail"

export default function IvanGo() {
  return (
    <TeamMemberDetail
      name="Ivan G"
      position="Jefe de Desarrollo"
      description="Ex-consultora de seguridad para el gobierno de EE.UU. y certificada en CISSP, CEH y blockchain. Especializada en protección de datos para retail y fintech."
      longDescription={`Ivan es un experto en ciberseguridad y desarrollo. Su carrera comenzó en el sector público, donde trabajó como consultor de seguridad para agencias., desarrollando protocolos de protección contra amenazas cibernéticas avanzadas.

      Con certificaciones de alto nivel como CISSP (Certified Information Systems Security Professional), CEH (Certified Ethical Hacker) y especialización en tecnología blockchain, Ivan h desarrollado un enfoque integral hacia la seguridad que combina medidas preventivas con capacidades de respuesta rápida ante incidentes.

      Antes de unirse a TechNova AI en 2019,  implementó soluciones de protección de datos que redujeron las vulnerabilidades en un 85% y estableció protocolos que fueron adoptados como estándares en la industria.

      En nuestra empresa, Ivan ha desarrollado una suite de soluciones de ciberseguridad específicamente diseñadas para negocios hispanos, considerando sus necesidades particulares y entornos operativos. Su filosofía es que la seguridad robusta no debe ser un lujo exclusivo de grandes corporaciones, sino un derecho fundamental para todos los negocios.`}
      image="https://i.ibb.co/v6BbP9RG/Chat-GPT-Image-21-abr-2025-03-35-07-p-m.png"
      email="Ivan@technova.com"
      education={[
        "Maestría en Seguridad Informática, Georgia Tech",
        "Licenciatura en Ingeniería de Sistemas, Universidad Nacional Autónoma de México",
        "Certificación CISSP (Certified Information Systems Security Professional)",
        "Certificación CEH (Certified Ethical Hacker)",
        "Certificación en Tecnología Blockchain, MIT",
      ]}
      experience={[
        "Jefe de Ciberseguridad, TechNova AI (2019-presente)",
        "Director de Seguridad de la Información, Banco Santander (2015-2019)",
       
      ]}
      achievements={[
        "Desarrolló el protocolo 'SecureRetail' adoptado por más de 50 empresas internacionales",
        "Frustró más de 200 intentos de ciberataques de alto perfil",
        "Premio a la Excelencia en Ciberseguridad, Asociación Internacional de Profesionales de Seguridad",
       
      ]}
      languages={["Español (nativo)", "Inglés (fluido)"]}
    />
  )
}
