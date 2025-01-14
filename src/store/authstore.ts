import { User } from "@/types/authentication";
import { create } from "zustand";

interface AuthState {
  token: string;
  user:User;
  refillAmount:number;
  topupAmount:number;
  updateToken: (newToken: string) => void;
  updateUser: (newUser: User) => void;
  updateRefillAmount: (amount: number) => void;
  updateTopupAmount: (amount: number) => void;
}
export const authStore = create<AuthState>()((set) => ({
  refillAmount:0,
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
  updateToken: (by) => set(() => ({ token: by })),
  updateUser: (by) => set(() => ({ user: by })),
  updateTopupAmount: (by) => set(() => ({ topupAmount: by })),
  updateRefillAmount: (by) => set(() => ({ refillAmount: by })),
}));