"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Award, TrendingUp, Zap } from "lucide-react"

export default function OurJourney() {
  const timelineItems = [
    {
      year: 2020,
      title: "El comienzo de un sueño",
      description:
        "Todo comenzó en un pequeño apartamento durante la pandemia. Luis, con solo una computadora y una visión clara, fundó TechNova AI para llevar soluciones tecnológicas avanzadas a negocios hispanos que estaban quedando rezagados en la transformación digital.",
      icon: <Calendar className="w-6 h-6 text-blue-400" />,
      stats: "1 fundador, 3 clientes, 100% pasión",
      image: "/tech-executive-javier.png",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    },
    {
      year: 2021,
      title: "El primer gran desafío",
      description:
        "Tras meses de trabajo incansable, logramos nuestro primer cliente importante: una cadena de supermercados hispanos que necesitaba digitalizar sus operaciones. Este proyecto nos permitió demostrar el valor de nuestras soluciones y comenzar a construir nuestra reputación en el mercado.",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      stats: "1 fundador, 12 clientes, 300% crecimiento",
      image: "/confident-latino-executive.png",
      color: "from-green-500/20 to-green-600/20 border-green-500/30",
    },
    {
      year: 2022,
      title: "Creciendo el equipo",
      description:
        "El éxito de nuestros primeros proyectos nos permitió dar un paso crucial: contratar a nuestra primera empleada. Ana Martínez, una brillante ingeniera en Inteligencia Artificial, se unió como CTO para liderar nuestro desarrollo tecnológico y elevar nuestras soluciones a un nuevo nivel.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      stats: "2 miembros del equipo, 25 clientes, 2 premios de innovación",
      image: "/coding-curly.png",
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    },
    {
      year: 2023,
      title: "Expansión y reconocimiento",
      description:
        "Con una base de clientes en crecimiento y proyectos cada vez más ambiciosos, expandimos nuestro equipo nuevamente. Ariel se unió como Director de Marketing, trayendo su experiencia en estrategias digitales multiculturales que nos ayudaron a conectar de manera más auténtica con nuestro mercado objetivo.",
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      stats: "3 miembros del equipo, 50+ clientes, presencia en 3 países",
      image: "/confident-hispanic-marketer.png",
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
    },
    {
      year: 2024,
      title: "Seguridad como prioridad",
      description:
        "Con el aumento de ciberataques a empresas hispanas, identificamos una necesidad crítica en el mercado. Ivan G, ex-consultor de seguridad , se unió a nuestro equipo como Jefe de programacion, completando nuestra visión de ofrecer soluciones tecnológicas integrales y seguras.",
      icon: <Zap className="w-6 h-6 text-red-400" />,
      stats: "4 miembros del equipo, 100+ clientes, 5 soluciones tecnológicas patentadas",
      image: "/confident-cybersecurity-analyst.png",
      color: "from-red-500/20 to-red-600/20 border-red-500/30",
    },
    {
      year: 2025,
      title: "Mirando hacia el futuro",
      description:
        "Hoy, cinco años después de aquel modesto comienzo, TechNova AI se ha convertido en un referente en soluciones tecnológicas para el mercado hispano. Lo que comenzó como el sueño de una persona es ahora la realidad de un equipo apasionado que ha transformado digitalmente más de 100 negocios y sigue creciendo con la misma pasión del primer día.",
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      stats: "4 expertos dedicados, 120+ clientes satisfechos, impacto en miles de negocios hispanos",
      image: "/vibrant-connections.png",
      color: "from-blue-500/20 to-purple-600/20 border-blue-500/30",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-4 gold-text gold-text-lg">Nuestra Trayectoria</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            De un sueño individual a un equipo de expertos: la historia de cómo TechNova AI ha crecido y
            transformado el panorama tecnológico para negocios hispanos.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea vertical conectora */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 rounded-full hidden md:block"></div>

          {/* Elementos de la línea de tiempo */}
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
              >
                {/* Punto en la línea de tiempo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center z-10 hidden md:flex">
                  {item.icon}
                </div>

                {/* Contenido */}
                <div className="md:w-1/2 p-4">
                  <div
                    className={`bg-gradient-to-br ${item.color} p-6 rounded-xl border shadow-lg relative overflow-hidden`}
                  >
                    {/* Año destacado */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gray-900/80 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white mt-6 mr-6">{item.year}</span>
                    </div>

                    <div className="md:flex items-start">
                      <div className="md:flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>
                        <div className="bg-gray-900/50 px-4 py-2 rounded-lg inline-block">
                          <p className="text-sm font-medium text-blue-300">{item.stats}</p>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Espacio para mantener la alineación en móvil */}
                <div className="md:w-1/2 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mensaje final inspirador */}
        <motion.div
          className="mt-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Una historia que continúa escribiéndose</h3>
          <p className="text-gray-300">
            Nuestro viaje demuestra que con pasión, perseverancia y un compromiso inquebrantable con la excelencia, es
            posible convertir los desafíos en oportunidades. Mientras miramos hacia el futuro, seguimos comprometidos
            con nuestra misión original: democratizar el acceso a tecnologías avanzadas para el mercado hispano y ser
            catalizadores de su transformación digital.
          </p>
          <div className="mt-8">
            <a href="#contact" className="cta-button inline-block">
              Sé parte de nuestra historia
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
