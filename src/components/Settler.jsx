// import React from 'react'
import { assets } from "../assets/frontend_assets/assets"
const Settler = () => {
    return (
    <div>
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            <div>
                <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
                <p className="font-semibold">Easy Exchange Policy </p>
                <p className=" text-gray-400">We offer hassle free exchange policy</p>
            </div>
            <div>
                <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
                <p className="font-semibold">7 Days Return Policy</p>
                <p className=" text-gray-400">We provide 7 days free return policy</p>   
            </div>
            <div>
                <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
                <p className="font-semibold">Best customer support</p>
                <p className=" text-gray-400">we provide 24/7 customer support</p>
            </div>
        </div>
        
        <div className=" text-center">
                <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
                <p className=" text-gray-400 mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                    <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required="" />
                    <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
                </form>
        </div>
    </div>
    )
}

export default Settler
