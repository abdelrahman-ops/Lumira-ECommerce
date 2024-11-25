import { useState, useEffect } from 'react';
import { assets } from "../assets/frontend_assets/assets";
import '../css/Hero.css'

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of hero images
    const images = [assets.hero2, assets.hero3]; // Add your image paths here

    // Change the image every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [images.length]);

    return (
        <div className="flex flex-col sm:flex-row border border-gray-400">
            {/* Text Section */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
                    </div>

                    <h1 id="la" className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                        Latest Arrivals
                    </h1>

                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            {/* Image Section with Slider */}
            <div className="w-full sm:w-1/2 relative overflow-hidden flex items-center justify-center">
                <img
                    src={images[currentImageIndex]} // Dynamic image based on index
                    alt="Latest Arrivals"
                    className="w-full h-auto object-cover aspect-[16/9] max-h-[500px] rounded-md transition-opacity duration-1000"
                />
            </div>
        </div>
    );
};

export default Hero;
