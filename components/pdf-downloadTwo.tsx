"use client"

import { useRef } from "react"
import type { Partner, Signature } from "@/types/contract"
import { jsPDF } from "jspdf"
import { Download } from "lucide-react"

interface PDFDownloadProps {
  contractDate: Date
  partners: Partner[]
  signatures: Signature[]
}

export function PDFDownloadTwo({ contractDate, partners, signatures }: PDFDownloadProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!contentRef.current) return

    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15 // Padding lateral
      const lineHeight = 8
      let yPosition = 20 // Posición vertical inicial

      // Encabezado
      pdf.setFillColor(30, 58, 138) // Azul oscuro
      pdf.rect(0, 0, pageWidth, 40, "F") // Altura 40 mm para centrado
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(24)
      pdf.setTextColor(255, 204, 0) // Dorado
      pdf.text("TechNova AI", pageWidth / 2, 15, { align: "center" })
      pdf.setFontSize(16)
      pdf.setTextColor(255, 255, 255) // Blanco
      pdf.text("Contrato de Servicio", pageWidth / 2, 25, { align: "center" })
      yPosition = 45 // Ajustar yPosition después del encabezado

      // Línea separadora
      pdf.setDrawColor(255, 204, 0)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Fecha
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      const formattedDate = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(contractDate)
      pdf.text(`Fecha: ${formattedDate}`, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 15

      // Socios
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Involucrados:", margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      partners.forEach((partner) => {
        pdf.text(
          `${partner.name}${partner.signed ? " (Firmado)" : " (Pendiente)"}`,
          margin + 5,
          yPosition
        )
        yPosition += lineHeight
      })
      yPosition += 10

      // Cláusulas del contrato
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Cláusulas del Servicio:", margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      const clauses = [
        "1. Bot que envía a los clientes del grupo en Telegram la cotización de USDT para el mercado P2P, encargado de tomar su orden y avisarle a un moderador para finalizar la transacción.",
        "2. Tiempo máximo de entrega: 14 días.",
        "3. Pago del servicio en la billetera RED TRON: TJetmQE1b3vxMnnSkbHUGpRgS7oVFC5Dje",
      ]

      clauses.forEach((clause) => {
        const lines = pdf.splitTextToSize(clause, pageWidth - margin * 2)
        lines.forEach((line: string) => {
          pdf.text(line, margin + 5, yPosition)
          yPosition += lineHeight
        })
      })
      yPosition += 10

      // Firmas autorizadas (TechNova AI y Beyouyo)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Firmas Autorizadas:", margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      // Fecha actual menos 1 hora
      const now = new Date()
      now.setHours(now.getHours() - 1)
      const signDate = now.toLocaleString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      // Firma de TechNova AI
      pdf.text(`TechNova AI - Firmado el: ${signDate}`, margin + 5, yPosition)
      yPosition += lineHeight
      // Firma de Beyouyo
      pdf.text(`Beyouyo - Firmado el: ${signDate}`, margin + 5, yPosition)
      yPosition += lineHeight

      // Pie de página
      pdf.setDrawColor(255, 204, 0)
      pdf.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20)
      pdf.setFont("helvetica", "italic")
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text("TechNova AI – Contrato v1.0", pageWidth / 2, pageHeight - 10, { align: "center" })

      // Guardar PDF
      pdf.save("Contrato_TechNova_AI.pdf")
    } catch (error) {
      console.error("Error al generar PDF:", error)
      alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.")
    }
  }

  // Verificar si todos los socios han firmado
  const allSigned = partners.every((partner) => partner.signed)

  return (
    <>
      <div ref={contentRef} className="hidden">
        {/* Contenido para renderizar en el PDF (vacío, ya que usamos jsPDF directamente) */}
      </div>

      <button
        onClick={generatePDF}
        disabled={!allSigned}
        className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center ${
          allSigned
            ? "bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-blue-950"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Download size={18} className="mr-2" />📄 Descargar Contrato en PDF
      </button>
    </>
  )
}