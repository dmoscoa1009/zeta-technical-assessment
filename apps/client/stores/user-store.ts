import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  setAuthCookie: (token: string) => void;
  clearAuthCookie: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => {
        set({ user, token });
        // Set cookie for 7 days
        document.cookie = `token=${token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict`;
      },
      clearUser: () => {
        set({ user: null, token: null });
        // Clear the cookie
        document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
      },
      setAuthCookie: (token: string) => {
        document.cookie = `token=${token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict`;
      },
      clearAuthCookie: () => {
        document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
      },
    }),
    {
      name: "user-storage",
    }
  )
);
