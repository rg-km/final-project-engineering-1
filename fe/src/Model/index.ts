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
}

export interface Answer {
  Answer: string;
  CreatedAt: string;
  IDContent: number;
  IDUser: number;
  Status: boolean;
  id: number;
}
