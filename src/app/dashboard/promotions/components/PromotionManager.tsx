"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PromotionFormData } from "../types";
import { createPromotion, updatePromotion } from "../actions";
import { PromotionForm } from "./PromotionForm";
import { PromotionList } from "./PromotionList";
import { Promotion } from "../types";
import { deletePromotion } from "../actions";
import Button from "@/components/ui/button";

interface PromotionManagerProps {
  initialData?: PromotionFormData;
  initialPromotions?: Promotion[];
  onSuccess?: () => void;
}

export default function PromotionManager({
  initialData,
  initialPromotions = [],
  onSuccess,
}: PromotionManagerProps) {
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: PromotionFormData) => {
    try {
      setLoading(true);

      // Converte as strings de data para objetos Date e adiciona campos necessários
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (selectedPromotion) {
        const updateData = {
          ...formattedData,
          createdAt: selectedPromotion.createdAt,
          updatedAt: new Date(),
        };
        await updatePromotion(selectedPromotion.id!, updateData);
        setPromotions(
          promotions.map((p) =>
            p.id === selectedPromotion.id ? { ...p, ...updateData } : p
          )
        );
        toast.success("Promoção atualizada com sucesso!");
      } else {
        const createData = {
          ...formattedData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const newPromotion = await createPromotion(createData);
        setPromotions([...promotions, newPromotion]);
        toast.success("Promoção criada com sucesso!");
      }

      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving promotion:", error);
      toast.error("Erro ao salvar promoção");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("promotion-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deletePromotion(id, imageUrl);
      setPromotions(promotions.filter((p) => p.id !== id));
      toast.success("Promoção excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir promoção");
      console.error("Error deleting promotion:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedPromotion(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Promoções
        </h1>
        <Button onClick={() => setShowForm(true)} variant="primary">
          Adicionar Promoção
        </Button>
      </div>

      {showForm ? (
        <div
          id="promotion-form"
          className="mb-8 bg-amber-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedPromotion ? "Editar Promoção" : "Nova Promoção"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-01"
            >
              ✕
            </button>
          </div>
          <PromotionForm
            promotion={selectedPromotion || initialData}
            onSubmit={handleSubmit}
            isLoading={loading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <PromotionList
        promotions={promotions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
