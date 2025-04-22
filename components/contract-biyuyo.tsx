"use client"

import { useState } from "react"
import type { Partner } from "@/types/contract"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button" // Asumiendo que usas el componente Button de Shadcn

interface ContractContentProps {
  partners: Partner[]
  signingPartners?: Partner[]
}

export function ContractContent({ partners, signingPartners }: ContractContentProps) {
  // Estado local para manejar los socios y simular cambios
  const [displayPartners, setDisplayPartners] = useState(signingPartners ?? partners)

  // Función para simular la firma de un socio
  const handleSign = (partnerId: number) => {
    setDisplayPartners(prev =>
      prev.map(partner =>
        partner.id === partnerId
          ? {
              ...partner,
              signed: true,
              signature_date: new Date().toISOString(), // Simula la fecha de firma
            }
          : partner
      )
    )
  }

  const firstThreePartners = displayPartners.slice(0, 3)
  const lastTwoPartners = displayPartners.slice(3)

  return (
    <div className="space-y-8">
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Socios</h3>

        {/* Primera fila: primeros 3 socios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {firstThreePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-blue-950/50 rounded-lg p-4 border border-blue-800 hover:border-gold-500 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-3 border-2 border-gold-400">
                <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
              </div>
              <h4 className="text-lg font-medium mb-1">{partner.name}</h4>
              {partner.signed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700 mt-2">
                  ✓ Firmado
                </span>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-700">
                    Pendiente
                  </span>
                  <Button
                    onClick={() => handleSign(partner.id)}
                    className="bg-gold-500 hover:bg-gold-600 text-black font-medium px-4 py-1 rounded-full"
                  >
                    Firmar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Segunda fila: últimos 2 socios centrados */}
        <div className="flex justify-center gap-4 sm:gap-8">
          {lastTwoPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-blue-950/50 rounded-lg p-4 border border-blue-800 hover:border-gold-500 transition-all duration-300 flex flex-col items-center text-center w-full sm:w-1/3"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-3 border-2 border-gold-400">
                <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
              </div>
              <h4 className="text-lg font-medium mb-1">{partner.name}</h4>
              {partner.signed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700 mt-2">
                  ✓ Firmado
                </span>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-700">
                    Pendiente
                  </span>
                  <Button
                    onClick={() => handleSign(partner.id)}
                    className="bg-gold-500 hover:bg-gold-600 text-black font-medium px-4 py-1 rounded-full"
                  >
                    Firmar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="objetivo">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">1. Servicio prestado</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>Servicio de BOT para telegram.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="funciones">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">2. Detalle</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>El servicio incluirá lo siguiente:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Bot que envía a los clientes del grupo en Telegram la cotización de USDT para el mercado P2P,
                encargado de tomar su orden y avisarle a un moderador para finalizar la transacción.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duracion">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">3. Tiempo de entrega</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                El tiempo de entrega pactado es de 2 semanas a partir de la fecha 20/04 teniendo fecha para finalizar el mismo para el día 30/04 pero con la posibilidad de ser finalizado antes de la fecha.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pago">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">4. Pago del servicio</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>El pago será realizado a la billetera RED TRON número:</strong></li>
              <li><strong style={{ color: "orange" }}>TJetmQE1b3vxMnnSkbHUGpRgS7oVFC5Dje</strong></li>
              <li>Recuerda enviar una captura de pantalla cuando el pago sea realizado.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}