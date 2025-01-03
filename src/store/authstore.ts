import { User } from "@/types/authentication";
import { create } from "zustand";

interface AuthState {
  token: string;
  user:User;
  updateToken: (newToken: string) => void;
}
export const authStore = create<AuthState>()((set) => ({
  token: "",
  user:{
    id: "",
    username: "",
    email: "",
    phone:"",
    balance:"",
  },
  updateToken: (by) => set((state) => ({ token: by })),
}));