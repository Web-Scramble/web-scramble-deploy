import { create } from "zustand";

interface AuthState {
  token: string;
  updateToken: (newToken: string) => void;
}
export const authStore = create<AuthState>()((set) => ({
  token: "asd",
  updateToken: (by) => set((state) => ({ token: by })),
}));