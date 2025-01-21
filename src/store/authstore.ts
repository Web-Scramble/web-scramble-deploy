import { User } from "@/types/authentication";
import { create } from "zustand";

interface AuthState {
  token: string;
  user:User;
  refillAmount:number;
  topupAmount:number;
  selectedId:string;
  updateToken: (newToken: string) => void;
  updateSelectedId: (newToken: string) => void;
  updateUser: (newUser: User) => void;
  updateRefillAmount: (amount: number) => void;
  updateTopupAmount: (amount: number) => void;
}
export const authStore = create<AuthState>()((set) => ({
  refillAmount:20,
  topupAmount:0,
  token: "",
  user:{
    id: "",
    username: "",
    email: "",
    phone:"",
    balance:"",
    profile_picture:""
  },
  selectedId:'',
  updateSelectedId:(by) => set(() => ({ selectedId: by })),
  updateToken: (by) => set(() => ({ token: by })),
  updateUser: (by) => set(() => ({ user: by })),
  updateTopupAmount: (by) => set(() => ({ topupAmount: by })),
  updateRefillAmount: (by) => set(() => ({ refillAmount: by })),
}));