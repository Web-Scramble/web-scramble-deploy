import { create } from "zustand";

interface IntentState {
clientSecret: string;
updateClient: (newSecret: string) => void;
stripePromise: any;
updatePromise: (newSecret: string) => void;
}
export const intentStore = create<IntentState>()((set) => ({
    clientSecret:'',
    updateClient: (by) => set(() => ({ clientSecret: by })),
    stripePromise:'',
    updatePromise: (by) => set(() => ({ stripePromise: by })),
}));