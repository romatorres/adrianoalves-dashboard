"use client";

import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { Product, ProductFormData } from "../types";
import { createProduct, deleteProduct, updateProduct } from "../actions";
import ButtonForm from "@/components/Ui/button-form";
import { toast } from "react-hot-toast";

interface ProductManagerProps {
  initialProducts: Product[];
}

export function ProductManager({ initialProducts }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      if (selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct.id, data);
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id ? updatedProduct : p
          )
        );
        toast.success("Produto atualizado com sucesso!");
      } else {
        const newProduct = await createProduct(data);
        setProducts([...products, newProduct]);
        toast.success("Produto criado com sucesso!");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Erro ao salvar produto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("product-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteProduct(id, imageUrl);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      throw error; // Let ProductList handle the error toast
    }
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Produtos
        </h1>
        <div className="flex gap-4">
          <ButtonForm onClick={() => setShowForm(true)}>
            Adicionar Produto
          </ButtonForm>
        </div>
      </div>

      {showForm ? (
        <div
          id="product-form"
          className="mb-8 bg-amber-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedProduct ? "Editar Produto" : "Novo Produto"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-02"
            >
              ✕
            </button>
          </div>
          <ProductForm
            product={selectedProduct || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
