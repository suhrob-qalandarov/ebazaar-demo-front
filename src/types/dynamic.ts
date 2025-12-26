/**
 * Dynamic data types for backend integration
 * These will be populated from backend API in the future
 */
export interface DynamicHomeData {
  stats?: {
    users: number;
    projects: number;
    clients: number;
  };
  news?: Array<{
    id: number;
    title: string;
    content: string;
    date: string;
    image?: string;
  }>;
  testimonials?: Array<{
    id: number;
    author: string;
    position: string;
    text: string;
    avatar?: string;
  }>;
  team?: Array<{
    id: number;
    name: string;
    role: string;
    bio: string;
    image?: string;
  }>;
}

