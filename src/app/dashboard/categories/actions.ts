import { Category, CategoryFormData } from "./types";

export class CategoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CategoryError';
  }
}

export async function createCategory(data: Omit<Category, "id">) {
  try {
    const response = await fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao criar categoria");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

export async function updateCategory(
  id: string,
  data: Partial<CategoryFormData>
): Promise<Category> {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new CategoryError(result.error || 'Erro ao atualizar categoria');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error instanceof CategoryError ? error : new CategoryError('Erro ao atualizar categoria');
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new CategoryError(result.error || 'Erro ao excluir categoria');
    }
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    throw error instanceof CategoryError ? error : new CategoryError('Erro ao excluir categoria');
  }
}

export async function getCategory(id: string): Promise<Category> {
  try {
    const response = await fetch(`/api/categories/${id}`);
    
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new CategoryError(result.error || 'Erro ao buscar categoria');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    throw error instanceof CategoryError ? error : new CategoryError('Erro ao buscar categoria');
  }
} 