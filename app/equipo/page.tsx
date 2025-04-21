import TeamSection from "@/components/team-section"
import ContactSection from "@/components/contact-section"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EquipoPage() {
  return (
    <div className="pt-10">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          <span>Volver a Inicio</span>
        </Link>
      </div>

      <TeamSection />

      <div className="container mx-auto px-4 py-12 mb-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 gold-text">Únete a Nuestro Equipo</h2>
          <p className="text-gray-300 mb-6">
            En TechNova AI estamos siempre buscando talentos apasionados por la tecnología y la innovación. Si
            te interesa formar parte de nuestro equipo, envíanos tu currículum y cuéntanos por qué te gustaría trabajar
            con nosotros.
          </p>
          <Link href="/carreras" className="cta-button inline-block">
            Enviar Currículum
          </Link>
        </div>
      </div>

      <ContactSection />
    </div>
  )
}
