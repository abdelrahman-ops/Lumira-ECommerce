/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import { assets } from '../assets/assets';
import Title from './../components/Title';
import InlineLoader from '../components/InlineLoader';

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const { currency, products, isLoading: isShopLoading } = useShop();
    const { cartItems, updateCart, removeFromCart, clearCart, totalQuantity } = useCart();
    const navigate = useNavigate();
    const token = Cookies.get('token');

    // Ensure cartItems is always an array
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    // Initialize quantities based on cartItems
    const [quantities, setQuantities] = useState(
        safeCartItems.map((item) => item.quantity || 1) // Default to 1 if quantity is missing
    );

    const [subtotal, setSubtotal] = useState(0);
    const shippingFee = 10;

    // State for showing the delete confirmation block
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // Item to be deleted
    const [showClearCartConfirmation, setShowClearCartConfirmation] = useState(false); // Clear cart confirmation

    // Sync quantities when cartItems change
    useEffect(() => {
        setQuantities(safeCartItems.map((item) => item.quantity || 1));
    }, [safeCartItems]);

    // Handle cart click (proceed to checkout or login)
    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/place-order');
        } else {
            navigate('/login');
            toast.info('You must log in to proceed to checkout');
        }
    };

    // Calculate subtotal whenever quantities or cartItems change
    useEffect(() => {
        if (isShopLoading) return; // Skip calculation if products are still loading

        const newSubtotal = safeCartItems.reduce((total, item, index) => {
            const product = products.find((prod) => prod._id === item.productId); // Use productId to find the product
            if (!product) {
                console.error(`Product not found for productId: ${item.productId}`);
                return total; // Skip this item if product is not found
            }
            return total + product.price * (quantities[index] || 1); // Use quantities[index] or default to 1
        }, 0);
        setSubtotal(newSubtotal);
    }, [quantities, safeCartItems, products, isShopLoading]);

    // Handle quantity change for an item
    const handleQuantityChange = async (index, newQuantity) => {
        if (isNaN(newQuantity)) {
            toast.error('Invalid quantity');
            return;
        }

        const value = Math.max(0, Math.min(100, newQuantity)); // Ensure quantity is between 0 and 100

        // If the new quantity is less than 1, show the confirmation dialog
        if (value < 1) {
            const item = safeCartItems[index];
            setItemToDelete({ itemId: item.productId, itemSize: item.size }); // Set the item to delete
            setShowDeleteConfirmation(true); // Show the confirmation dialog
            return;
        }

        const updatedQuantities = [...quantities];
        updatedQuantities[index] = value;
        setQuantities(updatedQuantities);

        // Update the quantity on the server if the user is logged in
        const item = safeCartItems[index];
        await updateCart(item.productId, item.size, value);
    };

    // Handle item removal
    const handleRemove = (itemId, itemSize) => {
        setItemToDelete({ itemId, itemSize }); // Set the item to delete
        setShowDeleteConfirmation(true); // Show the confirmation dialog
    };

    // Confirm item removal
    const confirmRemove = async () => {
        if (itemToDelete) {
            await removeFromCart(itemToDelete.itemId, itemToDelete.itemSize); // Remove the item
            toast.success('Item removed from cart successfully!');
            setShowDeleteConfirmation(false); // Hide the confirmation dialog
            setItemToDelete(null); // Reset the item to delete
        }
    };

    // Cancel item removal
    const cancelRemove = () => {
        // Reset the quantity to 1 for the item
        const itemIndex = safeCartItems.findIndex(
            (item) => item.productId === itemToDelete.itemId && item.size === itemToDelete.itemSize
        );
        if (itemIndex !== -1) {
            const updatedQuantities = [...quantities];
            updatedQuantities[itemIndex] = 1; // Reset quantity to 1
            setQuantities(updatedQuantities);
        }

        setShowDeleteConfirmation(false); // Hide the confirmation dialog
        setItemToDelete(null); // Reset the item to delete
    };

    // Handle clear cart with confirmation block
    const handleClearCart = () => {
        setShowClearCartConfirmation(true); // Show the clear cart confirmation block
    };

    // Confirm clear cart
    const confirmClearCart = async () => {
        await clearCart(); // Call the API to clear the cart
        toast.success('All items removed from cart successfully!');
        setShowClearCartConfirmation(false); // Hide the confirmation block
    };

    // Cancel clear cart
    const cancelClearCart = () => {
        setShowClearCartConfirmation(false); // Hide the confirmation block
    };

    // Format price with currency
    const formatPrice = (price) => {
        const currencyCode = currency === '$' ? 'USD' : currency; // Default to USD if currency is '$'
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
    };

    const total = subtotal > 0 ? subtotal + shippingFee : 0;

    // Display loading state if products are still loading
    if (isShopLoading) {
        return (
            <div className="loader flex justify-center items-center h-screen">
                <InlineLoader />
            </div>
        );
    }

    // CartItem component for better readability
    const CartItem = ({ item, index, product, quantities, handleQuantityChange, handleRemove }) => {
        const imageUrl = product.image
            ? `https://server-e-commerce-seven.vercel.app${product.image}`
            : 'https://via.placeholder.com/150';
        return (
            <div
                key={item.productId + item.size}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
                <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={imageUrl} alt={product.name} />
                    <div>
                        <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                        <div className="flex items-center gap-5 mt-2">
                            <p>{formatPrice(product.price)}</p>
                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="px-2 py-1 border bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                    >
                        -
                    </button>
                    {/* Display-only quantity */}
                    <span className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center">
                        {quantities[index] || 1}
                    </span>
                    <button
                        className="px-2 py-1 border bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                    >
                        +
                    </button>
                </div>
                <img
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Remove"
                    aria-label="Remove item"
                    onClick={() => handleRemove(item.productId, item.size)}
                />
            </div>
        );
    };

    return (
        <div className="border-t pt-14">
            <ToastContainer position="bottom-right" autoClose={3000} /> {/* Add ToastContainer to display toasts */}
            {/* Title */}
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* Cart Items */}
            <div>
                {safeCartItems.map((item, index) => {
                    const product = products.find((prod) => prod._id === item.productId); // Use productId to find the product
                    if (!product) {
                        console.error(`Product not found for productId: ${item.productId}`);
                        return (
                            <div key={item.productId + item.size} className="py-4 border-t border-b text-gray-700">
                                <p>Product not available</p>
                            </div>
                        );
                    }
                    return (
                        <CartItem
                            key={item.productId + item.size}
                            item={item}
                            index={index}
                            product={product}
                            quantities={quantities}
                            handleQuantityChange={handleQuantityChange}
                            handleRemove={handleRemove} // Pass handleRemove as a prop
                        />
                    );
                })}
            </div>

            {/* Delete Confirmation Block */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to remove this item?</p>
                        <div className="flex gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmRemove}
                            >
                                Yes, Remove
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={cancelRemove}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear Cart Confirmation Block */}
            {showClearCartConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to clear your cart?</p>
                        <div className="flex gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmClearCart}
                            >
                                Yes, Clear Cart
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={cancelClearCart}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Total */}
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <div className="w-full">
                        {/* Title */}
                        <div className="text-2xl">
                            <Title text1={'CART'} text2={'TOTALS'} />
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col gap-2 mt-2 text-sm">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{formatPrice(subtotal)}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <p>Shipping Fee</p>
                                <p>{formatPrice(shippingFee)}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <b>Total</b>
                                <b>{formatPrice(total)}</b>
                            </div>
                        </div>
                    </div>

                    {/* Proceed to Checkout and Clear Cart Buttons */}
                    <div className="w-full text-end">
                        <button
                            className="bg-red-500 text-white text-sm my-8 px-8 py-3 mr-4 hover:bg-red-600"
                            onClick={handleClearCart}
                        >
                            CLEAR CART
                        </button>
                        <button
                            className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800"
                            onClick={handleCartClick}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;