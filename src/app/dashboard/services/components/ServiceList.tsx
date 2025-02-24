"use client";

import { Service } from "@/types";
import { useState } from "react";
import Image from "next/image";
import ButtonForm from "@/components/Ui/button-form";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { toast } from "react-hot-toast";

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
}

export function ServiceList({
  services = [],
  onEdit,
  onDelete,
}: ServiceListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const handleDelete = (service: Service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      setDeletingId(serviceToDelete.id);
      await onDelete(serviceToDelete.id, serviceToDelete.imageUrl || "");
      setShowDeleteModal(false);
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Erro ao excluir serviço. Tente novamente.");
    } finally {
      setDeletingId(null);
      setServiceToDelete(null);
    }
  };

  if (!services || services.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum serviço encontrado
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="bg-amber-100 p-4 rounded-lg shadow">
            <div className="relative aspect-[4/3] w-full mb-4">
              <Image
                src={service.imageUrl || "/img/default-service.jpg"}
                alt={service.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-background">
              {service.name}
            </h3>
            <p className="mt-1 text-sm text-gray-02">{service.description}</p>
            <p className="mt-2 text-primary font-semibold">
              R$ {service.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-02">
              Duração: {service.duration} minutos
            </p>
            <div className="mt-2">
              <span
                className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                  service.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {service.active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <ButtonForm
                onClick={() => onEdit(service)}
                variant="secondary_card"
              >
                Editar
              </ButtonForm>
              <ButtonForm
                onClick={() => handleDelete(service)}
                disabled={deletingId === service.id}
                className="disabled:opacity-50"
                variant="danger_card"
              >
                {deletingId === service.id ? "Excluindo..." : "Excluir"}
              </ButtonForm>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Serviço"
        message={`Tem certeza que deseja excluir o serviço ${serviceToDelete?.name}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
