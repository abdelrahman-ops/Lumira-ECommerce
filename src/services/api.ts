import axios from 'axios';
import Cookies from 'js-cookie';


const API = axios.create({
    // baseURL: 'http://localhost:5050/api',
    baseURL: 'https://server-e-commerce-seven.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch products
export const fetchProducts = async () => {
    const {data} = await API.get('/products');
    return data;
};

// Fetch single product by ID
export const fetchProductById = async (id: string) => {
    const { data } = await API.get(`/products/${id}`);
    return data;
};


// Add item to the cart (user)
export const addToUserCart = async (item, token) => {
    const { data } = await API.post('/cart/add', item, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const fetchUserCart = async (token) => {
    const { data } = await API.get('/cart/get', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


// Transfer guest cart to user cart
export const transferGuestCartToUser = async (cartItems, token) => {
    const { data } = await API.post('/cart/transfer', { cartItems }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Update cart item quantity
export const updateCartItem = async (item, token) => {
    const { data } = await API.put('/cart/update', item, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Remove item from cart
export const removeFromUserCart = async (productId, size, token) => {
    const { data } = await API.delete('/cart/delete-one-product', {
        data: { productId, size },
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


// Clear the entire cart
export const clearUserCart = async (token) => {
    const { data } = await API.delete('/cart/clear-cart', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};



// User login
export const loginUser = async (email: string, password: string) => {
    try {
        const { data } = await API.post("/users/login", { email, password });
        return data; // Contains user & token
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Invalid credentials");
    }
};


export default API;