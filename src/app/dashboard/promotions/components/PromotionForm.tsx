"use client";

import { useState } from "react";
import { Promotion, PromotionFormData } from "../types";
import ImageUpload, { confirmUpload } from "@/components/Upload/ImageUpload";
import Input from "@/components/Ui/Input";
import Textarea from "@/components/Ui/Textarea";
import Button from "@/components/Ui/Button";
import toast from "react-hot-toast";

interface PromotionFormProps {
  promotion?: Promotion | PromotionFormData;
  onSubmit: (data: PromotionFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PromotionForm({
  promotion,
  onSubmit,
  onCancel,
  isLoading,
}: PromotionFormProps) {
  const [formData, setFormData] = useState<PromotionFormData>({
    title: promotion?.title || "",
    description: promotion?.description || "",
    imageUrl: promotion?.imageUrl || "",
    startDate: promotion?.startDate
      ? new Date(promotion.startDate).toISOString().split("T")[0]
      : "",
    endDate: promotion?.endDate
      ? new Date(promotion.endDate).toISOString().split("T")[0]
      : "",
    discount: promotion?.discount || 0,
    active: promotion?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      if (!formData.title.trim()) {
        toast.error("O título da promoção é obrigatório");
        return;
      }

      if (!formData.description.trim()) {
        toast.error("A descrição da promoção é obrigatória");
        return;
      }

      if (!formData.imageUrl?.trim()) {
        toast.error("A URL da imagem da promoção é obrigatória");
        return;
      }

      if (!formData.startDate) {
        toast.error("A data de início da promoção é obrigatória");
        return;
      }

      if (!formData.endDate) {
        toast.error("A data de término da promoção é obrigatória");
        return;
      }

      await onSubmit(formData);
    } catch (error) {
      toast.error("Erro ao salvar promoção");
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
          ? Number(value) || 0
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-02"
        >
          Título
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          className="mt-1 block w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-02"
          >
            Data de Início
          </label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-02"
          >
            Data de Término
          </label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="discount"
          className="block text-sm font-medium text-gray-02"
        >
          Desconto (%)
        </label>
        <Input
          type="number"
          id="discount"
          name="discount"
          value={formData.discount || ""}
          onChange={handleChange}
          min="0"
          max="100"
          className="mt-1 block w-full"
        />
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
        <label htmlFor="active" className="ml-2 block text-sm text-gray-02">
          Ativa
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          variant="outline"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} variant="secondary">
          {isLoading
            ? "Salvando..."
            : promotion
            ? "Atualizar"
            : "Criar Promoção"}
        </Button>
      </div>
    </form>
  );
}
