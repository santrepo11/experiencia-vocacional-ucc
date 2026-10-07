import { create } from 'zustand';
import type { AvatarResult, LeadFormData } from '../types';

type User = {
  name: string;
  email: string;
};

type AppState = {
  isAuthenticated: boolean;
  user: User | null;
  lead: LeadFormData | null;
  avatarResult: AvatarResult | null;
  setAuth: (user: User | null) => void;
  setLead: (lead: LeadFormData | null) => void;
  setAvatarResult: (result: AvatarResult | null) => void;
  logout: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  lead: null,
  avatarResult: null,
  setAuth: (user) => set({ isAuthenticated: !!user, user }),
  setLead: (lead) => set({ lead }),
  setAvatarResult: (avatarResult) => set({ avatarResult }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
