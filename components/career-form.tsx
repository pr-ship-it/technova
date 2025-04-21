"use client"

import type React from "react"

import { useState } from "react"
import { submitApplication } from "@/app/actions/career-actions"
import { Upload, Briefcase, GraduationCap, Code, Send } from "lucide-react"

export default function CareerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    await submitApplication(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName(null)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white">Información Personal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
              Puesto al que Aplicas *
            </label>
            <select
              id="position"
              name="position"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Selecciona una opción</option>
              <option value="developer">Desarrollador</option>
              <option value="designer">Diseñador UX/UI</option>
              <option value="marketing">Marketing Digital</option>
              <option value="data">Científico de Datos</option>
              <option value="security">Especialista en Ciberseguridad</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
          Experiencia Profesional
        </h2>

        <div className="mb-6">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
            Experiencia Laboral Relevante *
          </label>
          <textarea
            id="experience"
            name="experience"
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Describe tu experiencia laboral relevante, incluyendo empresas, puestos y responsabilidades principales."
          ></textarea>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <GraduationCap className="w-6 h-6 mr-2 text-green-400" />
          Formación Académica
        </h2>

        <div className="mb-6">
          <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-2">
            Educación y Certificaciones *
          </label>
          <textarea
            id="education"
            name="education"
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Detalla tu formación académica, incluyendo títulos, instituciones y fechas. Incluye también certificaciones relevantes."
          ></textarea>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-400" />
          Habilidades y Conocimientos
        </h2>

        <div className="mb-6">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
            Habilidades Técnicas y Blandas *
          </label>
          <textarea
            id="skills"
            name="skills"
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enumera tus habilidades técnicas (lenguajes de programación, herramientas, etc.) y habilidades blandas (trabajo en equipo, comunicación, etc.)."
          ></textarea>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white">Información Adicional</h2>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            ¿Por qué quieres unirte a nuestro equipo? *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Cuéntanos por qué te interesa trabajar con nosotros y qué puedes aportar a nuestro equipo."
          ></textarea>
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
            Adjuntar Currículum (PDF, DOC, DOCX) *
          </label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleFileChange}
            />
            <label
              htmlFor="resume"
              className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 border border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-gray-300">{fileName ? fileName : "Seleccionar archivo"}</span>
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 5MB.</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="submit" disabled={isSubmitting} className="cta-button inline-flex items-center text-lg px-8 py-4">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Enviar Solicitud
            </>
          )}
        </button>
      </div>
    </form>
  )
}
