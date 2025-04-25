// src/app/api/openai/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      console.error("❌ Mensaje inválido:", message);
      return NextResponse.json(
        { error: "Se requiere un mensaje válido" },
        { status: 400 }
      );
    }

    console.log("Clave de API:", "sk-bf69b4275746463ea056c2624ffd95ca" ? "Configurada" : "No encontrada");
    console.log("Enviando solicitud a DeepSeek con mensaje:", message);

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-bf69b4275746463ea056c2624ffd95ca`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Cambiado a deepseek-chat (DeepSeek-V3)
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        stream: false, // Explícitamente no streaming
      }),
    });

    const data = await response.json();

    console.log("Respuesta de DeepSeek:", data);

    if (!response.ok) {
      console.error("❌ Error de DeepSeek:", data);
      return NextResponse.json(
        { error: data.error?.message || "Error desconocido" },
        { status: response.status }
      );
    }

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content.trim();
      return NextResponse.json({ content });
    } else {
      console.error("❌ No se encontraron choices en la respuesta:", data);
      return NextResponse.json(
        { error: "No se recibió una respuesta válida" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json(
      { error: "Error al conectar con el asistente" },
      { status: 500 }
    );
  }
}
