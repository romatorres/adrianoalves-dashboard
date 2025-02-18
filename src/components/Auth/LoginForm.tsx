"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "../Ui/input-custom";
import ButtonForm from "../Ui/button-form";
import { toast } from "react-hot-toast";
import Link from "next/link";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        switch (result.error) {
          case "Credenciais incompletas":
            toast.error("Por favor, preencha todos os campos");
            break;
          case "Email não encontrado":
            toast.error("Email não cadastrado");
            break;
          case "Senha incorreta":
            toast.error("Senha incorreta");
            break;
          default:
            toast.error("Erro ao fazer login");
        }
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch {
      toast.error("Erro ao conectar ao servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          required
          autoComplete="current-password"
        />
      </div>
      <div className="flex flex-col gap-6 pt-10 items-center">
        <ButtonForm type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Entrando..." : "Entrar"}
        </ButtonForm>
        <Link href="/">
          <p className="text-gray-02">Voltar para Home</p>
        </Link>
      </div>
    </form>
  );
}
