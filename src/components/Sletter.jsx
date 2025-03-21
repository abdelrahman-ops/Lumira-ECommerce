import { assets } from "../assets/assets";

const Sletter = () => {
    return (
        <div className="bg-white">
            {/* New Section with Icons and Text */}
            <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-blue-950 font-bold">
                <div>
                    <img src={assets.exchange_icon} alt="Easy Exchange" className="w-12 m-auto mb-5 " />
                    <p className="">Easy Exchange Policy</p>
                    <p className="text-blue-700 font-semibold hover:text-indigo-500 ">We offer hassle-free exchange policy</p>
                </div>
                <div>
                    <img src={assets.quality_icon} alt="7 Days Return" className="w-12 m-auto mb-5" />
                    <p className="">7 Days Return Policy</p>
                    <p className="text-blue-700 font-semibold hover:text-indigo-500">We provide 7 days free return policy</p>   
                </div>
                <div>
                    <img src={assets.support_img} alt="Best Support" className="w-12 m-auto mb-5" />
                    <p className="">Best Customer Support</p>
                    <p className="text-blue-700 font-semibold hover:text-indigo-500">We provide 24/7 customer support</p>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-900 py-16 px-5 sm:px-20 rounded-xl shadow-lg">
                <div className="text-center text-white">
                    <p className="text-3xl font-semibold">Subscribe & Save 20% Today</p>
                    <p className="mt-3 text-lg text-gray-200">Stay updated with our latest styles and get an exclusive discount.</p>

                    {/* Subscription Form */}
                    <form className="w-full sm:w-2/3 flex items-center justify-center mx-auto my-6 p-2 bg-white rounded-full shadow-xl">
                        <input 
                            className="w-full sm:w-3/4 p-3 outline-none text-gray-700 rounded-full focus:ring-2 focus:ring-blue-300 transition duration-300" 
                            type="email" 
                            placeholder="Enter your email" 
                            required 
                        />
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-sm font-medium px-8 py-3 rounded-full ml-4 hover:bg-gradient-to-l transition duration-300 ease-in-out"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="text-gray-200 text-sm">No spam, we promise! Only the best deals and news.</p>
                </div>
            </div>
        </div>
    );
}

export default Sletter;
