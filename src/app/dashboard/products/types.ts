export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: string | null;
  productCategory?: {
    id: string;
    name: string;
  } | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

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