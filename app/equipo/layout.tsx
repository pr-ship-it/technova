import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Equipo | TechNova AI",
  description:
    "Conoce al equipo de expertos detrás de TechNova AI, especialistas en inteligencia artificial, marketing digital, ciberseguridad y diseño web.",
}

export default function EquipoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-20">{children}</main>
      <Footer />
    </>
  )
}
