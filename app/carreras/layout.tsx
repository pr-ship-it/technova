import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Carreras | TechNova AI",
  description:
    "Únete a nuestro equipo de expertos en inteligencia artificial, marketing digital, ciberseguridad y diseño web.",
}

export default function CarrerasLayout({
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
