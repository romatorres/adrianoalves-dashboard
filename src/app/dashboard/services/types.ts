export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  imageUrl: string | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServiceFormData = Omit<Service, "id" | "createdAt" | "updatedAt">;

export interface ServiceResponse {
  success: boolean;
  data?: Service;
  error?: string;
}

export interface ServiceListResponse {
  success: boolean;
  data?: Service[];
  error?: string;
}
