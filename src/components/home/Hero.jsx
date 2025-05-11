/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { assets } from '../../assets/assets';
import '../../css/Hero.css'
import { TbBrandStorytel } from "react-icons/tb";
import { FaOpencart } from "react-icons/fa";
import { PiArrowBendUpRightDuotone , PiArrowBendUpLeftDuotone} from "react-icons/pi";
const images = [
    {
        src: assets.hero4,
        alt: 'Elegant evening wear collection',
        overlay: 'rgba(15, 15, 25, 0.4)',
        title: 'Evening Elegance',
        subtitle: 'Discover our premium collection'
    },
    {
        src: assets.h9,
        alt: 'Luxury street fashion',
        overlay: 'rgba(25, 15, 35, 0.35)',
        title: 'Urban Luxury',
        subtitle: 'Streetwear reimagined'
    },
    {
        src: assets.h11,
        alt: 'Premium accessories line',
        overlay: 'rgba(20, 20, 30, 0.45)',
        title: 'Accessory Artistry',
        subtitle: 'Crafted perfection'
    },
    {
        src: assets.h12,
        alt: 'Designer footwear collection',
        overlay: 'rgba(30, 20, 20, 0.4)',
        title: 'Step in Style',
        subtitle: 'Signature footwear'
    },
    {
        src: assets.h13,
        alt: 'Haute couture selection',
        overlay: 'rgba(15, 25, 25, 0.35)',
        title: 'Haute Couture',
        subtitle: 'Exclusive designs'
    },
];

const Hero = () => {
    const swiperRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        images.forEach((img) => {
            const image = new Image();
            image.src = img.src;
        });

        return () => setIsMounted(false);
    }, []);

    const handleSlideChange = () => {
        if (swiperRef.current) {
            setActiveIndex(swiperRef.current.swiper.realIndex);
        }
    };

    return (
        <div 
            className="relative w-full h-[40vh] md:h-[65vh] lg:h-[80vh] overflow-hidden rounded-3xl shadow-3xl isolate group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade, Parallax, Navigation, Pagination]}
                effect="fade"
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true,
                }}
                loop={true}
                parallax={true}
                speed={1500}
                fadeEffect={{ crossFade: true }}
                className="h-full w-full rounded-3xl"
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} custom-bullet"></span>`;
                    },
                }}
                onSlideChange={handleSlideChange}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading={index < 2 ? 'eager' : 'lazy'}
                                className={`absolute inset-0 w-full h-full object-cover rounded-3xl brightness-90 contrast-105 saturate-110 transition-all duration-[12s] ${
                                    isHovered ? 'scale-100' : 'scale-[1.05]'
                                }`}
                                onLoad={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />
                            <div
                                className="absolute inset-0 rounded-3xl z-0"
                                style={{
                                    background: image.overlay,
                                    backdropFilter: 'blur(2px)',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 rounded-3xl z-0" />
                            
                            {/* Slide-specific content */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-left px-8 md:px-16 lg:px-24 transition-all duration-1000 transform translate-y-10 opacity-0 swiper-slide-active:opacity-100 swiper-slide-active:translate-y-0">
                                <p className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.3em] mb-2 opacity-90 font-medium animate-fade-in">
                                    {images[activeIndex].subtitle}
                                </p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-tight animate-fade-in">
                                    <span className="font-serif italic">{images[activeIndex].title}</span>
                                </h1>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Main Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4 animate-fade-in">
                        <span className="font-serif italic drop-shadow-lg">Lumière</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight animate-slide-in drop-shadow-2xl mb-2">
                        Unleash Your Style
                    </h2>
                    <p className="text-white/90 text-base md:text-lg lg:text-xl mb-8 max-w-lg mx-auto animate-fade-in">
                        Experience the pinnacle of fashion craftsmanship with our exclusive designer pieces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16 pt-8 animate-fade-in">
                        <a
                            href="/collection"
                            className="relative inline-flex items-center justify-center px-8 py-4 
                            text-white text-base md:text-lg uppercase tracking-wider 
                            overflow-hidden duration-500 group border-2 border-white/80
                            rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10
                            hover:shadow-lg hover:scale-105 transform transition-transform
                            "
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Collection
                                <FaOpencart className="h-5 w-5" />
                            </span>
                        </a>
                        <a
                            href="/about"
                            className="relative inline-flex items-center justify-center px-8 py-4 
                            text-white text-base md:text-lg uppercase tracking-wider 
                            overflow-hidden duration-500 group border-2 border-white/80
                            rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10
                            hover:shadow-lg hover:scale-105 transform transition-transform
                            "
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Our Story
                                <TbBrandStorytel className="h-5 w-5" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;