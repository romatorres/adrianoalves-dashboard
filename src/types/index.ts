export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFormData {
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

export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  active: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} 