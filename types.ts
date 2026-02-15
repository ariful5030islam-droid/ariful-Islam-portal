
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface Profile {
  name: string;
  role: string;
  description: string;
  profileImageUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  email: string;
}

export type ViewMode = 'HOME' | 'ADMIN';
