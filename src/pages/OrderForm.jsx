import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Title from './../components/common/Title';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import InlineLoader from '../components/utility/InlineLoader';

const OrderForm = () => {
    const { cartItems, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
        paymentMethod: 'cash',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const shippingFee = subtotal > 300 ? 0 : 10;
    const total = subtotal + shippingFee;

    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            toast.error('Your cart is empty');
            navigate('/cart');
        }
    }, [cartItems, orderPlaced, navigate]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipcode) newErrors.zipcode = 'Zipcode is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (formData.phone.length < 10) {
            newErrors.phone = 'Phone number must be at least 10 digits';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handlePaymentMethodChange = (method) => {
        setFormData(prev => ({
            ...prev,
            paymentMethod: method
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Here you would typically:
            // 1. Process payment based on paymentMethod
            // 2. Create order in your backend
            // 3. Clear cart on success
            
            toast.success('Order placed successfully!');
            setOrderPlaced(true);
            clearCart();
            
            // Redirect after delay
            setTimeout(() => navigate('/order-confirmation'), 2000);
        } catch (error) {
            toast.error(error.message || 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderPlaced) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[80vh] border-t pt-14"
            >
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">Thank you for your purchase</p>
                <InlineLoader size="md" text="Redirecting to confirmation..." />
            </motion.div>
        );
    }

    return (
        <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-6 max-w-6xl mx-auto"
        >
            {/* Delivery Information Section */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
            
                {/* First and Last Name */}
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            required
                            id="firstName"
                            name="firstName"
                            className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                            type="text"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            required
                            id="lastName"
                            name="lastName"
                            className={`mt-1 block w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                            type="text"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                </div>
                
                {/* Email */}
                <div>
                    <input
                        required
                        id="email"
                        name="email"
                        className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                {/* Street */}
                <div>
                    <input
                        required
                        id="street"
                        name="street"
                        className={`mt-1 block w-full border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                        type="text"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleInputChange}
                    />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                </div>

                {/* City and State */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            required
                            id="city"
                            name="city"
                            className={`mt-1 block w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            id="state"
                            name="state"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            type="text"
                            placeholder="State/Province"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                
                {/* Zipcode and Country */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            required
                            id="zipcode"
                            name="zipcode"
                            className={`mt-1 block w-full border ${errors.zipcode ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                            type="text"
                            placeholder="Zipcode"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                        />
                        {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            required
                            id="country"
                            name="country"
                            className={`mt-1 block w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                            type="text"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <input
                        required
                        id="phone"
                        name="phone"
                        className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>

            {/* Cart Totals and Payment Method Section */}
            <div className="mt-8 w-full sm:w-[400px]">
                {/* Cart Totals */}
                <div className="w-full">
                    <div className="text-2xl">
                        <div className="inline-flex gap-2 items-center mb-3">
                            <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
                            <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2 text-sm">
                        <div className="flex justify-between">
                            <p>Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</p>
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <p>Shipping Fee</p>
                            <p>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>{formatPrice(total)}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8">
                    <div className="inline-flex gap-2 items-center mb-3">
                        <p className="text-gray-500">PAYMENT <span className="text-gray-700 font-medium">METHOD</span></p>
                        <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
                    </div>
                    <div className="flex gap-3 flex-col">
                        {/* Stripe */}
                        <div
                            onClick={() => handlePaymentMethodChange('stripe')}
                            className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-colors ${
                                formData.paymentMethod === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <div className={`min-w-5 h-5 border rounded-full flex items-center justify-center ${
                                formData.paymentMethod === 'stripe' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
                            }`}>
                                {formData.paymentMethod === 'stripe' && <FaCheckCircle className="text-white text-xs" />}
                            </div>
                            <img className="h-5" src={assets.stripe_logo} alt="stripe" />
                        </div>
                        
                        {/* Razorpay */}
                        <div
                            onClick={() => handlePaymentMethodChange('razorpay')}
                            className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-colors ${
                                formData.paymentMethod === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <div className={`min-w-5 h-5 border rounded-full flex items-center justify-center ${
                                formData.paymentMethod === 'razorpay' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
                            }`}>
                                {formData.paymentMethod === 'razorpay' && <FaCheckCircle className="text-white text-xs" />}
                            </div>
                            <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        
                        {/* Cash */}
                        <div
                            onClick={() => handlePaymentMethodChange('cash')}
                            className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-colors ${
                                formData.paymentMethod === 'cash' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <div className={`min-w-5 h-5 border rounded-full flex items-center justify-center ${
                                formData.paymentMethod === 'cash' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
                            }`}>
                                {formData.paymentMethod === 'cash' && <FaCheckCircle className="text-white text-xs" />}
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Cash on Delivery</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="w-full mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting || cartItems.length === 0}
                        className="w-full bg-black text-white px-6 py-3 text-sm rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <InlineLoader size="sm" color="light" showText={false} />
                                Processing...
                            </>
                        ) : (
                            'PLACE ORDER'
                        )}
                    </button>
                </div>
            </div>
        </motion.form>
    );
};

// Helper function to format price
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price || 0);
};

export default OrderForm;