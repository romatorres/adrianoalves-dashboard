import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// Função para verificar se é uma URL do UploadThing
export const isUploadThingUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === "utfs.io";
  } catch {
    return false;
  }
};

// Função para extrair o fileKey da URL
export const getFileKey = (url: string) => {
  if (!isUploadThingUrl(url)) {
    throw new Error("URL não é do UploadThing");
  }

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const fileKey = pathParts[pathParts.length - 1];

       if (!fileKey) {
      throw new Error("FileKey não encontrado na URL");
    }

    return fileKey;
  } catch (error) {
    console.error("[UploadThing] Erro ao extrair fileKey:", error);
    throw error;
  }
};

// Função genérica para deletar qualquer arquivo do UploadThing
export const deleteUploadThingFile = async (url: string) => {
  if (!isUploadThingUrl(url)) {
    throw new Error("URL não é do UploadThing");
  }

  try {
    const fileKey = getFileKey(url);
    const response = await fetch(`/api/uploadthing/delete?fileKey=${fileKey}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Falha ao deletar arquivo do UploadThing");
    }
  } catch (error) {
    console.error("[UploadThing] Erro ao deletar arquivo:", error);
    throw error;
  }
};
