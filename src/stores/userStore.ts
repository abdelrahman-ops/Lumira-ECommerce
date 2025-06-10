// store/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getUser, updateUser } from '../services/api';
import { User, UserUpdateForm, UserResponse } from '../types/types';
import { useAuthStore } from './authStore';

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    storeUserData: (data: User) => void;
    fetchUserData: () => Promise<void>;
    updateUserData: (formData: UserUpdateForm) => Promise<UserResponse>;
    clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
persist(
    (set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    storeUserData: (data: User) => {
        if (data) set({ user: data });
    },

    fetchUserData: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) return;

        set({ isLoading: true, error: null });
        try {
        const response = await getUser();
        const data: User = response?.user || response;
        if (data) set({ user: data });
        } catch (err) {
        console.error('Failed to fetch user:', err);
        set({ error: 'Failed to fetch user data' });
        } finally {
        set({ isLoading: false });
        }
    },

    updateUserData: async (formData: UserUpdateForm): Promise<UserResponse> => {
        set({ isLoading: true, error: null });
        try {
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            fd.append(key, value as any);
            }
        });

        const updated = await updateUser(fd);
        const data: User = updated?.user || updated;
        if (data) set({ user: data });

        return { success: true, user: data };
        } catch (err) {
        console.error('Failed to update user:', err);
        set({ error: 'Failed to update user data' });

        return {
            success: false,
            user: {
            userId: '',
            name: '',
            email: '',
            role: 'user',
            createdAt: '',
            updatedAt: '',
            },
        };
        } finally {
        set({ isLoading: false });
        }
    },

    clearUserData: () => {
        set({ user: null });
    },
    }),
    {
    name: 'user-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ user: state.user }),
    onRehydrateStorage: () => (state?: UserState) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (state && isAuthenticated) {
        state.fetchUserData();

        const interval = setInterval(() => {
            if (useAuthStore.getState().isAuthenticated) {
            state.fetchUserData();
            }
        }, 300000); // 5 mins

        return () => clearInterval(interval);
        }
    },
    }
)
);

// Initialize user data if authenticated
if (typeof window !== 'undefined') {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
        useUserStore.getState().fetchUserData();
    }
}