// src/app/api/openai/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      console.error("❌ Mensaje inválido:", message);
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    console.log("Enviando solicitud a Hugging Face:", message);

    const systemPrompt = `
      Eres un asistente de TechNova AI, una empresa de chatbots, automatizaciones, páginas web y marketing digital. 
      Responde en español, de forma breve (1-2 frases), amable y profesional. 
      Para saludos como "Hola", di solo "¡Hola! ¿En qué te ayudo?". 
      Si piden asesoramiento, responde "Cuéntame tu idea" y analiza su respuesta para sugerir un servicio (chatbots, automatizaciones, web, marketing). 
      No listes todos los servicios a menos que lo pidan explícitamente.
      
      
      Mensaje del cliente: ${message}
    `;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${systemPrompt} [/INST]`,
          parameters: {
            max_new_tokens: 50, // Limita a ~1-2 frases
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    console.log("Respuesta de Hugging Face:", data);

    if (!response.ok) {
      console.error("❌ Error:", data);
      return NextResponse.json({ error: data.error?.message || "Error desconocido" }, { status: response.status });
    }

    if (data && data[0]?.generated_text) {
      return NextResponse.json({ content: data[0].generated_text.trim() });
    }

    console.error("❌ Sin generated_text:", data);
    return NextResponse.json({ error: "Respuesta no válida" }, { status: 500 });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ error: "Error al conectar" }, { status: 500 });
  }
}
