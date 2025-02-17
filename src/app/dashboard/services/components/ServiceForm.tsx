"use client";

import { useState } from "react";
import { Service, ServiceFormData } from "../types";
import ImageUpload, { confirmUpload } from "@/components/Upload/ImageUpload";
import Input from "@/components/ui/input-custom";
import Textarea from "@/components/ui/textarea-custom";
import ButtonForm from "@/components/ui/button-form";
import { toast } from "react-hot-toast";

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ServiceForm({
  service,
  onSubmit,
  onCancel,
  isLoading,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || 0,
    duration: service?.duration || 30,
    imageUrl: service?.imageUrl || "",
    active: service?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Se houver um arquivo temporário, faz o upload antes de enviar o formulário
      if (formData.imageUrl && formData.imageUrl.startsWith("blob:")) {
        const finalUrl = await confirmUpload();
        if (finalUrl) {
          formData.imageUrl = finalUrl;
        } else {
          toast.error("Erro ao fazer upload da imagem");
          return;
        }
      }

      await onSubmit({
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
      });
    } catch (error) {
      toast.error("Erro ao salvar o serviço");
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
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-02"
        >
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
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-02"
          >
            Preço (R$)
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-02"
          >
            Duração (minutos)
          </label>
          <Input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-02 mb-1"
        >
          URL da Imagem
        </label>
        <ImageUpload
          value={formData.imageUrl || ""}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          disabled={isLoading}
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
        <label
          htmlFor="active"
          className="ml-2 block text-sm font-medium text-gray-02"
        >
          Ativo
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
          {isLoading ? "Salvando..." : service ? "Atualizar" : "Criar Serviço"}
        </ButtonForm>
      </div>
    </form>
  );
}
