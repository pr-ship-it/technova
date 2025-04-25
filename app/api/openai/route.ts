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

    console.log("Clave de API:" ? "Configurada" : "No encontrada");
    console.log("Enviando solicitud a Hugging Face con mensaje:", message);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${message} [/INST]`, // Formato de instrucción para Mixtral
          parameters: {
            max_new_tokens: 200, // Limita la longitud de la respuesta
            temperature: 0.7,
            return_full_text: false, // Solo devuelve la respuesta generada
          },
        }),
      }
    );

    const data = await response.json();

    console.log("Respuesta de Hugging Face:", data);

    if (!response.ok) {
      console.error("❌ Error de Hugging Face:", data);
      return NextResponse.json(
        { error: data.error?.message || "Error desconocido" },
        { status: response.status }
      );
    }

    if (data && data[0]?.generated_text) {
      const content = data[0].generated_text.trim();
      return NextResponse.json({ content });
    } else {
      console.error("❌ No se encontró generated_text en la respuesta:", data);
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
