"use client"

import { useState } from "react"
import type { Partner, Signature } from "@/types/contract"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

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
      alert("Error al firmar. Por favor, intenta de nuevo.")
    } finally {
      setSigningInProgress(null)
    }
  }

  const allSigned = partners.every((partner) => partner.signed)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gold-500 mb-4">Firmas</h3>

      <div className="mb-8 p-5 bg-blue-900/40 rounded-lg border border-blue-700">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-4">
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
            Todos las partes han aceptado
          </div>
        ) : (
          <div className="mt-4 text-center text-amber-400 font-medium">
            Pendiente de aceptación
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
                  <p className="text-sm mt-1">
                    Firmado el: {partner.signatureDate?.toLocaleString("es-ES")}
                  </p>
                </div>
              </div>
            ) : activePartner === partner.id ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-blue-300">Confirma tu firma para aceptar el contrato.</p>
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