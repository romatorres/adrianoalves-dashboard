"use client";

import { useState } from "react";
import ButtonForm from "@/components/ui/ButtonForm";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  active: boolean;
}

interface UserFormProps {
  user: User | null;
  onSubmit: (data: User) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: "admin",
    active: user?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (formData.password && formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email inválido");
      return;
    }

    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-02">Nome</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-02">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-02">Senha</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
        />
      </div>

      <input type="hidden" name="role" value="admin" />

      <div className="flex items-center">
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
        />
        <label className="ml-2 block text-sm text-gray-900">Ativo</label>
      </div>

      <div className="flex justify-end space-x-2">
        <ButtonForm type="submit" disabled={isLoading} variant="primary">
          {isLoading ? "Salvando..." : "Salvar"}
        </ButtonForm>
      </div>
    </form>
  );
}
