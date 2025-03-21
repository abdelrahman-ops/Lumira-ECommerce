/* eslint-disable no-undef */
import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { assets } from "../assets/assets";

import { useShop } from "../context/ShopContext"; 
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const [selectedSize, setSize] = useState('');
    const { id } = useParams();
    const { products, currency, isLoading, error } = useShop();  // Get products from context
    const { addToCart } = useCart();
    const handleSize = (size) => setSize(size);

    const handleCart = async () => {
        if (!selectedSize) {
            toast.error("Choose size first");
            return;
        }
    
        if (!product) {
            toast.error("Product not found");
            return;
        }
    
        const token = Cookies.get('token');
        console.log("Token:", token); // Debug token
    
        if (!token) {
            toast.error("You must be logged in to add items to the cart");
            return;
        }
    
        try {
            // Make API call to add product to cart
            const response = await axios.post(
                'https://server-e-commerce-seven.vercel.app/api/cart/add',
                {
                    productId: product._id, // Send the product ID to the backend
                    quantity: 1,
                    size: selectedSize,
                    price: product.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log("Backend Response:", response.data); // Debug backend response
            if (response.data.success) {
                addToCart({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    size: selectedSize,
                    quantity: 1,
                });
                toast.success("Item added to cart");
            } else {
                toast.error("Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            if (error.response) {
                console.error("Backend Error Response:", error.response.data); // Debug backend error
            }
            if (error.response && error.response.status === 401) {
                toast.error("Unauthorized: Please log in again");
            } else {
                toast.error("An error occurred while adding to cart");
            }
        }
        
    };

    // Find product from cached data
    const product = products?.find(prod => prod._id === id);

    if (isLoading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">Error loading products</div>;
    if (!product) return <div className="error">Product not found</div>;
    
    const imageUrl = product.image ? `https://server-e-commerce-seven.vercel.app${product.image}` : "/fallback-image.jpg";
    
    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            <ToastContainer />
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        <img src={imageUrl} alt={product.name} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={imageUrl} alt={product.name} className='w-full h-auto' />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(4)].map((_, index) => (
                            <img key={index} src={assets.star_icon} alt="star" className="w-3" />
                        ))}
                        <img src={assets.star_dull_icon} alt="star" className="w-3" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}{product.price}
                    </p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    className={`border py-2 px-4 ${selectedSize === size ? 'border-orange-500 bg-gray-100' : 'bg-gray-100'}`}
                                    onClick={() => handleSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={handleCart}>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>

                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>{product.description}</p>
                </div>
            </div>
            <div className='my-24'></div>
        </div>
    );
};

export default ProductDetail;