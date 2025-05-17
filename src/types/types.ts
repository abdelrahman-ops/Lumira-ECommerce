// Product Types
interface ProductImage {
    url: string;
    altText?: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: ProductImage[];
    category: string;
    subCategory: string;
    sizes: string[];
    // colors?: string[]; // Optional if you have color variants
    // stock: number;
    date: string;
    bestseller: boolean;
    // discount?: number; // Optional discount percentage
    rating?: number; // Average rating
    reviewsCount?: number; // Total number of reviews
    // tags?: string[]; // For search and filtering
    // sku?: string; // Stock keeping unit
}

// Cart Types
interface CartItem {
    productId: string;
    // product: Product | string; // Can be populated or just ID
    quantity: number;
    size: string;
    // price?: number;
    // addedAt?: string;
}

interface Cart {
    _id: string;
    user: string | User; // User ID or populated User
    items: CartItem[];
    totalQuantity: number;
    subTotal: number;
    createdAt: string;
    updatedAt: string;
}

interface CartResponse {
    success: boolean;
    cart: Cart;
    message?: string;
}


// Wishlist Types

interface MinimalProduct {
    _id: string;
    name: string;
    price: number;
    image: string; // Just the first image URL
}

interface WishlistItem {
    product: MinimalProduct;
    size: string;
    addedAt: string;
    // _id?: string;
}

interface Wishlist {
    _id: string;
    user: string | User; // User ID or populated User
    items: WishlistItem[];
    createdAt: string;
    updatedAt: string;
}

interface WishlistResponse {
    success: boolean;
    data: Wishlist;
    message?: string;
}

interface MoveToCartResponse {
    success: boolean;
    data: {
        wishlist: Wishlist;
        cart: Cart;
    };
    message?: string;
}

// User Types
interface UserAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

interface UserPaymentMethod {
    cardType: string;
    lastFour: string;
    expiry: string;
    isDefault: boolean;
}

interface User {
    userId: string;
    name: string;
    email: string;
    password?: string; // Only for forms, should not be returned in API responses
    role: 'user' | 'admin';
    avatar?: string;
    phone?: string;
    addresses?: UserAddress[];
    paymentMethods?: UserPaymentMethod[];
    createdAt: string;
    updatedAt: string;
    wishlist?: string; // Wishlist ID
    cart?: string; // Cart ID
}

interface UserResponse {
    success: boolean;
    user: User;
    token?: string; // For login/register responses
    message?: string;
}

// Auth Types
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    avatar?: File; // For form data upload
}

interface PasswordUpdateData {
    oldPassword: string;
    newPassword: string;
}

// API Response Base
interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    statusCode?: number;
}

// Order Types (if needed)
interface OrderItem {
    product: Product | string;
    quantity: number;
    size: string;
    priceAtPurchase: number;
}

interface Order {
    _id: string;
    user: string | User;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: UserAddress;
    paymentMethod: UserPaymentMethod;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface OrderResponse {
    success: boolean;
    order: Order;
    message?: string;
}

// Export all types
export type {
    Product,
    ProductImage,
    CartItem,
    Cart,
    CartResponse,
    WishlistItem,
    Wishlist,
    WishlistResponse,
    MoveToCartResponse,
    User,
    UserAddress,
    UserPaymentMethod,
    UserResponse,
    LoginCredentials,
    RegisterCredentials,
    PasswordUpdateData,
    ApiResponse,
    OrderItem,
    Order,
    OrderResponse,
    MinimalProduct
};