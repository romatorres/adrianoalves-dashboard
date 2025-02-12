"use client";

import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";
import { Category, CategoryFormData } from "../types";
import { createCategory, deleteCategory, updateCategory } from "../actions";
import Button from "@/components/Ui/Button";
import toast from "react-hot-toast";

interface CategoryManagerProps {
  initialCategories: Category[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      if (selectedCategory) {
        const updatedCategory = await updateCategory(selectedCategory.id, data);
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id ? updatedCategory : c
          )
        );
        toast.success("Categoria atualizada com sucesso!");
      } else {
        const newCategory = await createCategory(data);
        setCategories([...categories, newCategory]);
        toast.success("Categoria criada com sucesso!");
      }
      handleCloseForm();
    } catch (error) {
      toast.error("Erro ao salvar categoria");
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir categoria");
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedCategory(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Categorias
        </h1>
        <Button onClick={() => setShowForm(true)}>Adicionar Categoria</Button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-amber-100 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory ? "Editar Categoria" : "Nova Categoria"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-01"
            >
              ✕
            </button>
          </div>
          <CategoryForm
            category={selectedCategory || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
