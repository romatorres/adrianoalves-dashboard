"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Upload, X } from "lucide-react";

export function UserImageUpload() {
  const { data: session, update: updateSession } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida");
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/users/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer upload da imagem");
      }

      const { imageUrl } = await response.json();

      // Atualizar a sessão com a nova imagem
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          image: imageUrl,
        },
      });

      // Forçar revalidação da sessão
      window.location.reload();
    } catch (error) {
      console.error("Erro no upload:", error);
      setError("Erro ao fazer upload da imagem");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-100">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="Foto do perfil"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-amber-600 font-semibold">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white" />
          ) : (
            <Upload className="w-6 h-6 text-white" />
          )}
        </label>
      </div>

      {error && (
        <div className="absolute top-full mt-2 w-48 bg-red-50 text-red-500 text-xs p-2 rounded">
          {error}
          <button
            onClick={() => setError("")}
            className="absolute top-1 right-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
