/* "use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CategoryModal } from "@/components/Products/CategoryModal";

interface Category {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}

export function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        const activeCategories = data.filter((cat: Category) => cat.active);
        setCategories(activeCategories);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCategory(null);
    fetchCategories();
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        const res = await fetch(`/api/categories/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await fetchCategories();
        } else {
          alert("Erro ao excluir categoria");
        }
      } catch {
        alert("Erro ao excluir categoria");
      }
    }
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            Nova Categoria
          </button>
          <Link
            href="/dashboard/products"
            className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700"
          >
            Produtos
          </Link>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Nome</th>
              <th className="p-4 w-32">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  Nenhuma categoria cadastrada
                </td>
              </tr>
            ) : (
              categories.map((cat: Category) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{cat.name}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 */
