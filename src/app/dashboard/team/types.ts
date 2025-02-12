export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;

}

export type TeamMemberFormData = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>;

export interface TeamMemberResponse {
  success: boolean;
  data?: TeamMember;
  error?: string;
}

export interface TeamMemberListResponse {
  success: boolean;
  data?: TeamMember[];
  error?: string;
} 