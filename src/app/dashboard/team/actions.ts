// Funções de ação para gerenciar equipe (create, update, delete)
import { TeamMember } from "./types";
import {
  deleteUploadThingFile,
  isUploadThingUrl,
} from "@/utils/uploadthing-config";

export async function createTeamMember(data: Omit<TeamMember, "id">) {
  try {
    const response = await fetch('/api/team', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create team member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating team member:", error);
    throw error;
  }
}

export async function updateTeamMember(id: string, data: Omit<TeamMember, "id">) {
  try {
    const response = await fetch(`/api/team/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update team member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating team member:", error);
    throw error;
  }
}

export async function deleteTeamMember(id: string, imageUrl: string) {
  try {
    if (isUploadThingUrl(imageUrl)) {
      try {
        await deleteUploadThingFile(imageUrl);
      } catch (error) {
        console.error("[Delete] Erro ao deletar do UploadThing:", error);
      }
    }

    const response = await fetch(`/api/team/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete team member");
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
}

export async function getTeamMember(id: string) {
  try {
    const response = await fetch(`/api/team/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch team member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching team member:", error);
    throw error;
  }
}
