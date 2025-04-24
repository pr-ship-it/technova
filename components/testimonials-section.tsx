"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  company: string
  position: string
  comment: string
  rating: number
  service: string
  image: string
}



export default function TestimonialsSection() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonialsPerPage = 3

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "María González",
      company: "Supermercados El Valle",
      position: "",
      comment:
       "Desde que implementamos los chatbots en el servicio al cliente, los tiempos de respuesta se han reducido muchísimo, casi un 80%. Nuestros clientes están felices con la atención rápida y personalizada. Además, nos ha sorprendido lo bien que entienden el español. ¡Ha sido un cambio muy positivo!"
      ,rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518237/confident-latina-executive_iyhvsc.png",
    },
    {
      id: 2,
      name: "Roberto Méndez",
      company: "Farmacias Bienestar",
      position: "",
      comment:
"La estrategia de marketing digital que nos prepararon hizo que nuestras ventas online subieran un 65% en solo tres meses. Se enfocaron mucho en la comunidad hispana, y gracias a eso pudimos llegar a un público que antes no estábamos alcanzando bien. Fue un gran acierto"      ,rating: 5,
      service: "Marketing Digital",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518240/confident-latino-director_w9odwc.png",
    },
    {
      id: 3,
      name: "Carolina Herrera",
      company: "Financiera Hispana",
      position: "",
      comment:
"Tuvimos un intento de ciberataque y, justo después, TechNova AI nos puso un sistema de seguridad que ha funcionado súper bien. También implementaron una solución con blockchain para que las transacciones sean más seguras, y eso ha hecho que nuestros clientes confíen mucho más. La verdad, nos salvaron."      ,rating: 5,
      service: "Ciberseguridad y Blockchain",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518237/confident-hispanic-operations-manager_xs9cou.png",
    },
    {
      id: 4,
      name: "Javier Rodríguez",
      company: "Tiendas La Estrella",
      position: "",
      comment:
"Desde que rediseñaron nuestra página y lanzaron la tienda online, nuestras conversiones subieron un 120%. El sitio quedó moderno, rápido y súper bien pensado para nuestros clientes hispanos. Además, el apoyo después del lanzamiento ha sido de lo mejor."      ,rating: 5,
      service: "Diseño Web y Promociones",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518240/confident-latino-ecommerce-leader_pgrhnp.png",
    },
    {
      id: 5,
      name: "Elena Martínez",
      company: "Restaurantes El Sabor",
      position: "",
      comment:
"El chatbot de reservas nos ha facilitado muchísimo las cosas. Ahora los clientes pueden hacer reservas, ver el menú y pedir para llevar sin que nadie del equipo tenga que intervenir. Funciona con una precisión increíble y, además, nos ha ayudado a bajar los costos."      ,rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518237/confident-hispanic-professional_gby5oj.png",
    },
    {
      id: 6,
      name: "Miguel Soto",
      company: "Distribuidora Latina",
      position: "",
      comment:
"Las campañas de marketing digital que hizo TechNova AI cambiaron por completo nuestra presencia online. Analizaron súper bien el comportamiento de nuestros clientes hispanos, y con eso armamos ofertas personalizadas que hicieron que las ventas subieran un 45%."
      ,rating: 5,
      service: "Marketing Digital",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518238/confident-hispanic-marketer_itwncn.png",
    },
    {
      id: 7,
      name: "Ana Gómez",
      company: "Seguros Confianza",
      position: "",
      comment:
"Cuando empezamos a usar contratos inteligentes con blockchain, todo cambió. El proceso de reclamaciones se volvió mucho más ágil, transparente y seguro. Y lo mejor es que nuestros clientes lo notaron de inmediato—se sienten más tranquilos sabiendo que sus datos están bien protegidos."
  ,rating: 5,
      service: "Ciberseguridad y Blockchain",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518237/confident-latina-director_zmjx1m.png",
    },
    {
      id: 8,
      name: "Pedro Ramírez",
      company: "Muebles Hogar",
      position: "",
      comment:
"Nuestra nueva página con catálogo 3D le dio un giro total a la forma en que compran nuestros clientes. Ahora pueden ver cómo se ven los muebles en sus casas antes de hacer el pedido, y eso hizo que bajaran muchísimo las devoluciones—un 35% menos. Además, las ventas online subieron un 70%. ¡Un cambio enorme!"
     , rating: 5,
      service: "Diseño Web y Promociones",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518240/confident-latino-executive_q0drbo.png",
    },
    {
      id: 9,
      name: "Lucía Fernández",
      company: "Clínica Bienestar",
      position: "",
      comment:
"El chatbot para agendar citas nos ha hecho la vida mucho más fácil. Ahora los pacientes pueden programar, cambiar o cancelar sus citas en cualquier momento, y todo se sincroniza perfecto con nuestro calendario. Gracias a eso, las llamadas bajaron un 60%.",      rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://res.cloudinary.com/dllkefj8m/image/upload/v1745518237/confident-latina-security-leader_zsb40c.png",
    },

  ]

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const currentTestimonials = testimonials.slice(
    activeIndex * testimonialsPerPage,
    (activeIndex + 1) * testimonialsPerPage,
  )

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  return (
    <section id="testimonials" className="py-20 relative">
      {/* Eliminamos los elementos de fondo */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-4 gold-text gold-text-lg">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-blue-400">{testimonial.position}</p>
                    <p className="text-xs text-gray-400">{testimonial.company}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="relative">
                    <Quote className="w-8 h-8 text-blue-500/20 absolute -top-2 -left-2" />
                    <p className="text-gray-300 relative z-10 pl-2">{testimonial.comment}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                    {testimonial.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-blue-500" : "bg-gray-600"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
