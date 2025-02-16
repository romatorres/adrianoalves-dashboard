"use client";

import Button from "@/components/ui/button";
import { Category } from "../types";
import { useState } from "react";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { toast } from "react-hot-toast";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
}

export function CategoryList({
  categories = [],
  onEdit,
  onDelete,
}: CategoryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setDeletingId(categoryToDelete.id);
      await onDelete(categoryToDelete.id);
      setShowDeleteModal(false);
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Erro ao excluir categoria. Tente novamente.");
    } finally {
      setDeletingId(null);
      setCategoryToDelete(null);
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-03 py-8">
        Nenhuma categoria encontrada
      </div>
    );
  }

  return (
    <>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-amber-100 divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-background">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-02 line-clamp-2">
                      {category.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                        category.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.active ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      onClick={() => onEdit(category)}
                      variant="secondary_card"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(category)}
                      disabled={deletingId === category.id}
                      variant="danger_card"
                    >
                      {deletingId === category.id ? "Excluindo..." : "Excluir"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Categoria"
        message={`Tem certeza que deseja excluir a Categoria ${categoryToDelete?.name}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
