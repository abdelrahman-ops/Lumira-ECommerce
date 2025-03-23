import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import { assets } from "../assets/assets";
import "../css/Hero.css";
const Hero = () => {
    const images = [assets.hero4, assets.h9, assets.h10, assets.h11, assets.h12, assets.h13]; // Replace with your images

    return (
        <div 
        className="hero-container relative w-full h-[40vh] md:h-[65vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-2xl z-0">
            {/* Swiper Section */}
            <Swiper
                modules={[Autoplay, EffectFade, Parallax]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                parallax={true}
                className="h-full rounded-xl"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl filter brightness-75 contrast-110 saturate-110 transform scale-105 hover:scale-100 transition-transform duration-5000 ease-in-out"
                                data-swiper-parallax="-20%"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 rounded-xl"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
                <p className="text-xs md:text-sm text-gray-200 uppercase tracking-widest mb-4 animate-fade-in">
                    The Fashion You Deserve
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-in drop-shadow-2xl">
                    Unleash Your Style
                </h1>
                <p className="mt-4 text-gray-300 text-sm md:text-base lg:text-lg max-w-md md:max-w-lg mx-auto animate-fade-in">
                    Discover cutting-edge designs and timeless trends that redefine elegance.
                </p>
                <a
                    href="#shop-now"
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-sm md:text-base uppercase rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-bounce-slow"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
};

export default Hero;