"use client";

import { useState } from "react";
import { ServiceForm } from "./ServiceForm";
import { ServiceList } from "./ServiceList";
import { Service, ServiceFormData } from "../types";
import { createService, deleteService, updateService } from "../actions";
import ButtonForm from "@/components/ui/button-form";
import { toast } from "react-hot-toast";

interface ServiceManagerProps {
  initialServices: Service[];
}

export function ServiceManager({ initialServices }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      if (selectedService) {
        // Atualizar serviço existente
        const updatedService = await updateService(selectedService.id, data);
        setServices(
          services.map((s) =>
            s.id === selectedService.id ? updatedService : s
          )
        );
        toast.success("Serviço atualizado com sucesso!");
      } else {
        // Criar novo serviço
        const newService = await createService(data);
        setServices([...services, newService]);
        toast.success("Serviço criado com sucesso!");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Erro ao salvar serviço. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("service-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteService(id, imageUrl);
      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedService(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Serviços
        </h1>
        <ButtonForm onClick={() => setShowForm(true)}>
          Adicionar Serviço
        </ButtonForm>
      </div>

      {showForm ? (
        <div
          id="service-form"
          className="mb-8 bg-amber-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedService ? "Editar Serviço" : "Novo Serviço"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-02"
            >
              ✕
            </button>
          </div>
          <ServiceForm
            service={selectedService || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <ServiceList
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
