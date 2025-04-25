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
            role: "system",
            content:
              "Eres un asistente de TechNova AI, expertos en chatbots, automatizaciones, páginas web y marketing digital. Responde en español, de forma breve (1-2 frases), amable y profesional. Para saludos como 'Hola', di '¡Hola! ¿En qué te ayudo?'. Si piden asesoramiento, responde 'Cuéntame tu idea' y sugiere un servicio SOLO tras analizar su respuesta. No listes todos los servicios salvo que lo pidan. Si busca asesoramiento por un humano, bríndales nuestro correo. evita usar frases reptitivas como en que te ayudo, se mas directo con la pregunta y responde solo lo que te pidan. nuestros servicios para que entres en contexto hacemos paginas web desde 2800MXN una simple web basica, si el cliente quiere agregar mas funcionalidades explica que tiene un costo extra dependiendo que. todos nuestros servicios web incluyen dominio .com- email empresarial - soporte. nuestros servicios de IA son para automatizar procesos. si el cliente te explica su negocio o te pide un ejemplo inventa uno coherente y corto sobre algo que hayamos realizado en la empresa relacionado a lo que el cliente pida. en el servicio de marketin digital gestionamos campañas de email marketing,creamos marca, logo , brand y hacemos publicaciones en redes sociales. si te piden ejemplos lo mismo, inventa alguno que hayamos realizado en la empresa que tenga coherencia con lo que el cliente pide. recuerda que tus respuestas deben ser lo mas cortas posibles y directas para resolver las dudas. si te piden por seguridad blockchain haz lo mismo inventa algun trabajo que hayamos hecho. todo lo que vayas a inventar que sea coherente no uses ejemplos con empresas gigantes como google,MIT, o gouvernamentales. da ejemplos de cambio a personas normales con sus negocios.",
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
