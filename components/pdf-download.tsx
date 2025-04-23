"use client"

import { useRef } from "react"
import type { Partner, Signature } from "@/types/contract"
import { jsPDF } from "jspdf"
import { Download } from "lucide-react"

interface PDFDownloadProps {
  partners: Partner[]
  signatures: Signature[]
  contractDate: Date
}

export function PDFDownload({ partners, signatures, contractDate }: PDFDownloadProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!contentRef.current) return

    try {
      const pdf = new jsPDF("p", "mm", "a4")

      // Título
      pdf.setFontSize(22)
      pdf.setTextColor(50, 50, 150)
      pdf.text("TechNova AI", 105, 20, { align: "center" })

      pdf.setFontSize(16)
      pdf.setTextColor(0, 0, 0)
      pdf.text("Contrato de servicio", 105, 30, { align: "center" })

      // Fecha
      const formattedDate = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(contractDate)

      pdf.setFontSize(12)
      pdf.text(`Fecha: ${formattedDate}`, 105, 40, { align: "center" })

      // Socios
      pdf.setFontSize(14)
      pdf.text("Socios:", 20, 55)

      pdf.setFontSize(12)
      partners.forEach((partner, index) => {
        pdf.text(`${partner.name}`, 25, 65 + index * 8)
      })

      // Contenido del contrato (simplificado)
      pdf.setFontSize(14)
      pdf.text("Cláusulas del Contrato:", 20, 115)

      pdf.setFontSize(12)
      const clauses = [
        "1. Objetivo: Desarrollo y comercialización de soluciones de IA.",
        "2. Funciones: Cada socio tiene responsabilidades específicas según su rol.",
        "3. Distribución: 20% reserva para la empresa, 80% entre socios.",
        "   - Luis (30%), Ariel (20%), Iván (20%), Pedro (15%), Manu (15%).",
        "4. Obligaciones: Confidencialidad, no competencia, asistencia a reuniones.",
        "5. Duración: 5 años renovables automáticamente.",
      ]

      clauses.forEach((clause, index) => {
        pdf.text(clause, 25, 125 + index * 8)
      })

      // Reserva de la empresa
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 150)
      pdf.text("Reserva para la Empresa (20%):", 20, 175)

      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text("Todos los socios han aceptado destinar el 20% de las ganancias totales", 25, 185)
      pdf.text("como reserva para la empresa, que será utilizada en campañas de marketing,", 25, 192)
      pdf.text("recursos y otras necesidades operativas y de crecimiento.", 25, 199)

      // Firmas
      pdf.setFontSize(14)
      pdf.text("Firmas:", 20, 215)

      pdf.setFontSize(12)
      signatures.forEach((signature, index) => {
        const signDate = new Date(signature.timestamp).toLocaleString("es-ES")
        pdf.text(`${signature.partnerName} - Firmado el: ${signDate}`, 25, 225 + index * 8)
      })

      // Pie de página
      pdf.setFontSize(10)
      pdf.text("TechNova AI – Contrato v1.0", 105, 280, { align: "center" })

      // Guardar PDF
      pdf.save("Contrato_TechNova_AI.pdf")
    } catch (error) {
      console.error("Error al generar PDF:", error)
      alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.")
    }
  }

  return (
    <>
      <div ref={contentRef} className="hidden">
        {/* Contenido para renderizar en el PDF */}
      </div>

      <button
        onClick={generatePDF}
        className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 rounded-md transition-all duration-300 text-blue-950 font-medium flex items-center"
      >
        <Download size={18} className="mr-2" />📄 Descargar Contrato en PDF
      </button>
    </>
  )
}
