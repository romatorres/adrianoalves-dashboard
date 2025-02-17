"use client";

import { useState } from "react";
import { FileUploader } from "@/components/Upload/FileUploader";
import { useUploadThing } from "@/utils/uploadthing-config";
import Input from "@/components/Ui/input-custom";
import ButtonForm from "@/components/Ui/button-form";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

// Mover a função para fora do componente e exportá-la
let tempFileRef: File | null = null;
let startUploadRef: ReturnType<typeof useUploadThing>["startUpload"] | null =
  null;

export const confirmUpload = async () => {
  if (!tempFileRef || !startUploadRef) return null;

  try {
    const uploadResult = await startUploadRef([tempFileRef]);
    if (!uploadResult?.[0]?.url) {
      throw new Error("Falha no upload da imagem");
    }
    return uploadResult[0].url;
  } catch (error) {
    throw error;
  } finally {
    tempFileRef = null;
  }
};

export default function ImageUpload({
  value,
  onChange,
  disabled,
}: ImageUploadProps) {
  const [isExternalUrl, setIsExternalUrl] = useState(true);
  const { startUpload } = useUploadThing("imageUploader");

  // Atualizar as referências
  startUploadRef = startUpload;

  const handleFileSelected = (file: File) => {
    tempFileRef = file;
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);
    toast.success("Imagem carregada! Clique em salvar para confirmar.");
  };

  const handleExternalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <ButtonForm
          type="button"
          onClick={() => setIsExternalUrl(true)}
          variant={`${isExternalUrl ? "link_enabled" : "link_disabled"}`}
        >
          Link Externo
        </ButtonForm>
        <ButtonForm
          type="button"
          onClick={() => setIsExternalUrl(false)}
          variant={`${isExternalUrl ? "link_disabled" : "link_enabled"}`}
        >
          Upload Local
        </ButtonForm>
      </div>

      {isExternalUrl ? (
        <Input
          type="url"
          placeholder="Cole a URL da imagem aqui"
          value={value || ""}
          onChange={handleExternalUrlChange}
          disabled={disabled}
        />
      ) : (
        <FileUploader
          value={value}
          onChange={handleFileSelected}
          disabled={disabled}
        />
      )}

      {value && !isExternalUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <div className="relative w-52 h-52">
            <Image
              src={value}
              alt="Preview"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
