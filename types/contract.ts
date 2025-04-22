export interface Partner {
  id: number
  name: string
  signed: boolean
  signatureDate: Date | null
}

export interface Signature {
  partnerId: number
  partnerName: string
  date: Date
  timestamp: string
}
