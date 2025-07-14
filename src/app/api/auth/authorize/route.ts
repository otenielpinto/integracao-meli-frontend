import { NextResponse } from "next/server";
import mercadoLivreService from "@/lib/mercadoLivreService";

export async function GET() {
  try {
    const authUrl = await mercadoLivreService.getAuthUrl();
    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Erro ao gerar a URL de autorização:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
