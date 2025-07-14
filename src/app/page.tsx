"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePermitir = async () => {
    try {
      const response = await fetch("/api/auth/authorize");
      const data = await response.json();

      if (response.ok) {
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error("Erro do servidor:", data.error);
      }
    } catch (error) {
      console.error("Falha ao obter o URL de autorização:", error);
    }
  };

  const handleCancelar = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex flex-grow flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Finalize a conexão com o Mercado Livre
          </h1>
          <p className="mb-8 text-gray-500">
            Você será redirecionado para a página de integração do Mercado Livre
            para concluir a integração de forma segura.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handlePermitir}
            >
              Continuar e integrar
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
