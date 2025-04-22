import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Obtener las variables de entorno de Supabase proporcionadas por Vercel
const supabaseUrl =  "https://kjfwabjdfwikocuxsfqy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZndhYmpkZndpa29jdXhzZnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNTAyMjQsImV4cCI6MjA2MDkyNjIyNH0.qpSm4heeeSqBEx-4tLAsGXnbljISxX9KSEiWQkznjEs"

// Crear un cliente de Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export type DbPartner = {
  id: number
  name: string
  signed: boolean
  signature_date: string | null
  created_at?: string
}

export type DbSignature = {
  id?: number
  partner_id: number
  partner_name: string
  signature_date: string
  created_at?: string
}

export type DbContract = {
  id?: number
  contract_date: string
  created_at?: string
  updated_at?: string
}

// Funciones para interactuar con la base de datos
export async function getContractData() {
  try {
    // Obtener datos del contrato
    const { data: contractData, error: contractError } = await supabase
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (contractError && contractError.code !== "PGRST116") {
      console.error("Error al obtener contrato:", contractError)
      throw contractError
    }

    // Si no hay contrato, crear uno nuevo
    if (!contractData) {
      const newContract = {
        contract_date: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("contracts").insert([newContract]).select().single()

      if (error) {
        console.error("Error al crear contrato:", error)
        throw error
      }

      return { contract: data, partners: [], signatures: [] }
    }

    // Obtener socios
    const { data: partners, error: partnersError } = await supabase
      .from("partners")
      .select("*")
      .order("id", { ascending: true })

    if (partnersError) {
      console.error("Error al obtener socios:", partnersError)
      throw partnersError
    }

    // Obtener firmas
    const { data: signatures, error: signaturesError } = await supabase
      .from("signatures")
      .select("*")
      .order("created_at", { ascending: true })

    if (signaturesError) {
      console.error("Error al obtener firmas:", signaturesError)
      throw signaturesError
    }

    return {
      contract: contractData,
      partners: partners || [],
      signatures: signatures || [],
    }
  } catch (error) {
    console.error("Error al obtener datos:", error)
    throw error
  }
}

export async function updatePartnerSignature(partnerId: number, partnerName: string) {
  try {
    const now = new Date().toISOString()

    // Actualizar el estado de firma del socio
    const { error: updateError } = await supabase
      .from("partners")
      .update({ signed: true, signature_date: now })
      .eq("id", partnerId)

    if (updateError) {
      console.error("Error al actualizar socio:", updateError)
      throw updateError
    }

    // Añadir la firma
    const { data, error: insertError } = await supabase
      .from("signatures")
      .insert([
        {
          partner_id: partnerId,
          partner_name: partnerName,
          signature_date: now,
        },
      ])
      .select()
      .single()

    if (insertError) {
      console.error("Error al guardar la firma:", insertError)
      throw insertError
    }

    return data
  } catch (error) {
    console.error("Error al actualizar firma:", error)
    throw error
  }
}

// Verificar que los socios estén inicializados
export async function checkPartnersInitialized() {
  try {
    const { count, error } = await supabase.from("partners").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error al verificar socios:", error)
      throw error
    }

    return count && count > 0
  } catch (error) {
    console.error("Error al verificar socios:", error)
    throw error
  }
}
