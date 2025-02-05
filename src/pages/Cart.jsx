import Title from './../components/Title';
import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { assets } from "../assets/frontend_assets/assets";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { isAuthenticated } = useAuth();
    // const { currency, products } = useContext(shop);
    const {currency ,products} = useShop();
    const { cartItems, updateTotalQuantities, removeFromCart } = useCart();
    const navigate = useNavigate();
    
    // State to manage quantities for each item
    const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));
    const [subtotal, setSubtotal] = useState(0);
    const shippingFee = 10;
    

    const handleCartClick = () =>{
        if (isAuthenticated) {
            navigate('/place-order');
        } else {
            navigate('/error');
        }
    }

    useEffect(() => {
        const newSubtotal = cartItems.reduce((total, item, index) => {
            const product = products.find(prod => prod._id === item.id);
            if (!product) return total;
            return total + (product.price * quantities[index]);
        }, 0);
        setSubtotal(newSubtotal);

        const updatedCartItems = cartItems.map((item, index) => ({
            ...item,
            quantity: quantities[index],
        }));
        updateTotalQuantities(updatedCartItems);

    }, [quantities, cartItems, products, updateTotalQuantities]);

    const handleQuantityChange = (index, e) => {
        const value = parseInt(e.target.value, 10);
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = value;
        setQuantities(updatedQuantities);

        // Update context cartItems with the new quantity
        const updatedCartItems = cartItems.map((item, i) =>
            i === index ? { ...item, quantity: value } : item
        );
        updateTotalQuantities(updatedCartItems);
    };

    const handleRemove = (itemId, itemSize) => {
        removeFromCart(itemId, itemSize);
        const updatedQuantities = cartItems
            .filter(item => !(item.id === itemId && item.size === itemSize))
            .map(item => item.quantity);
    
        setQuantities(updatedQuantities);
    };

    const total = subtotal > 0 ? subtotal + shippingFee : 0;

    return (
        <div className='border-t pt-14'>
            {/* Title */}
            <div className='text-2xl mb-3'>
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            {/* Cart Items */}
            <div>
                {cartItems.map((item, index) => {
                    const product = products.find(prod => prod._id === item.id);
                    if (!product) return null;
                    const imageUrl = product.image ? `https://server-e-commerce-seven.vercel.app${product.image}` : "/fallback-image.jpg";
                    return (
                        <div key={item.id + item.size} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                            <div className="flex items-start gap-6">
                            <img 
                                className="w-16 sm:w-20" 
                                src={imageUrl} 
                                alt={product.name} 
                                />
                                <div>
                                    <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>{currency} {product.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min="1"
                                value={quantities[index]}
                                onChange={(e) => handleQuantityChange(index, e)}
                            />
                            <img
                                className="w-4 mr-4 sm:w-5 cursor-pointer"
                                src={assets.bin_icon}
                                alt="Remove"
                                onClick={() => handleRemove(item.id, item.size)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Total */}
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <div className="w-full">
                        {/* Title */}
                        <div className="text-2xl">
                            <Title text1={"CART"} text2={"TOTALS"} />
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col gap-2 mt-2 text-sm">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{currency} {subtotal.toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <p>Shipping Fee</p>
                                <p>{currency} {shippingFee.toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <b>Total</b><b>{currency} {total.toFixed(2)}</b>
                            </div>
                        </div>
                    </div>

                    {/* Proceed to Checkout */}
                    <div className="w-full text-end">
                        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={handleCartClick} >PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
