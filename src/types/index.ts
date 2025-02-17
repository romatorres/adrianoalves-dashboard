export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string | null | undefined;
  active: boolean;
} 