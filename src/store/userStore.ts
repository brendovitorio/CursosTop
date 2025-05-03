import { create } from 'zustand';

type UserStore = {
  user: any;
  setUser: (user: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
