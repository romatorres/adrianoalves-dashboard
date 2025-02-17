"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "../Ui/input-custom";
import ButtonForm from "../Ui/button-form";
import { toast } from "react-hot-toast";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input type="email" name="email" placeholder="Email" required />
      </div>
      <div>
        <Input type="password" name="password" placeholder="Senha" required />
      </div>
      <ButtonForm type="submit" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </ButtonForm>
    </form>
  );
}
