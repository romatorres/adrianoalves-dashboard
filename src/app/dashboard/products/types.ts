import { Product } from "@/types";

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

