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
      position: "Directora de Marketing",
      comment:
        "Los chatbots que implementaron en nuestro servicio al cliente han reducido nuestros tiempos de respuesta en un 80%. Nuestros clientes están encantados con la atención inmediata y personalizada. La capacidad del sistema para entender el español coloquial es impresionante.",
      rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://i.ibb.co/Kj2BHdfS/confident-hispanic-operations-manager.png",
    },
    {
      id: 2,
      name: "Roberto Méndez",
      company: "Farmacias Bienestar",
      position: "CEO",
      comment:
        "La estrategia de marketing digital que desarrollaron para nuestra cadena de farmacias incrementó nuestras ventas online en un 65% en solo tres meses. Su enfoque en la comunidad hispana nos permitió conectar con un segmento de mercado que no estábamos alcanzando efectivamente.",
      rating: 5,
      service: "Marketing Digital",
      image: "https://i.ibb.co/0jrYXSRP/confident-hispanic-marketer.png",
    },
    {
      id: 3,
      name: "Carolina Herrera",
      company: "Financiera Hispana",
      position: "Directora de Seguridad",
      comment:
        "Después de sufrir un intento de ciberataque, TechNova AI implementó un sistema de seguridad que ha protegido nuestra infraestructura de manera impecable. Su solución blockchain para transacciones seguras ha generado mayor confianza entre nuestros clientes.",
      rating: 5,
      service: "Ciberseguridad y Blockchain",
      image: "https://i.ibb.co/1GnMJn6n/confident-hispanic-professional.png",
    },
    {
      id: 4,
      name: "Javier Rodríguez",
      company: "Tiendas La Estrella",
      position: "Gerente de Operaciones",
      comment:
        "El rediseño de nuestra página web y la implementación de la tienda online aumentaron nuestras conversiones en un 120%. El diseño es moderno, rápido y perfectamente adaptado a nuestros clientes hispanos. El soporte post-lanzamiento ha sido excepcional.",
      rating: 5,
      service: "Diseño Web y Promociones",
      image: "https://i.ibb.co/1Gr6Pr8N/confident-latino-director.png",
    },
    {
      id: 5,
      name: "Elena Martínez",
      company: "Restaurantes El Sabor",
      position: "Propietaria",
      comment:
        "Nuestro chatbot de reservas ha simplificado enormemente nuestras operaciones. Los clientes pueden hacer reservas, consultar el menú y hacer pedidos para llevar sin intervención humana. La precisión del sistema es sorprendente y ha reducido nuestros costos operativos.",
      rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://i.ibb.co/5W1Yz9pd/confident-latina-director.png",
    },
    {
      id: 6,
      name: "Miguel Soto",
      company: "Distribuidora Latina",
      position: "Director de Ventas",
      comment:
        "Las campañas de marketing digital diseñadas por TechNova AI han transformado nuestra presencia online. El análisis detallado del comportamiento de nuestros clientes hispanos nos permitió crear ofertas personalizadas que aumentaron nuestras ventas en un 45%.",
      rating: 5,
      service: "Marketing Digital",
      image: "https://i.ibb.co/xSJP2q3c/confident-latino-executive.png",
    },
    {
      id: 7,
      name: "Ana Gómez",
      company: "Seguros Confianza",
      position: "CTO",
      comment:
        "La implementación de contratos inteligentes basados en blockchain ha revolucionado nuestro proceso de reclamaciones. Ahora son más rápidos, transparentes y seguros. Nuestros clientes valoran enormemente la seguridad adicional que esto proporciona a sus datos personales.",
      rating: 5,
      service: "Ciberseguridad y Blockchain",
      image: "https://i.ibb.co/7N0S9hGP/confident-latina-executive.png",
    },
    {
      id: 8,
      name: "Pedro Ramírez",
      company: "Muebles Hogar",
      position: "Gerente de Marketing",
      comment:
        "Nuestra nueva página web con catálogo 3D ha cambiado completamente la experiencia de compra de nuestros clientes. Pueden visualizar los muebles en sus espacios antes de comprar, lo que ha reducido las devoluciones en un 35% y aumentado las ventas online en un 70%.",
      rating: 5,
      service: "Diseño Web y Promociones",
      image: "https://i.ibb.co/fYPtzmFp/confident-latino-ecommerce-leader.png",
    },
    {
      id: 9,
      name: "Lucía Fernández",
      company: "Clínica Bienestar",
      position: "Directora",
      comment:
        "El chatbot de programación de citas ha simplificado enormemente nuestro sistema de reservas. Los pacientes pueden programar, reprogramar o cancelar citas 24/7, y el sistema se integra perfectamente con nuestro calendario. Ha reducido las llamadas en un 60%.",
      rating: 5,
      service: "Chatbots Inteligentes",
      image: "https://i.ibb.co/PvM9qM85/confident-latina-security-leader.png",
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
