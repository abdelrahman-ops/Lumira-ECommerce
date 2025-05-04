import { useState } from 'react';
import Title from './../components/common/Title';
import { assets } from '../assets/assets';

const OrderForm = () => {
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
        paymentMethod: 'cash', // default to cash on delivery
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add logic for form submission here, such as sending data to an API
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* Delivery Information Section */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
            
            {/* First and Last Name */}
            <div className="flex gap-3">
                <input
                    required
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    required
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </div>
            {/* Email */}
            <input
                required
                id="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
            />
            {/* Street */}
            <input
                required
                id="street"
                name="street"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                type="text"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
            />


            {/* City, State, Zipcode, and Country */}
            <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <input
                    required
                    id="city"
                    name="city"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                />
                </div>
                <div className="flex-1">
                <input
                    id="state"
                    name="state"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                <input
                    required
                    id="zipcode"
                    name="zipcode"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="number"
                    placeholder="Zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                />
                </div>
                <div className="flex-1">
                <input
                    required
                    id="country"
                    name="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                />
                </div>
            </div>

            {/* Phone Number */}
            <div>
                <input
                required
                id="phone"
                name="phone"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                type="number"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                />
                </div>
            </div>

            {/* Cart Totals and Payment Method Section */}
            <div className="mt-8">
                {/* Cart Totals */}
                <div className="w-full">
                <div className="text-2xl">
                    <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 text-sm">
                    <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>$ 0.00</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>$ 10.00</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                    <b>Total</b>
                    <b>$ 0.00</b>
                    </div>
                </div>
                </div>

                {/* Payment Methods */}
                <div>
                    <div className="inline-flex gap-2 items-center mb-3 mt-14">
                        <p className="text-gray-500">PAYMENT <span className="text-gray-700 font-medium">METHOD</span></p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                    <div className="flex gap-3 flex-col lg:flex-row">
                        {/* Stripe */}
                        <div
                            onClick={() => setFormData({ ...formData, paymentMethod: 'stripe' })}
                                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                                formData.paymentMethod === 'stripe' ? 'border-black' : 'border-gray-300'
                            }`}
                        >
                            <div 
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    formData.paymentMethod === 'stripe' ? 'bg-green-400' : 'bg-white'
                                }`}>
                            </div>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
                        </div>
                        
                        {/* Razorpay */}
                        <div
                            onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                                formData.paymentMethod === 'razorpay' ? 'border-black' : 'border-gray-300'
                            }`}
                        >
                        
                            <div className={`min-w-3.5 h-3.5 border rounded-full ${
                                    formData.paymentMethod === 'razorpay' ? 'bg-green-400' : 'bg-white'
                                }`}>
                            </div>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        
                        {/* Cash */}
                        <div
                            onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                                formData.paymentMethod === 'cash' ? 'border-black' : 'border-gray-300'
                            }`}
                        >
                            <div className={`min-w-3.5 h-3.5 border rounded-full ${
                                formData.paymentMethod === 'cash' ? 'bg-green-400' : 'bg-white'
                            }`}>
                            </div>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="w-full text-end mt-8">
                    <button
                        type="submit"
                        className="bg-black text-white px-16 py-3 text-sm rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    );
};

export default OrderForm;
