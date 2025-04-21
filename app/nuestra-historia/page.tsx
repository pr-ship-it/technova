import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OurJourney from "@/components/our-journey"
import ContactSection from "@/components/contact-section"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NuestraHistoriaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Volver a Inicio</span>
          </Link>

          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gold-text">
              De Un Sueño a Una Realidad: Nuestra Historia
            </h1>
            <p className="text-xl text-gray-300">
              Descubre cómo TechNova AI pasó de ser una idea en un pequeño apartamento a convertirse en un
              referente tecnológico para el mercado hispano en solo cinco años.
            </p>
          </div>
        </div>

        <OurJourney />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
