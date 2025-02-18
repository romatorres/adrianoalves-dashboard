export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 