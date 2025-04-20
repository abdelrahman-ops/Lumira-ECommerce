/* eslint-disable react-hooks/exhaustive-deps */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import { assets } from "../assets/assets";
import "../css/Hero.css";
import { useEffect } from "react";

const Hero = () => {
    // Preload images for better performance
    const preloadImages = (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    const images = [
        { src: assets.hero4, alt: "Fashion collection 1" },
        { src: assets.h9, alt: "Fashion collection 2" },
        { src: assets.h11, alt: "Fashion collection 3" },
        { src: assets.h12, alt: "Fashion collection 4" },
        { src: assets.h13, alt: "Fashion collection 5" }
    ];

    // Preload images on component mount
    useEffect(() => {
        preloadImages(images.map(img => img.src));
    }, []);

    return (
        <div className="hero-container relative w-full h-[40vh] md:h-[65vh] lg:h-[80vh] overflow-hidden rounded-xl shadow-2xl z-0">
            {/* Swiper Section */}
            <Swiper
                modules={[Autoplay, EffectFade, Parallax]}
                effect="fade"
                autoplay={{ 
                    delay: 5000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true
                }}
                loop={true}
                parallax={true}
                speed={1000}
                fadeEffect={{ crossFade: true }}
                className="h-full w-full rounded-xl"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Optimized image with loading="eager" for above-the-fold content */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="eager"
                                className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-75 contrast-110 saturate-110"
                                style={{
                                    willChange: 'transform',
                                    transform: 'scale(1.05)',
                                    transition: 'transform 8s ease-out'
                                }}
                                onLoad={(e) => {
                                    // Smooth scale animation after image loads
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 rounded-xl"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
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