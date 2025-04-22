import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "technova-contract.firebaseapp.com",
  projectId: "technova-contract",
  storageBucket: "technova-contract.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Tipos para la base de datos
export type FirebasePartner = {
  id: number
  name: string
  signed: boolean
  signatureDate: Timestamp | null
}

export type FirebaseSignature = {
  partnerId: number
  partnerName: string
  signatureDate: Timestamp
  createdAt?: Timestamp
}

export type FirebaseContract = {
  contractDate: Timestamp
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

// Funciones para interactuar con la base de datos
export async function getContractData() {
  try {
    // Obtener datos del contrato
    const contractsRef = collection(db, "contracts")
    const contractQuery = query(contractsRef, orderBy("createdAt", "desc"), limit(1))
    const contractSnapshot = await getDocs(contractQuery)

    let contractData: FirebaseContract | null = null

    if (contractSnapshot.empty) {
      // Si no hay contrato, crear uno nuevo
      const newContract = {
        contractDate: Timestamp.fromDate(new Date()),
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      }

      const docRef = await addDoc(contractsRef, newContract)
      contractData = {
        ...newContract,
        contractDate: newContract.contractDate, // Usar el timestamp local ya que serverTimestamp no está disponible inmediatamente
      }
    } else {
      contractData = contractSnapshot.docs[0].data() as FirebaseContract
    }

    // Obtener socios
    const partnersRef = collection(db, "partners")
    const partnersSnapshot = await getDocs(partnersRef)

    let partners: FirebasePartner[] = []

    if (partnersSnapshot.empty) {
      // Si no hay socios, inicializar
      await initializePartners()
      const newPartnersSnapshot = await getDocs(partnersRef)
      partners = newPartnersSnapshot.docs.map((doc) => doc.data() as FirebasePartner)
    } else {
      partners = partnersSnapshot.docs.map((doc) => doc.data() as FirebasePartner)
      // Ordenar por ID
      partners.sort((a, b) => a.id - b.id)
    }

    // Obtener firmas
    const signaturesRef = collection(db, "signatures")
    const signaturesQuery = query(signaturesRef, orderBy("createdAt", "asc"))
    const signaturesSnapshot = await getDocs(signaturesQuery)

    const signatures = signaturesSnapshot.docs.map((doc) => doc.data() as FirebaseSignature)

    return {
      contract: contractData,
      partners,
      signatures,
    }
  } catch (error) {
    console.error("Error al obtener datos:", error)
    throw error
  }
}

export async function updatePartnerSignature(partnerId: number, partnerName: string) {
  try {
    const now = Timestamp.fromDate(new Date())

    // Actualizar el estado de firma del socio
    const partnerRef = doc(db, "partners", partnerId.toString())
    await setDoc(
      partnerRef,
      {
        id: partnerId,
        name: partnerName,
        signed: true,
        signatureDate: now,
      },
      { merge: true },
    )

    // Añadir la firma
    const signaturesRef = collection(db, "signatures")
    await addDoc(signaturesRef, {
      partnerId,
      partnerName,
      signatureDate: now,
      createdAt: serverTimestamp() as Timestamp,
    })

    return {
      partnerId,
      partnerName,
      signatureDate: now,
    }
  } catch (error) {
    console.error("Error al actualizar firma:", error)
    throw error
  }
}

// Inicializar la base de datos con los socios si no existen
export async function initializePartners() {
  try {
    const initialPartners = [
      { id: 1, name: "Luis", signed: false, signatureDate: null },
      { id: 2, name: "Ariel", signed: false, signatureDate: null },
      { id: 3, name: "Iván", signed: false, signatureDate: null },
      { id: 4, name: "Pedro", signed: false, signatureDate: null },
      { id: 5, name: "Manu", signed: false, signatureDate: null },
    ]

    // Crear cada socio con su ID como documento
    for (const partner of initialPartners) {
      await setDoc(doc(db, "partners", partner.id.toString()), partner)
    }

    return initialPartners
  } catch (error) {
    console.error("Error al inicializar socios:", error)
    throw error
  }
}
