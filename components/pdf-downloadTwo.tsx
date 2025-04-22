"use client"

import { useRef } from "react"
import type { Partner, Signature } from "@/types/contract"
import { jsPDF } from "jspdf"
import { Download } from "lucide-react"

interface PDFDownloadProps {
  contractDate: Date
}

export function PDFDownloadTwo({ contractDate }: PDFDownloadProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Socios definidos manualmente
  const partners: Partner[] = [
    { id: 1, name: "TechNova AI", signed: true, created_at: "2023-10-01T12:00:00Z" },
    { id: 2, name: "Beyouyo", signed: true,  created_at: "2023-10-01T12:00:00Z" },
  
  ]

  // Firmas definidas manualmente
  const signatures: Signature[] = [
    { id: 1, partner_id: 1, partner_name: "TechNova AI",  created_at: "2023-10-01T12:00:00Z" },
    { id: 2, partner_id: 2, partner_name: "Beyouyo",  created_at: "2023-10-02T14:30:00Z" },

  ]

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
      pdf.text("Involucrados:", 20, 55)

      pdf.setFontSize(12)
      partners.forEach((partner, index) => {
        pdf.text(`${partner.name}${partner.signed ? " (Firmado)" : ""}`, 25, 65 + index * 8)
      })

      // Contenido del contrato
      pdf.setFontSize(14)
      pdf.text("Cláusulas del Servicio:", 20, 115)

      pdf.setFontSize(12)
      const clauses = [
        "1. Bot que envía a los clientes del grupo en Telegram la cotización de USDT para el mercado P2P, encargado de tomar su orden y avisarle a un moderador para finalizar la transacción.",
        "2. Tiempo maximo de entrega 14 dias.",
        "3. Pago del servicio en la billetera RED TRON  TJetmQE1b3vxMnnSkbHUGpRgS7oVFC5Dje",
      
      ]

      clauses.forEach((clause, index) => {
        pdf.text(clause, 25, 125 + index * 8)
      })

      
      

      // Firmas
      pdf.setFontSize(14)
      pdf.text("Firmas: Technova AI", 20, 215)

      pdf.setFontSize(12)
      signatures.forEach((signature, index) => {
        const signDate = new Date(signature.signature_date).toLocaleString("es-ES")
        pdf.text(`${signature.partner_name}`, 25, 225 + index * 8)
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
        {/* Contenido para renderizar en el PDF (vacío, ya que usamos jsPDF directamente) */}
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