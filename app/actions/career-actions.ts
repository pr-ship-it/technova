"use server"

import { redirect } from "next/navigation"

export async function submitApplication(formData: FormData) {
  // Simulamos un retraso para la operación de guardado
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Extraemos los datos del formulario
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const position = formData.get("position") as string
  const experience = formData.get("experience") as string
  const education = formData.get("education") as string
  const skills = formData.get("skills") as string
  const message = formData.get("message") as string
  const resumeFile = formData.get("resume") as File

  // Aquí normalmente guardaríamos los datos en una base de datos
  // y subiríamos el archivo a un servicio de almacenamiento
  console.log("Solicitud recibida:", {
    name,
    email,
    phone,
    position,
    experience,
    education,
    skills,
    message,
    resumeFileName: resumeFile?.name || "No file uploaded",
    resumeFileSize: resumeFile?.size || 0,
  })

  // Redirigimos a la página de confirmación
  redirect("/carreras/gracias")
}
