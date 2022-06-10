import create from "zustand";

export interface User {
  id: number;
  name: string;
  fullname: string;
  email: string;
  email_verified_at: null;
  sex: null;
  photo: null;
  job: null;
  nik: string;
  kk: null;
  birth_date: null;
  birth_place: null;
  phone: string;
  phone_alt: null;
  address: null;
  province: null;
  province_id: null;
  district: null;
  district_id: null;
  verification_status: number;
  is_developer: number;
  is_admin: number;
  is_suspended: number;
  role_id: string;
  is_nik_validated: number;
  is_email_validated: number;
  is_phone_validated: number;
  is_presence_validated: number;
  is_address_validated: number;
  created_at: string;
  updated_at: string;
  my_applications: any[];
  verification_statuses: {
    NIK: number;
    EMAIL: number;
    PHONE: number;
    ADDR: number;
    PRESENCE: number;
    percent: number;
  };
}

interface LoadingState {
  isLoading: Boolean;
  setIsLoading: (isLoading: Boolean) => void;
  isLogin: Boolean;
  setIsLogin: (login: Boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const useStore = create<LoadingState>((set) => ({
  isLoading: true,
  setIsLoading: (loading: Boolean) => set((state) => ({ isLoading: loading })),
  isLogin: false,
  setIsLogin: (login: Boolean) => set((state) => ({ isLogin: login })),
  user: null,
  setUser: (user: User | null) => set((state) => ({ user: user })),
}));
export default useStore;
