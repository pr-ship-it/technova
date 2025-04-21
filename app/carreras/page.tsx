import CareerForm from "@/components/career-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CarrerasPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/equipo" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          <span>Volver al Equipo</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold mb-4 gold-text">Únete a Nuestro Equipo</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos buscando talentos apasionados por la tecnología y la innovación. Completa el siguiente formulario
            para aplicar a nuestro equipo.
          </p>
        </div>

        <CareerForm />
      </div>
    </div>
  )
}
