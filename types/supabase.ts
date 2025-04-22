export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      contracts: {
        Row: {
          id: number
          contract_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          contract_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          contract_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: number
          name: string
          signed: boolean
          signature_date: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          signed?: boolean
          signature_date?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          signed?: boolean
          signature_date?: string | null
          created_at?: string
        }
      }
      signatures: {
        Row: {
          id: number
          partner_id: number
          partner_name: string
          signature_date: string
          created_at: string
        }
        Insert: {
          id?: number
          partner_id: number
          partner_name: string
          signature_date: string
          created_at?: string
        }
        Update: {
          id?: number
          partner_id?: number
          partner_name?: string
          signature_date?: string
          created_at?: string
        }
      }
    }
  }
}
