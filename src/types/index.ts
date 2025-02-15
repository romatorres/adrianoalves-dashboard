export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: string | null;
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
  categoryId: string | null;
  productCategory?: {
    name: string;
    id: string;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null | undefined;
  active: boolean;
} 