import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "../css/Hero.css";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
    const images = [assets.hero2, assets.hero3]; // Replace with your images

    return (
        <div className="hero-container relative w-full h-[40vh] 
        md:h-[65vh] lg:h-[60vh] overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-xl
        z-0
        ">
            {/* Swiper Section */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                className="h-full rounded-xl"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl filter blur-sm md:blur-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 rounded-xl"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-xl">
                <p className="text-xs md:text-sm text-gray-200 uppercase tracking-wide mb-4 animate-fade-in">
                    The Fashion You Deserve
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug animate-slide-in drop-shadow-lg">
                    Unleash Your Style
                </h1>
                <p className="mt-4 text-gray-300 text-sm md:text-base lg:text-lg max-w-md md:max-w-lg mx-auto animate-fade-in">
                    Discover cutting-edge designs and timeless trends that redefine elegance.
                </p>
                <a
                    href="#shop-now"
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-sm md:text-base uppercase rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-bounce-slow"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
};

export default Hero;
