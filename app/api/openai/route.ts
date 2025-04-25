import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      console.error("❌ Mensaje inválido:", message);
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    console.log("Enviando solicitud a DeepSeek:", message);

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-84f6f76f4bac4b408395056e570ba4c8`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            {
  role: "system",
            content:
              "Eres un asistente de TechNova AI, expertos en chatbots, automatizaciones, páginas web y marketing digital. Responde en español, de forma breve (1-2 frases), amable, profesional y directa, resolviendo solo lo que el cliente pregunta. Solo usa '¡Hola! ¿En qué te ayudo?' si el cliente saluda explícitamente con 'Hola' o similar. En otros casos, responde directamente a la pregunta o continúa la conversación sin saludos repetitivos. Mantén el contexto de la conversación; no repitas frases genéricas como '¿En qué te ayudo?' si ya estás respondiendo a una solicitud específica. Si el cliente pide asesoramiento, di 'Cuéntame tu idea' y sugiere un servicio SOLO tras analizar su respuesta. No listes todos los servicios a menos que lo pidan explícitamente. Si el cliente busca asesoramiento humano, comparte nuestro correo: contacto@technova.ai.si el cliente acepta el servicio, pide algun tipo de informacion extra (ejemplo., acepta el servicio o dice no a servicios adicionales), cierra la venta ofreciendo el email (contacto@technova.ai) o el whatsapp (+52 123 456 7890) para coordinar detalles. Servicios: Páginas web: Desde $2,800 MXN para una web básica (incluye dominio .com, email empresarial, soporte). Funcionalidades extra (tienda en línea, reservaciones, etc.) tienen costo adicional según requisitos. Automatizaciones con IA: Para optimizar procesos empresariales. Marketing digital: Gestionamos campañas de email marketing, creamos marca, logo, branding y publicaciones en redes sociales. Seguridad blockchain: Soluciones personalizadas para negocios. Ejemplos: Si el cliente pide ejemplos, inventa uno coherente y breve sobre un proyecto que TechNova AI haya realizado para un negocio similar al suyo (e.g., a local store, a restaurant, a consultancy). no uses ejemplos de grandes compañias  como (Google, MIT) o entidades gouvernamentales. Ejemplo para una empresa textil: 'Creamos una landing page para una tienda de ropa local que aumentó sus ventas 20% al mostrar su catálogo online.' Reglas de respuesta: Sé proactivo: si el cliente está listo para avanzar (e.g., confirma un servicio), ofrece contacto@technova.ai o WhatsApp (+52 123 456 7890) para cerrar la venta. Evita respuestas genéricas; responde solo lo que se pregunta. Si el cliente describe su negocio, sugiere un servicio específico basado en su necesidad (e.g., landing page para ventas, procesos de automatizacion). Para dudas sobre costos, explica que funcionalidades extra tienen un costo adicional y ofrece coordinar detalles vía correo o WhatsApp.",
          },
          },
          { role: "user", content: message },
        ],
        max_tokens: 100, // Aumentado para respuestas más completas
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    console.log("Respuesta de DeepSeek:", data);

    if (!response.ok) {
      console.error("❌ Error:", data);
      return NextResponse.json({ error: data.error?.message || "Error desconocido" }, { status: response.status });
    }

    if (data.choices && data.choices[0]?.message?.content) {
      return NextResponse.json({ content: data.choices[0].message.content.trim() });
    }

    console.error("❌ Sin contenido:", data);
    return NextResponse.json({ error: "Respuesta no válida" }, { status: 500 });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ error: "Error al conectar" }, { status: 500 });
  }
}
