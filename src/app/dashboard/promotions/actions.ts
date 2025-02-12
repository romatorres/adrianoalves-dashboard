import { Promotion } from "./types";
import {
  deleteUploadThingFile,
  isUploadThingUrl,
} from "@/utils/uploadthing-config";

export async function createPromotion(data: Omit<Promotion, "id">) {
  try {
    const response = await fetch('/api/promotions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create promotion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating promotion:", error);
    throw error;
  }
}

export async function updatePromotion(id: string, data: Omit<Promotion, "id">) {
  try {
    const response = await fetch(`/api/promotions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update promotion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating promotion:", error);
    throw error;
  }
}

export async function deletePromotion(id: string, imageUrl: string) {
  try {
    if (isUploadThingUrl(imageUrl)) {
      try {
        await deleteUploadThingFile(imageUrl);
      } catch (error) {
        console.error("[Delete] Erro ao deletar do UploadThing:", error);
      }
    }

    const response = await fetch(`/api/promotions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete promotion");
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Error deleting promotion:", error);
    throw error;
  }
}

export async function getPromotion(id: string) {
  try {
    const response = await fetch(`/api/promotions/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch promotion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching promotion:", error);
    throw error;
  }
}
