"use client";

import { useState } from "react";
import { GalleryImage } from "../types";
import Image from "next/image";
import { ImageModal } from "@/components/ImageModal/ImageModal";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import ButtonForm from "@/components/ui/button-form";
import { toast } from "react-hot-toast";

interface GalleryListProps {
  images: GalleryImage[];
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
}

export function GalleryList({
  images = [],
  onEdit,
  onDelete,
}: GalleryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);

  const handleDelete = (gallery: GalleryImage) => {
    setImageToDelete(gallery);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;

    try {
      setDeletingId(imageToDelete.id);
      await onDelete(imageToDelete.id, imageToDelete.imageUrl);
      setShowDeleteModal(false);
      toast.success("Imagem excluída com sucesso!");
    } catch (error) {
      console.error("[Delete] Erro ao excluir imagem:", error);
      toast.error("Erro ao excluir imagem. Por favor, tente novamente.");
    } finally {
      setDeletingId(null);
      setImageToDelete(null);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhuma imagem encontrada
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative bg-amber-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div
              className="relative aspect-[4/3] w-full mb-4 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.imageUrl}
                alt={image.title || ""}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-lg object-cover"
                priority={false}
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-medium text-background">
              {image.title}
            </h3>
            {image.description && (
              <p className="mt-1 text-sm text-gray-02">{image.description}</p>
            )}
            <div className="mt-2 space-y-1">
              {image.featured && (
                <span className="text-xs text-primary">⭐ Destaque</span>
              )}
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                  image.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {image.active ? "Ativa" : "Inativa"}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <ButtonForm
                onClick={() => onEdit(image)}
                variant="secondary_card"
              >
                Editar
              </ButtonForm>
              <ButtonForm
                onClick={() => handleDelete(image)}
                disabled={deletingId === image.id}
                className="disabled:opacity-50"
                variant="danger_card"
              >
                {deletingId === image.id ? "Excluindo..." : "Excluir"}
              </ButtonForm>
            </div>
          </div>
        ))}

        {selectedImageIndex !== null && (
          <ImageModal
            images={images}
            currentImageIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
            onNext={() =>
              setSelectedImageIndex((prev) =>
                prev !== null && prev < images.length - 1 ? prev + 1 : prev
              )
            }
            onPrevious={() =>
              setSelectedImageIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : prev
              )
            }
          />
        )}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Foto"
        message={`Tem certeza que deseja excluir a foto ${imageToDelete?.title}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
