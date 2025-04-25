// src/app/api/openai/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Obtener el mensaje del cuerpo de la solicitud
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Se requiere un mensaje válido" },
        { status: 400 }
      );
    }

    // Hacer la solicitud a la API de OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`, // Clave de entorno
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error de OpenAI:", data);
      return NextResponse.json(
        { error: data.error?.message || "Error desconocido" },
        { status: response.status }
      );
    }

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content.trim();
      return NextResponse.json({ content });
    } else {
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
