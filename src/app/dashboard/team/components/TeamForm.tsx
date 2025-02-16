"use client";

import { useState } from "react";
import { TeamMember, TeamMemberFormData } from "../types";
import ImageUpload, { confirmUpload } from "@/components/Upload/ImageUpload";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";

interface TeamFormProps {
  member?: TeamMember;
  onSubmit: (data: TeamMemberFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TeamForm({
  member,
  onSubmit,
  onCancel,
  isLoading,
}: TeamFormProps) {
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: member?.name || "",
    role: member?.role || "",
    imageUrl: member?.imageUrl || "",
    bio: member?.bio || "",
    instagram: member?.instagram || "",
    facebook: member?.facebook || "",
    linkedin: member?.linkedin || "",
    active: member?.active ?? true,
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

      if (!formData.name.trim()) {
        toast.error("O nome do membro é obrigatório");
        return;
      }

      await onSubmit(formData);
    } catch (error) {
      toast.error("Erro ao salvar membro do time");
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
          htmlFor="role"
          className="block text-sm font-medium text-gray-02"
        >
          Cargo
        </label>
        <Input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-02">
          Biografia
        </label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="instagram"
          className="block text-sm font-medium text-gray-02"
        >
          Instagram
        </label>
        <Input
          type="text"
          id="instagram"
          placeholder="https://www.instagram.com/seu-perfil"
          name="instagram"
          value={formData.instagram || ""}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-02"
        >
          Facebook
        </label>
        <Input
          type="text"
          id="facebook"
          placeholder="https://www.facebook.com/seu-perfil"
          name="facebook"
          value={formData.facebook || ""}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-gray-02"
        >
          LinkedIn
        </label>
        <Input
          type="text"
          id="linkedin"
          placeholder="https://www.linkedin.com/in/seu-perfil"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
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
          Ativo
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
          {isLoading ? "Salvando..." : member ? "Atualizar" : "Criar Membro"}
        </Button>
      </div>
    </form>
  );
}
