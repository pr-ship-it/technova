import TeamMemberDetail from "@/components/team-member-detail"

export default function AnaMartinezPage() {
  return (
    <TeamMemberDetail
      name="Ana Martínez"
      position="CTO"
      description="Desarrolladora prodigio que programó su primer chatbot a los 16 años. PhD en Inteligencia Artificial de Stanford. Antes de unirse a nosotros, lideró equipos de ingeniería en Amazon."
      longDescription={`Ana Martínez es una brillante ingeniera de software y científica de datos con una pasión por la inteligencia artificial que comenzó a una edad temprana. A los 16 años, desarrolló su primer chatbot funcional para ayudar a estudiantes con tareas de matemáticas, lo que la llevó a obtener una beca completa para estudiar en Stanford.

      Después de completar su doctorado en Inteligencia Artificial con especialización en procesamiento de lenguaje natural, Ana se unió a Amazon donde lideró un equipo de ingenieros trabajando en algoritmos de recomendación y asistentes virtuales. Su trabajo fue fundamental en el desarrollo de sistemas de NLP que podían entender y procesar dialectos latinoamericanos y español conversacional con una precisión sin precedentes.

      En 2019, Ana se unió a TechNova AI como CTO, donde ha revolucionado nuestras capacidades técnicas. Bajo su dirección, hemos desarrollado chatbots con capacidades de comprensión contextual avanzadas y sistemas de análisis de datos que proporcionan insights accionables para nuestros clientes.

      Ana es una defensora de la diversidad en tecnología y regularmente mentora a jóvenes programadoras a través de varios programas de educación STEM.`}
      image="/coding-curly.png"
      email="ana@TechNovaAI.com"
      education={[
        "PhD en Inteligencia Artificial, Stanford University",
        "Maestría en Ciencias de la Computación, Stanford University",
        "Licenciatura en Ingeniería Informática, Universidad de Buenos Aires",
        "Certificación en Deep Learning, DeepLearning.AI",
      ]}
      experience={[
        "Chief Technology Officer, TechNova AI (2019-presente)",
        "Líder de Ingeniería de IA, Amazon (2015-2019)",
        "Investigadora Asociada, Stanford AI Lab (2013-2015)",
        "Desarrolladora de Software, IBM Research (2011-2013)",
      ]}
      achievements={[
        "Premio 'Innovadora del Año' por Women in AI (2022)",
        "Desarrolladora del algoritmo NLP-Español, con un 40% más de precisión para dialectos latinoamericanos",
        "12 publicaciones en conferencias internacionales de IA",
        "Patente en sistemas de detección de sentimiento multilingüe",
      ]}
      languages={["Español (nativo)", "Inglés (fluido)", "Portugués (avanzado)", "Italiano (intermedio)"]}
    />
  )
}
