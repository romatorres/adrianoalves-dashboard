export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  startDate: Date;
  endDate: Date;
  discount: number | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionFormData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  discount: number;
  active: boolean;
}

export interface PromotionResponse {
  success: boolean;
  data?: Promotion;
  error?: string;
}

export interface PromotionListResponse {
  success: boolean;
  data?: Promotion[];
  error?: string;
}
