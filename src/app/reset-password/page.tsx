import { ResetPasswordForm } from "@/components/Auth/ResetPasswordForm";
import Image from "next/image";

type PageProps = {
  params?: { [key: string]: string };
  searchParams: { [key: string]: string | undefined };
};

export default async function ResetPassword({ searchParams }: PageProps) {
  const token = searchParams?.token || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/img/logo.png"
            alt="Logo Barbearia"
            width={200}
            height={50}
            className="object-contain mb-6"
          />
          <h1 className="text-2xl font-bold">Redefinir Senha</h1>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Digite sua nova senha
          </p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
