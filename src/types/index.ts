export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string | null | undefined;
  active: boolean;
} 