export interface Category {
  id: number;
  name: any;
  bool: boolean;
}

export interface Question {
  id: number;
  likes: number;
  id_user: number;
  id_category: number;
  title: string;
  subtitle: string;
  deksripsi: string;
  path: string;
  last_modified: string;
  username: string;
}

export interface Answer {
  answer: string;
  created_at: string;
  id_content: number;
  id_user: number;
  status: boolean;
  id: number;
}
