"use client"
import type { Partner } from "@/types/contract"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ContractContentProps {
  partners: Partner[]
}

export function ContractContent({ partners }: ContractContentProps) {
  // Separar los primeros 3 socios y los últimos 2 para poder centrarlos
  const firstThreePartners = partners.slice(0, 3)
  const lastTwoPartners = partners.slice(3)

  return (
    <div className="space-y-8">
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-500 mb-6">Socios</h3>

        {/* Primera fila: primeros 3 socios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {firstThreePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-blue-950/50 rounded-lg p-4 border border-blue-800 hover:border-gold-500 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-3 border-2 border-gold-400">
                <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
              </div>
              <h4 className="text-lg font-medium mb-1">{partner.name}</h4>
              {partner.signed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700 mt-2">
                  ✓ Firmado
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-700 mt-2">
                  Pendiente
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Segunda fila: últimos 2 socios centrados */}
        <div className="flex justify-center gap-4 sm:gap-8">
          {lastTwoPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-blue-950/50 rounded-lg p-4 border border-blue-800 hover:border-gold-500 transition-all duration-300 flex flex-col items-center text-center w-full sm:w-1/3"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-3 border-2 border-gold-400">
                <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
              </div>
              <h4 className="text-lg font-medium mb-1">{partner.name}</h4>
              {partner.signed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700 mt-2">
                  ✓ Firmado
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-700 mt-2">
                  Pendiente
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="objetivo">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">1. Objetivo</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>
              El presente contrato tiene como objetivo establecer las bases y condiciones para la constitución de una
              sociedad denominada "TechNova AI", dedicada al desarrollo, implementación y comercialización de soluciones
              basadas en Inteligencia Artificial para empresas y organizaciones.
            </p>
            <p className="mt-2">
              Los socios acuerdan unir sus conocimientos, habilidades y recursos para el desarrollo exitoso de la
              empresa, comprometiéndose a trabajar de manera colaborativa para alcanzar los objetivos comerciales y
              financieros establecidos.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="funciones">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">2. Funciones</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>Los socios desempeñarán las siguientes funciones dentro de la sociedad:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Luis:</strong> CEO y Fundador
              </li>
              <li>
                <strong>Ariel:</strong> Director de Marketing
              </li>
              <li>
                <strong>Iván:</strong> Director de Desarrollo
              </li>
              <li>
                <strong>Pedro:</strong> Desarrollo de proyectos de inteligencia artificial
              </li>
              <li>
                <strong>Manu:</strong> Gestión de ventas, contactos comerciales y flujo de capital
              </li>
            </ul>
            <p className="mt-2">
              Cada socio se compromete a desempeñar sus funciones con la máxima diligencia y profesionalidad, dedicando
              el tiempo y esfuerzo necesarios para el correcto desarrollo de la empresa.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="distribucion">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">
            3. Distribución de Utilidades
          </AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>
              De la ganancia total generada por la sociedad, el <strong>20%</strong> se destinará a una reserva para la
              empresa, que será utilizada en campañas de marketing, recursos y otras necesidades operativas y de
              crecimiento.
            </p>
            <p className="mt-2">
              El <strong>80%</strong> restante de las ganancias se distribuirá entre los socios de la siguiente manera:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Luis:</strong> 30% de las utilidades netas a distribuir (24% del total)
              </li>
              <li>
                <strong>Ariel:</strong> 20% de las utilidades netas a distribuir (16% del total)
              </li>
              <li>
                <strong>Iván:</strong> 20% de las utilidades netas a distribuir (16% del total)
              </li>
              <li>
                <strong>Pedro:</strong> 15% de las utilidades netas a distribuir (12% del total)
              </li>
              <li>
                <strong>Manu:</strong> 15% de las utilidades netas a distribuir (12% del total)
              </li>
            </ul>
            <p className="mt-2">
              La distribución de utilidades se realizará de forma trimestral, previa aprobación unánime de los socios y
              después de haber cubierto todos los gastos operativos, inversiones necesarias y reservas legales
              correspondientes.
            </p>
            <div className="mt-4 bg-blue-900/30 p-4 rounded-lg border border-blue-800">
              <p className="font-medium text-gold-400">
                Nota: Todos los socios deben firmar explícitamente su acuerdo con esta distribución de utilidades,
                incluyendo la reserva del 20% para la empresa.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="obligaciones">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">4. Obligaciones</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>Los socios se comprometen a:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Aportar el capital inicial acordado para la constitución de la sociedad.</li>
              <li>Mantener la confidencialidad de toda la información relacionada con la empresa.</li>
              <li>No participar en actividades que representen competencia directa para la sociedad.</li>
              <li>Asistir a las reuniones periódicas de socios y participar activamente en la toma de decisiones.</li>
              <li>Informar oportunamente sobre cualquier situación que pueda afectar los intereses de la sociedad.</li>
              <li>Cumplir con las responsabilidades asignadas según su función dentro de la empresa.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duracion">
          <AccordionTrigger className="text-xl font-semibold text-gold-500">5. Duración</AccordionTrigger>
          <AccordionContent className="text-white/90 leading-relaxed">
            <p>
              El presente contrato tendrá una duración inicial de cinco (5) años a partir de la fecha de firma,
              renovable automáticamente por períodos iguales, salvo que alguna de las partes manifieste su intención de
              no renovarlo con al menos tres (3) meses de anticipación a la fecha de vencimiento.
            </p>
            <p className="mt-2">
              En caso de que alguno de los socios desee retirarse de la sociedad antes del vencimiento del contrato,
              deberá notificarlo por escrito con al menos seis (6) meses de anticipación, y se procederá a la
              liquidación de su participación según lo establecido en las cláusulas correspondientes.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
