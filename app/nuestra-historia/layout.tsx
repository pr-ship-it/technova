import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuestra Historia | TechNova AI",
  description:
    "Descubre cómo TechNova AI pasó de ser una idea en un pequeño apartamento a convertirse en un referente tecnológico para el mercado hispano en solo cinco años.",
}

export default function NuestraHistoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
