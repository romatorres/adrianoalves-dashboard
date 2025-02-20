"use client";

import { Product } from "@/types";
import { useState } from "react";
import Image from "next/image";
import ButtonForm from "@/components/Ui/button-form";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { toast } from "react-hot-toast";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
}

export function ProductList({
  products = [],
  onEdit,
  onDelete,
}: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeletingId(productToDelete.id);
      await onDelete(productToDelete.id, productToDelete.imageUrl || "");
      setShowDeleteModal(false);
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Erro ao excluir produto. Tente novamente.");
    } finally {
      setDeletingId(null);
      setProductToDelete(null);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-amber-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full mb-4">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-medium text-Background">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-02">{product.description}</p>
            <div className="mt-2 space-y-1">
              <div className="text-lg font-medium text-price">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </div>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                  product.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <ButtonForm
                onClick={() => onEdit(product)}
                variant="secondary_card"
              >
                Editar
              </ButtonForm>
              <ButtonForm
                onClick={() => handleDelete(product)}
                disabled={deletingId === product.id}
                variant="danger_card"
              >
                {deletingId === product.id ? "Excluindo..." : "Excluir"}
              </ButtonForm>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir o produto ${productToDelete?.name}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
