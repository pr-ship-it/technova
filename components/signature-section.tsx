"use client"

import { useState } from "react"
import type { Partner } from "@/types/contract"
import { CheckCircle, XCircle, Loader2, Building2 } from "lucide-react"

interface SignatureSectionProps {
  partners: Partner[]
  signContract: (partnerId: number) => Promise<void>
}

export function SignatureSection({ partners, signContract }: SignatureSectionProps) {
  const [activePartner, setActivePartner] = useState<number | null>(null)
  const [signingInProgress, setSigningInProgress] = useState<number | null>(null)

  const handleSignature = async (partnerId: number) => {
    try {
      setSigningInProgress(partnerId)
      await signContract(partnerId)
      setActivePartner(null)
    } catch (error) {
      console.error("Error al firmar:", error)
    } finally {
      setSigningInProgress(null)
    }
  }

  // Verificar si todos los socios han firmado
  const allSigned = partners.every((partner) => partner.signed)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gold-500 mb-4">Firmas</h3>

      {/* Reserva de la empresa */}
      <div className="mb-8 p-5 bg-blue-900/40 rounded-lg border border-blue-700">
        <div className="flex items-center mb-4">
          <Building2 className="text-gold-400 mr-3" size={24} />
          <h4 className="text-lg font-semibold text-gold-400">Reserva para la Empresa (20%)</h4>
        </div>

        <p className="text-white/90 mb-4">
          Al firmar este contrato, todos los socios acuerdan destinar el 20% de las ganancias totales como reserva para
          la empresa, que será utilizada en campañas de marketing, recursos y otras necesidades operativas y de
          crecimiento.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`text-center p-2 rounded ${
                partner.signed ? "bg-green-900/30 border border-green-700" : "bg-blue-950/50 border border-blue-800"
              }`}
            >
              <div className="text-sm font-medium">{partner.name}</div>
              {partner.signed ? (
                <CheckCircle size={16} className="mx-auto mt-1 text-green-400" />
              ) : (
                <XCircle size={16} className="mx-auto mt-1 text-amber-400" />
              )}
            </div>
          ))}
        </div>

        {allSigned ? (
          <div className="mt-4 text-center text-green-400 font-medium">
            Todos los socios han aceptado la reserva del 20% para la empresa
          </div>
        ) : (
          <div className="mt-4 text-center text-amber-400 font-medium">
            Pendiente de aceptación por todos los socios
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              partner.signed
                ? "border-green-500 bg-green-900/20"
                : activePartner === partner.id
                  ? "border-gold-500 bg-blue-800/50"
                  : "border-blue-700 bg-blue-900/30 hover:border-blue-500"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-lg">{partner.name}</h4>
              <div>
                {partner.signed ? (
                  <div className="flex items-center text-green-400">
                    <CheckCircle size={18} className="mr-1" />
                    <span>Firmado</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-400">
                    <XCircle size={18} className="mr-1" />
                    <span>Pendiente</span>
                  </div>
                )}
              </div>
            </div>

            {partner.signed ? (
              <div className="mt-4">
                <div className="border-t border-green-500 pt-3 text-green-300">
                  <p className="font-signature text-xl">{partner.name}</p>
                  <p className="text-sm mt-1">Firmado el: {partner.signatureDate?.toLocaleString("es-ES")}</p>
                </div>
              </div>
            ) : activePartner === partner.id ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-blue-300">
                  Al firmar, acepta todos los términos y condiciones establecidos en este contrato, incluyendo la
                  reserva del 20% para la empresa y la distribución de utilidades entre los socios.
                </p>
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setActivePartner(null)}
                    className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-md transition-colors duration-200 text-white"
                    disabled={signingInProgress === partner.id}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSignature(partner.id)}
                    disabled={signingInProgress === partner.id}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 rounded-md transition-colors duration-200 text-blue-950 font-medium flex items-center"
                  >
                    {signingInProgress === partner.id ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar Firma"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActivePartner(partner.id)}
                disabled={signingInProgress !== null}
                className="mt-4 w-full px-4 py-2 rounded-md transition-all duration-200 bg-gold-600 hover:bg-gold-500 text-blue-950 font-medium"
              >
                Firmar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
