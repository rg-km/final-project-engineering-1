import create from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  id: number;
  token: string;
  username: string;
}

interface StoreState {
  isLoading: Boolean;
  setIsLoading: (isLoading: Boolean) => void;
  isLogin: Boolean;
  setIsLogin: (login: Boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
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
    }),
    { name: "auth-store" }
  )
);
export default useStore;
