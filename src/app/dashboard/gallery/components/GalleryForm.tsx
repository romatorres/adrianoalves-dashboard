"use client";

import { useState } from "react";
import { GalleryImage, GalleryImageFormData } from "../types";
import ImageUpload, { confirmUpload } from "@/components/Upload/ImageUpload";
import Input from "@/components/Ui/Input";
import Textarea from "@/components/Ui/Textarea";
import Button from "@/components/Ui/Button";
import toast from "react-hot-toast";

interface GalleryFormProps {
  image?: GalleryImage;
  onSubmit: (data: GalleryImageFormData) => Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
}

export function GalleryForm({
  image,
  onSubmit,
  isLoading,
  onCancel,
}: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryImageFormData>({
    title: image?.title || "",
    description: image?.description || "",
    imageUrl: image?.imageUrl || "",
    featured: image?.featured ?? false,
    active: image?.active ?? true,
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

      await onSubmit(formData);
    } catch (error) {
      toast.error("Erro ao salvar imagem");
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
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-02 mb-1"
        >
          Imagem
        </label>
        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-02">
            Destaque
          </label>
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
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          variant="outline"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} variant="secondary">
          {isLoading ? "Salvando..." : image ? "Atualizar" : "Incluir Foto"}
        </Button>
      </div>
    </form>
  );
}
