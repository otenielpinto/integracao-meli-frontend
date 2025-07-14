import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white py-8 px-4 border-b border-gray-200">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Conecte sua conta do Mercado Livre
        </h1>
        <p className="text-base text-gray-600">
          Para começar, autorize o acesso à sua conta para integrar com o
          nosso sistema.
        </p>
      </div>
    </header>
  );
}
