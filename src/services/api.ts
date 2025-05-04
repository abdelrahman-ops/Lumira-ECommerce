import axios from 'axios';
import Cookies from 'js-cookie';
import  {
    Product,
    CartItem,
    CartResponse,
    WishlistResponse,
    MoveToCartResponse,
    User,
} from '../types/types'
import { url } from '../components/constant/URL';


const API = axios.create({
    baseURL: `${url}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor for auth tokens
API.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data?.message || 'Network error');
    }
);


// Product endpoints
export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await API.get('/products');
    return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await API.get(`/products/${id}`);
    return data;
};

// Cart endpoints
export const addToUserCart = async (item: CartItem): Promise<CartResponse> => {
    const { data } = await API.post('/cart/add-item', item);
    return data;
};

export const fetchUserCart = async (): Promise<CartResponse> => {
    const { data } = await API.get('/cart/get-cart');
    console.log("api.ts fetch cart data: ",data);
    return data;
};

export const updateCartItem = async (
    productId: string,
    size: string,
    quantity: number
    ): Promise<CartResponse> => {
    const { data } = await API.put('/cart/update-item', { productId, size, quantity });
    return data;
};

export const removeFromUserCart = async (
    productId: string,
    size: string
    ): Promise<CartResponse> => {
    const { data } = await API.delete('/cart/remove-item', {
        data: { productId, size }
    });
    return data;
};

export const clearUserCart = async (): Promise<{ success: boolean }> => {
    const { data } = await API.delete('/cart/clear-cart');
    return data;
};

export const transferGuestCartToUser = async (
    guestItems: CartItem[]
    ): Promise<CartResponse> => {
    const { data } = await API.post('/cart/transfer-guest', { guestItems });
    return data;
};


// User endpoints
export const getUser = async (): Promise<User> => {
    const { data } = await API.get('/users/profile');
    console.log("api.ts fetch user data: ", data);
    return data.user;
};

// Auth endpoints
export const loginUser = async (
    email: string,
    password: string
    ): Promise<{ user: any; token: string }> => {
    const { data } = await API.post('/auth/login', { email, password });
    return data;
};

export const registerUser = async (formData: FormData) => {
    const { data } = await API.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};

export const updateUser = async (formData: FormData) => {
    const { data } = await API.put('/users/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export const deleteUser = async () => {
    const { data } = await API.delete('/users/delete');
    return data;
}

export const updatePassword = async (oldPassword: string, newPassword: string) => {
    const { data } = await API.put('/users/update-password', { oldPassword, newPassword });
    return data;
}


// Wishlist endpoints
export const fetchUserWishlist = async (): Promise<WishlistResponse> => {
    const { data } = await API.get('/wishlist');
    return data;
};

export const addToWishlist = async (
    productId: string,
    size: string
): Promise<WishlistResponse> => {
    const { data } = await API.post('/wishlist', { productId, size });
    return data;
};

export const removeFromWishlist = async (
    productId: string,
    size: string
): Promise<WishlistResponse> => {
    const { data } = await API.delete(`/wishlist/${productId}/${size}`);
    return data;
};

export const moveToCart = async (
    productId: string,
    size: string,
    quantity: number = 1
): Promise<MoveToCartResponse> => {
    const { data } = await API.post(`/wishlist/${productId}/${size}/move-to-cart`, { quantity });
    return data;
};

export const clearWishlist = async (): Promise<{ success: boolean }> => {
    const { data } = await API.delete('/wishlist/clear');
    return data;
};

export default API;