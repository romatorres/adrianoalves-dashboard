"use client";

import { useState } from "react";
import { Category, CategoryFormData } from "../types";
import ButtonForm from "@/components/ui/ButtonForm";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import toast from "react-hot-toast";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: CategoryFormData;
  onCancel: () => void;
}

export function CategoryForm({
  category,
  onSubmit,
  isLoading,
  onCancel,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || "",
    description: category?.description || "",
    active: category?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("O nome da categoria é obrigatório");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error("Erro ao salvar categoria");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-02">
          Nome
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-02"
        >
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
        />
        <label htmlFor="active" className="ml-2 block text-sm text-gray-02">
          Ativa
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <ButtonForm
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          variant="outline"
        >
          Cancelar
        </ButtonForm>
        <ButtonForm type="submit" disabled={isLoading} variant="secondary">
          {isLoading ? "Salvando..." : category ? "Atualizar" : "Criar"}
        </ButtonForm>
      </div>
    </form>
  );
}
