// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';


interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
        token: null,
        isAuthenticated: false,
            
        login: async (token: string) => {
                Cookies.set('token', token, {
                    expires: 7,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
            });
            set({ isAuthenticated: true, token });
            // window.location.reload();
        },

        logout: () => {
            Cookies.remove('token');
            set({ token: null, isAuthenticated: false });
        },
        }),
        {
        name: 'auth-storage',
        }
    )
);

// Auto-login on first load if token exists (client-side only)
if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    if (token) {
        useAuthStore.getState().login(token);
    }
}