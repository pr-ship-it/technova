"use client"

import { useState, useEffect } from "react"
import { ContractHeader } from "@/components/contract-header"
import { ContractContent } from "@/components/contract-content"
import { SignatureSection } from "@/components/signature-section"
import { PDFDownload } from "@/components/pdf-download"
import { Footer } from "@/components/footer"
import type { Partner, Signature } from "@/types/contract"
import { getContractData, updatePartnerSignature, checkPartnersInitialized } from "@/lib/supabase"
import { Loader2, AlertTriangle } from "lucide-react"

export default function ContractPage() {
  // Estado inicial de los socios
  const initialPartners: Partner[] = [
    { id: 1, name: "Luis", signed: false, signatureDate: null },
    { id: 2, name: "Ariel", signed: false, signatureDate: null },
    { id: 3, name: "Iván", signed: false, signatureDate: null },
    { id: 4, name: "Pedro", signed: false, signatureDate: null },
    { id: 5, name: "Manu", signed: false, signatureDate: null },
  ]

  const [partners, setPartners] = useState<Partner[]>(initialPartners)
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [isDraft, setIsDraft] = useState(false)
  const [contractDate, setContractDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  // Cargar datos desde la base de datos al iniciar
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        // Verificar que los socios estén inicializados
        const partnersInitialized = await checkPartnersInitialized().catch((err) => {
          console.warn("Error al verificar socios:", err)
          setIsOfflineMode(true)
          return false
        })

        if (!partnersInitialized) {
          console.warn("Los socios no están inicializados en la base de datos")
          setIsOfflineMode(true)
        }

        // Obtener datos del contrato
        const data = await getContractData().catch((err) => {
          console.warn("Error al obtener datos del contrato:", err)
          setIsOfflineMode(true)
          // Devolver datos locales en caso de error
          return {
            contract: { contract_date: new Date().toISOString() },
            partners: initialPartners,
            signatures: [],
          }
        })

        // Convertir los datos de la base de datos al formato de la aplicación
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

        // Actualizar el estado
        setPartners(formattedPartners.length > 0 ? formattedPartners : initialPartners)
        setSignatures(formattedSignatures)
        setContractDate(new Date(data.contract.contract_date))
      } catch (err) {
        console.error("Error al cargar datos:", err)
        setError("Hubo un problema al cargar los datos del contrato. Usando modo offline.")
        setIsOfflineMode(true)

        // Intentar cargar datos del localStorage como respaldo
        try {
          const partnersStr = localStorage.getItem("technovaai-partners")
          const signaturesStr = localStorage.getItem("technovaai-signatures")
          const contractDateStr = localStorage.getItem("technovaai-contract-date")

          if (partnersStr) {
            const parsedPartners = JSON.parse(partnersStr)
            setPartners(
              parsedPartners.map((p: any) => ({
                ...p,
                signatureDate: p.signatureDate ? new Date(p.signatureDate) : null,
              })),
            )
          }

          if (signaturesStr) {
            const parsedSignatures = JSON.parse(signaturesStr)
            setSignatures(
              parsedSignatures.map((s: any) => ({
                ...s,
                date: new Date(s.date),
              })),
            )
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

  // Guardar cambios en localStorage cuando cambian los estados
  useEffect(() => {
    // Solo guardar después de que se haya cargado inicialmente
    if (loading) return

    // Guardar en localStorage como respaldo
    try {
      localStorage.setItem("technovaai-partners", JSON.stringify(partners))
      localStorage.setItem("technovaai-signatures", JSON.stringify(signatures))
      localStorage.setItem("technovaai-contract-date", contractDate.toISOString())
    } catch (err) {
      console.error("Error al guardar datos locales:", err)
    }
  }, [partners, signatures, contractDate, loading])

  // Función para firmar el contrato
  const signContract = async (partnerId: number) => {
    try {
      // Encontrar el socio
      const partner = partners.find((p) => p.id === partnerId)
      if (!partner) return

      // Actualizar en la base de datos
      if (!isOfflineMode) {
        await updatePartnerSignature(partnerId, partner.name).catch((err) => {
          console.warn("Error al actualizar firma en la base de datos:", err)
          setIsOfflineMode(true)
          // Continuar con actualización local
        })
      }

      // Actualizar el estado local
      const now = new Date()

      // Actualizar el estado del socio
      setPartners(partners.map((p) => (p.id === partnerId ? { ...p, signed: true, signatureDate: now } : p)))

      // Añadir la firma
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
      localStorage.setItem("technovaai-draft", "true")
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
        <p className="text-xl">Cargando contrato...</p>
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
                No se pudo conectar a la base de datos. Las firmas se guardarán localmente en este dispositivo, pero no
                se sincronizarán con otros dispositivos.
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
                Se habilitará la descarga cuando todos los socios hayan firmado
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
