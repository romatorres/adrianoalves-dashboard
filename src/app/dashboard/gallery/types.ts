export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryImageFormData {
  title: string;
  description?: string | null;
  imageUrl: string;
  featured: boolean;
  active: boolean;
}

export interface GalleryResponse {
  success: boolean;
  data?: GalleryImage;
  error?: string;
}

export interface GalleryListResponse {
  success: boolean;
  data?: GalleryImage[];
  error?: string;
}
