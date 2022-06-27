import create from "zustand";
import { persist } from "zustand/middleware";
import { Category, Question } from "../Model";

export interface User {
  email: string;
  id: number;
  token: string;
  username: string;
  role: string;
}

interface StoreState {
  isLoading: Boolean;
  setIsLoading: (isLoading: Boolean) => void;
  isLogin: Boolean;
  setIsLogin: (login: Boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  questions: Question[];
  setQuestions: (questions: Question[] | undefined) => void;
  categories: Category[];
  setCategories: (categories: Category[] | undefined) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isLoading: true,
      setIsLoading: (loading: Boolean) => set(() => ({ isLoading: loading })),
      isLogin: false,
      setIsLogin: (login: Boolean) => set(() => ({ isLogin: login })),
      user: undefined,
      setUser: (user: User | undefined) => set(() => ({ user: user })),
      questions: [],
      setQuestions: (questions: Question[] | undefined) =>
        set(() => ({ questions: questions })),
      categories: [],
      setCategories: (categories: Category[] | undefined) =>
        set(() => ({ categories: categories })),
    }),
    { name: "auth-store" }
  )
);
export default useStore;
