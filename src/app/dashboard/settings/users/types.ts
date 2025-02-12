export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export interface UserListResponse {
  success: boolean;
  data?: User[];
  error?: string;
} 