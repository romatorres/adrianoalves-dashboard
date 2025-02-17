import Link from "next/link";
import ButtonForm from "@/components/Ui/button-form";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Acesso Não Autorizado
        </h1>
        <p className="text-gray-600 mb-8">
          Você não tem permissão para acessar esta página.
        </p>
        <Link href="/dashboard">
          <ButtonForm variant="primary" className="w-full">
            Voltar para Dashboard
          </ButtonForm>
        </Link>
      </div>
    </div>
  );
}
