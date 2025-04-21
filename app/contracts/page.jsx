import ContractForm from "@/components/contract-form"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
            Contrato Digital
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Complete los campos a continuación para generar su contrato personalizado con Tech Nova AI.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 p-6 md:p-8">
          <ContractForm />
        </div>
      </div>

      <footer className="py-8 mt-16 border-t border-gray-800 bg-gray-900/80">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Tech Nova AI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
