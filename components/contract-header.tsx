interface ContractHeaderProps {
  contractDate: Date
}

export function ContractHeader({ contractDate }: ContractHeaderProps) {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(contractDate)

  return (
    <div className="text-center mb-10">
      <div className="mb-6 flex justify-center">
        <div className="relative w-64 h-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            TechNova AI
          </h1>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Contrato de Sociedad y Reparto de Utilidades</h2>

      <p className="text-gold-300">Fecha: {formattedDate}</p>
    </div>
  )
}
