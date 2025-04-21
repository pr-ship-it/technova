import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function GraciasPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-4xl font-orbitron font-bold mb-6 gold-text">¡Gracias por tu solicitud!</h1>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800 mb-8">
          <p className="text-xl text-gray-300 mb-6">
            Hemos recibido tu información correctamente. Nuestro equipo de recursos humanos revisará tu perfil y se
            pondrá en contacto contigo si hay una coincidencia con nuestras necesidades actuales.
          </p>

          <p className="text-gray-400">
            Mientras tanto, te invitamos a conocer más sobre nuestra empresa y los servicios que ofrecemos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="cta-button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>

          <Link href="/equipo" className="cta-button-gold">
            Conoce a Nuestro Equipo
          </Link>
        </div>
      </div>
    </div>
  )
}
