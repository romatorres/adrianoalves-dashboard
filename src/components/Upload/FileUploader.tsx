"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface FileUploaderProps {
  disabled?: boolean;
  onChange: (file: File) => void;
  value?: string;
  isUploading?: boolean;
}

export function FileUploader({
  disabled,
  onChange,
  isUploading,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > 4 * 1024 * 1024) {
          toast.error("Arquivo muito grande. Limite de 4MB");
          return;
        }
        toast.loading("Preparando imagem...", { duration: 1000 });
        onChange(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    disabled: disabled || isUploading,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 cursor-pointer
        transition-colors duration-200 ease-in-out
        ${isDragActive ? "border-amber-500 bg-amber-50" : "border-gray-300"}
        ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
        hover:border-amber-500 hover:bg-amber-50
      `}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        {isUploading ? (
          <p className="text-sm text-gray-500">Enviando...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              Arraste e solte uma imagem aqui, ou clique para selecionar
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG, JPEG ou WEBP (max. 4MB)
            </p>
          </>
        )}
      </div>
    </div>
  );
}
