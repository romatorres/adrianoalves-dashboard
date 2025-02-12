export interface Category {
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryFormData = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;

export interface CategoryResponse {
  success: boolean;
  data?: Category;
  error?: string;
}

export interface CategoryListResponse {
  success: boolean;
  data?: Category[];
  error?: string;
} 