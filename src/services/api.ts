import axios from 'axios';
import Cookies from 'js-cookie';


interface User {
    userId: string;
    name: string;
    email: string;
    password: string;
    role: string;
}


// Type definitions
interface CartItem {
    productId: string;
    size: string;
    quantity: number;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string[];
    sizes: string[];
  // Add other product fields as needed
}

interface CartResponse {
    success: boolean;
    cart: {
        _id: string;
        user: string;
        items: Array<{
            product: Product;
            size: string;
            quantity: number;
        }>;
        totalQuantity: number;
        subTotal?: number;
        createdAt: string;
        updatedAt: string;
    };
}

const API = axios.create({
    // baseURL: 'https://server-e-commerce-seven.vercel.app/api',
    baseURL: 'https://server-e-commerce-seven.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
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
    const { data } = await API.post('/users/login', { email, password });
    return data;
};

export const registerUser = async (formData: FormData) => {
    const { data } = await API.post('/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};




export default API;