import { ServiceFormData } from "./types";
import {
  deleteUploadThingFile,
  isUploadThingUrl,
} from "@/utils/uploadthing-config";

export async function createService(data: ServiceFormData) {
  try {
    const response = await fetch(`/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function updateService(
  id: string,
  data: Partial<ServiceFormData>
) {
  try {
    const response = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        price: data.price ? Number(data.price) : undefined,
        duration: data.duration ? Number(data.duration) : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

export async function deleteService(id: string, imageUrl: string) {
  try {

    // Verificar se é uma URL do UploadThing
    if (isUploadThingUrl(imageUrl)) {
      try {
        await deleteUploadThingFile(imageUrl);
      } catch (error) {
        console.error("[Delete] Erro ao deletar do UploadThing:", error);
      }
    } else {
      
    }

    // Depois deleta o registro do banco de dados
    const response = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

export async function getService(id: string) {
  try {
    const response = await fetch(`/api/services/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}
