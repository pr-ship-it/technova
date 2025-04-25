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
