"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-ml-yellow p-4">
          <div className="w-full max-w-md rounded-lg bg-ml-gray p-8 shadow-lg">
            <div className="text-center">
              <p className="mb-4 text-ml-black">Carregando...</p>
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ml-blue border-r-transparent"></div>
            </div>
          </div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const authCode = searchParams.get("code");
      setCode(authCode);

      if (authCode) {
        console.log("Código de integração recebido:", authCode);

        await fetch(`/api/auth/callback`, {
          method: "POST",
          body: JSON.stringify({ code: authCode }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!companyName.trim() || !cnpj.trim()) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Set submitted state without API call
      setSubmitted(true);
      setFormError("");

      // Format the WhatsApp message with company details and authorization code
      const whatsappMessage = encodeURIComponent(
        `Olá! Aqui estão os dados da integração da minha empresa :\n\n` +
          `Nome da Empresa: ${companyName}\n` +
          `CNPJ: ${cnpj}\n` +
          `Código de Integração: ${code}`
      );

      // Open WhatsApp in a new tab
      window.open(
        `https://wa.me/5551998664776?text=${whatsappMessage}`,
        "_blank",
        "noopener noreferrer"
      );
    } catch (error) {
      console.error("Erro ao processar:", error);
      setFormError("Ocorreu um erro. Tente novamente.");
    }
  };

  // Format CNPJ as user types (XX.XXX.XXX/XXXX-XX)
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 14) {
      value = value.slice(0, 14);
    }

    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }

    setCnpj(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ml-yellow p-4">
      <div className="w-full max-w-md rounded-lg bg-ml-gray p-8 shadow-lg">
        {loading ? (
          <div className="text-center">
            <p className="mb-4 text-ml-black">Processando integração...</p>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ml-blue border-r-transparent"></div>
          </div>
        ) : code ? (
          <div className="text-center">
            <h1 className="mb-6 text-2xl font-bold text-ml-black">
              Integração Concluída
            </h1>
            <p className="mb-4 text-ml-black">
              Integração realizada com sucesso.
            </p>
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded text-left">
              <p className="font-bold mb-2">Importante:</p>
              <p className="mb-2">Anote o código de integração abaixo:</p>
              <p className="bg-white p-2 rounded break-all font-mono text-sm">
                {code}
              </p>
            </div>

            {!submitted ? (
              <>
                <p className="mb-4 text-ml-black">
                  Por favor, informe os dados da sua empresa:
                </p>

                {formError && (
                  <div className="mb-4 p-2 bg-red-100 border border-red-400 rounded text-red-700">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="text-left">
                  <div className="mb-4">
                    <label
                      htmlFor="companyName"
                      className="block mb-1 text-sm font-medium text-ml-black"
                    >
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-ml-blue"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="cnpj"
                      className="block mb-1 text-sm font-medium text-ml-black"
                    >
                      CNPJ
                    </label>
                    <input
                      type="text"
                      id="cnpj"
                      value={cnpj}
                      onChange={handleCnpjChange}
                      placeholder="CNPJ da sua empresa"
                      autoComplete="off"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-ml-blue"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300 shadow-md border border-blue-700"
                  >
                    Enviar pelo WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-green-600 font-medium">
                  Informações registradas com sucesso!
                </p>
                <p className="text-ml-black">
                  Você pode fechar esta janela agora.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-ml-red">
            <h1 className="mb-6 text-2xl font-bold">Erro na Integração</h1>
            <p>Não foi possível obter o código de integração.</p>
          </div>
        )}
      </div>
    </main>
  );
}
