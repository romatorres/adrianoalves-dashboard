"use client";

import { useState } from "react";
import { GalleryForm } from "./GalleryForm";
import { GalleryList } from "./GalleryList";
import { GalleryImage, GalleryImageFormData } from "../types";
import {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
} from "../actions";
import ButtonForm from "@/components/Ui/button-form";
import { toast } from "react-hot-toast";

interface GalleryManagerProps {
  initialImages: GalleryImage[];
}

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: GalleryImageFormData) => {
    setIsLoading(true);
    try {
      if (selectedImage) {
        // Atualizar imagem existente
        const updatedImage = await updateGalleryImage(selectedImage.id, data);
        setImages(
          images.map((img) =>
            img.id === selectedImage.id ? updatedImage : img
          )
        );
        toast.success("Imagem atualizada com sucesso!");
      } else {
        // Criar nova imagem
        const newImage = await createGalleryImage(data);
        setImages([...images, newImage]);
        toast.success("Imagem adicionada com sucesso!");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving gallery image:", error);
      toast.error("Erro ao salvar imagem. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("gallery-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      setIsLoading(true);
      await deleteGalleryImage(id, imageUrl);
      setImages((prev) => prev.filter((image) => image.id !== id));
    } catch (error) {
      console.error("[Delete] Erro ao excluir imagem:", error);
      toast.error("Erro ao excluir imagem. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setSelectedImage(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Galeria
        </h1>
        <ButtonForm onClick={() => setShowForm(true)} variant="primary">
          Adicionar Imagem
        </ButtonForm>
      </div>

      {showForm ? (
        <div
          id="gallery-form"
          className="mb-8 bg-amber-100 p-6 rounded-lg shadow scroll-mt-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedImage ? "Editar Imagem" : "Nova Imagem"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-01"
            >
              ✕
            </button>
          </div>
          <GalleryForm
            image={selectedImage || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <GalleryList
        images={images}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
