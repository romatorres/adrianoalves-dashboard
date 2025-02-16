"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../ui/ButtonForm";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import Link from "next/link";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!email || !password) {
        toast.error("Por favor, preencha todos os campos");
        return;
      }

      const result = await signIn("credentials", {
        email: email.toString(),
        password: password.toString(),
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Login realizado com sucesso!");
        window.location.href = "/dashboard";
      } else {
        console.error("Erro de login:", result?.error);
        switch (result?.error) {
          case "CredentialsSignin":
            toast.error("Email ou senha incorretos");
            break;
          case "Email não encontrado":
            toast.error("Email não cadastrado");
            break;
          case "Senha incorreta":
            toast.error("Senha incorreta");
            break;
          case "Usuário desativado":
            toast.error("Usuário desativado");
            break;
          default:
            toast.error(`Erro ao fazer login: ${result?.error}`);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erro ao conectar ao servidor");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-02"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-02"
        >
          Senha
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <div className="text-sm">
        <Link
          href="/forgot-password"
          className="text-primary hover:text-primary/80"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <div className="pt-10 flex flex-col gap-6">
        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          className="w-full"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
        <Link href="/">
          <Button variant="link" className="w-full">
            Voltar para Home
          </Button>
        </Link>
      </div>
    </form>
  );
}
