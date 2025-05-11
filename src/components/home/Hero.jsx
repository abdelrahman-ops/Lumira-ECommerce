/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax,  } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaOpencart } from 'react-icons/fa';
import { TbBrandStorytel, TbSparkles } from 'react-icons/tb';
import { PiFlowerLotus, PiDiamond } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { assets } from '../../assets/assets';
import '../../css/Hero.css';
const images = [
  {
    src: assets.hero4,
    title: 'Evening Elegance',
    subtitle: 'Collection exclusive',
    overlay: 'rgba(15, 15, 25, 0.3)',
    accent: 'from-purple-500/20 to-blue-500/10'
  },
  {
    src: assets.h9,
    title: 'Parisian Luxury',
    subtitle: 'Ready-to-wear',
    overlay: 'rgba(25, 15, 35, 0.25)',
    accent: 'from-rose-500/20 to-amber-500/10'
  },
  {
    src: assets.h11,
    title: 'Luminous Crafts',
    subtitle: 'Unique Pieces',
    overlay: 'rgba(20, 20, 30, 0.35)',
    accent: 'from-emerald-500/20 to-teal-500/10'
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]">
      {/* Glowing Background Layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${images[activeIndex].accent} opacity-30 z-0 transition-all duration-1000`} />
      
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1800}
        parallax={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Image with Glow Effect */}
              <motion.img
                src={image.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover brightness-90"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              />
              
              {/* Overlay with French-inspired gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content with Framer Motion */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p 
                className="text-sm md:text-base text-white/80 tracking-widest mb-2 font-light"
                whileHover={{ scale: 1.05 }}
              >
                <PiDiamond className="inline mr-2 text-amber-200" />
                {images[activeIndex].subtitle}
                <PiDiamond className="inline ml-2 text-amber-200" />
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight"
                style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}
              >
                {images[activeIndex].title}
              </motion.h1>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8"
          >
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.a
                href="/collection"
                className="flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium text-sm md:text-base transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <FiShoppingBag className="text-lg" /> */}
                Shop Now
                <FaOpencart className="text-lg" />
              </motion.a>
              
              <motion.a
                href="/about"
                className="flex items-center justify-center gap-2 px-8 py-3 md:py-4 border-2 border-white text-white rounded-full font-medium text-sm md:text-base transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <TbSparkles className="text-lg" /> */}
                Our Story
                <TbBrandStorytel className="text-lg" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-8 left-8 text-white/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <PiFlowerLotus className="text-3xl" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 right-8 text-white/50"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <TbSparkles className="text-2xl" />
      </motion.div>
    </div>
  );
};

export default Hero;