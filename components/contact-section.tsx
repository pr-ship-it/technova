"use client"

import React, { useState, useRef, useEffect, FormEvent } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Send, Check } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Inicializar EmailJS con tu clave pública
  useEffect(() => {
    emailjs.init("0Fay7kTqrwuus6SWf") // ← reemplaza por tu PUBLIC KEY real
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    emailjs
      .sendForm(
        "service_00zfxyb",      // ← reemplaza por tu SERVICE ID real
        "template_xzqxmw8",     // ← reemplaza por tu TEMPLATE ID real
        formRef.current
      )
      .then((res) => {
        console.log("Email enviado:", res)
        setIsSubmitted(true)
        formRef.current?.reset()
      })
      .catch((error) => {
        console.error("EmailJS error:", error)
        alert("Error al enviar el mensaje.")
      })
  }

  return (
    <section id="contacto" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 gold-text">Contáctanos</h2>
            <p className="text-xl text-gray-300">
              Estamos listos para ayudarte a transformar tu negocio con tecnología avanzada.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-900/30 border border-green-500 rounded-lg p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">¡Mensaje enviado!</h3>
              <p className="text-gray-300">
                Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
              </p>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="cta-button inline-flex items-center">
                  <span className="mr-2">Enviar Mensaje</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
