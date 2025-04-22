"use client"

import { useState, useEffect } from "react"
import { ContractHeader } from "@/components/contract-header"
import { ContractContent } from "@/components/contract-biyuyo"
import { SignatureSection } from "@/components/signature-section"
import { PDFDownload } from "@/components/pdf-download"
import { Footer } from "@/components/footer"
import type { Partner, Signature } from "@/types/contract"
import { getContractData, updatePartnerSignature, checkPartnersInitialized } from "@/lib/supabase"
import { Loader2, AlertTriangle } from "lucide-react"

export default function ContractBiyuyoPage() {
  const initialPartners: Partner[] = [
    { id: 1, name: "Luis", signed: false, signatureDate: null },
    { id: 2, name: "Ariel", signed: false, signatureDate: null },
    { id: 3, name: "Pedro", signed: false, signatureDate: null },
  ]

  const [partners, setPartners] = useState<Partner[]>(initialPartners)
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [isDraft, setIsDraft] = useState(false)
  const [contractDate, setContractDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  // Podés reutilizar toda la lógica del useEffect y funciones acá
  // Pero si querés que use otro contrato en la base de datos,
  // deberías adaptar `getContractData()` para aceptar un identificador o tipo.

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        const partnersInitialized = await checkPartnersInitialized().catch((err) => {
          console.warn("Error al verificar socios:", err)
          setIsOfflineMode(true)
          return false
        })

        if (!partnersInitialized) {
          console.warn("Los socios no están inicializados en la base de datos")
          setIsOfflineMode(true)
        }

        const data = await getContractData().catch((err) => {
          console.warn("Error al obtener datos del contrato:", err)
          setIsOfflineMode(true)
          return {
            contract: { contract_date: new Date().toISOString() },
            partners: initialPartners,
            signatures: [],
          }
        })

        const formattedPartners: Partner[] = data.partners.map((p) => ({
          id: p.id,
          name: p.name,
          signed: p.signed,
          signatureDate: p.signature_date ? new Date(p.signature_date) : null,
        }))

        const formattedSignatures: Signature[] = data.signatures.map((s) => ({
          partnerId: s.partner_id,
          partnerName: s.partner_name,
          date: new Date(s.signature_date),
          timestamp: s.signature_date,
        }))

        setPartners(formattedPartners.length > 0 ? formattedPartners : initialPartners)
        setSignatures(formattedSignatures)
        setContractDate(new Date(data.contract.contract_date))
      } catch (err) {
        console.error("Error al cargar datos:", err)
        setError("Hubo un problema al cargar los datos del contrato. Usando modo offline.")
        setIsOfflineMode(true)

        try {
          const partnersStr = localStorage.getItem("technovaai-biyuyo-partners")
          const signaturesStr = localStorage.getItem("technovaai-biyuyo-signatures")
          const contractDateStr = localStorage.getItem("technovaai-biyuyo-contract-date")

          if (partnersStr) {
            setPartners(JSON.parse(partnersStr))
          }

          if (signaturesStr) {
            setSignatures(JSON.parse(signaturesStr))
          }

          if (contractDateStr) {
            setContractDate(new Date(contractDateStr))
          }
        } catch (localErr) {
          console.error("Error al cargar datos locales:", localErr)
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (loading) return

    try {
      localStorage.setItem("technovaai-biyuyo-partners", JSON.stringify(partners))
      localStorage.setItem("technovaai-biyuyo-signatures", JSON.stringify(signatures))
      localStorage.setItem("technovaai-biyuyo-contract-date", contractDate.toISOString())
    } catch (err) {
      console.error("Error al guardar datos locales:", err)
    }
  }, [partners, signatures, contractDate, loading])

  const signContract = async (partnerId: number) => {
    try {
      const partner = partners.find((p) => p.id === partnerId)
      if (!partner) return

      if (!isOfflineMode) {
        await updatePartnerSignature(partnerId, partner.name).catch((err) => {
          console.warn("Error al actualizar firma en la base de datos:", err)
          setIsOfflineMode(true)
        })
      }

      const now = new Date()
      setPartners(partners.map((p) => (p.id === partnerId ? { ...p, signed: true, signatureDate: now } : p)))

      setSignatures([
        ...signatures,
        {
          partnerId,
          partnerName: partner.name,
          date: now,
          timestamp: now.toISOString(),
        },
      ])
    } catch (err) {
      console.error("Error al firmar:", err)
      alert("Hubo un problema al procesar la firma. Por favor, intenta de nuevo.")
    }
  }

  const saveAsDraft = () => {
    setIsDraft(true)
    try {
      localStorage.setItem("technovaai-biyuyo-draft", "true")
    } catch (err) {
      console.error("Error al guardar borrador:", err)
    }
    alert("Contrato guardado como borrador")
  }

  const allSigned = partners.every((partner) => partner.signed)
  const signatureProgress = (partners.filter((p) => p.signed).length / partners.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <Loader2 className="h-12 w-12 animate-spin text-gold-500 mb-4" />
        <p className="text-xl">Cargando contrato Biyuyo...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {isOfflineMode && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 mb-6 flex items-start">
            <AlertTriangle className="text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-300">Modo sin conexión</h3>
              <p className="text-amber-200/80 text-sm mt-1">
                No se pudo conectar a la base de datos. Las firmas se guardarán localmente en este dispositivo.
              </p>
            </div>
          </div>
        )}

        <ContractHeader contractDate={contractDate} />

        <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 border border-blue-800">
          <ContractContent partners={partners} />

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gold-500 mb-4">Progreso de Firmas</h3>
            <div className="w-full bg-blue-950 rounded-full h-4 mb-6">
              <div
                className="bg-gradient-to-r from-gold-400 to-gold-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${signatureProgress}%` }}
              ></div>
            </div>

            <SignatureSection partners={partners} signContract={signContract} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
            <button
              onClick={saveAsDraft}
              className="px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md transition-colors duration-200 text-white"
            >
              Guardar como borrador
            </button>

            {allSigned ? (
              <PDFDownload partners={partners} signatures={signatures} contractDate={contractDate} />
            ) : (
              <div className="text-amber-300 italic">
                Se habilitará la descarga cuando todos hayan firmado
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
