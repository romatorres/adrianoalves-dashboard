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