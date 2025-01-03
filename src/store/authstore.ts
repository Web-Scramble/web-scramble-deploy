import { User } from "@/types/authentication";
import { create } from "zustand";

interface AuthState {
  token: string;
  user:User;
  updateToken: (newToken: string) => void;
  updateUser: (newUser: User) => void;
}
export const authStore = create<AuthState>()((set) => ({
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
}));