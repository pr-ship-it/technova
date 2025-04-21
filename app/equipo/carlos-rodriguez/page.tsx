import TeamMemberDetail from "@/components/team-member-detail"

export default function LuisRodriguezPage() {
  return (
    <TeamMemberDetail
      name="Luis H."
      position="CEO & Fundador"
      description="Ex-ingeniero de Google con maestría del MIT. Fundó TechNova AI tras identificar la brecha tecnológica en el mercado hispano. Ha liderado proyectos de IA para Fortune 500 y startups en Silicon Valley."
      longDescription={`Luis es un visionario tecnológico con más de 15 años de experiencia en el desarrollo e implementación de soluciones de inteligencia artificial.
      Bajo su liderazgo, TechNova AI ha crecido hasta convertirse en un referente en soluciones tecnológicas para empresas hispanas, ayudando a más de 200 negocios a transformar digitalmente sus operaciones y aumentar su competitividad en el mercado global.
      Luis es un orador frecuente en conferencias tecnológicas y ha sido reconocido por su trabajo en la inclusión digital y la innovación tecnológica para comunidades subrepresentadas.`}
      image="https://i.ibb.co/mFzC6yDg/Imagen-de-Whats-App-2025-04-21-a-las-15-42-14-58234dd9.jpg"
      email="Luis@TechNovaAI.com"
      education={[
        "Ciencias de la Computación, MIT",
      
      ]}
      experience={[
        "Fundador y CEO, TechNova AI (2018-presente)",
        "Ingeniero Senior de IA, RedLabels (2012-2018)",
     
      ]}
      achievements={[
        "5 patentes en algoritmos de procesamiento de lenguaje natural",

      ]}
      languages={["Español (nativo)", "Inglés (fluido)"]}
    />
  )
}
