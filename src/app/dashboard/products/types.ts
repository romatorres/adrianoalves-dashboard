export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

export interface ProductListResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  active: boolean;
} 