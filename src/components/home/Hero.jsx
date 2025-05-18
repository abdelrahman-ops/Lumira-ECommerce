import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaOpencart } from 'react-icons/fa';
import { TbBrandStorytel, TbSparkles } from 'react-icons/tb';
import { PiFlowerLotus, PiDiamond } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { assets } from '../../assets/assets';

const images = [
  {
    src: assets.hero4,
    title: 'Evening Elegance',
    subtitle: 'Collection exclusive',
    overlay: 'rgba(15, 15, 25, 0.3)',
    accent: 'from-purple-500/20 to-blue-500/10',
    textGlow: '0 0 20px rgba(159, 122, 234, 0.7)',
    subtitleColor: 'text-purple-200'
  },
  {
    src: assets.h9,
    title: 'Parisian Luxury',
    subtitle: 'Ready-to-wear',
    overlay: 'rgba(25, 15, 35, 0.25)',
    accent: 'from-rose-500/20 to-amber-500/10',
    textGlow: '0 0 20px rgba(236, 72, 153, 0.7)',
    subtitleColor: 'text-rose-200'
  },
  {
    src: assets.h11,
    title: 'Luminous Crafts',
    subtitle: 'Unique Pieces',
    overlay: 'rgba(20, 20, 30, 0.35)',
    accent: 'from-emerald-500/20 to-teal-500/10',
    textGlow: '0 0 20px rgba(16, 185, 129, 0.7)',
    subtitleColor: 'text-emerald-200'
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
    <motion.div 
      className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Gradient Background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${images[activeIndex].accent} z-0`}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 0.5 : 0.3 }}
        transition={{ duration: 1.5 }}
      />

      {/* Subtle Particle Effect */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden z-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, (Math.random() - 0.5) * 30],
                x: [0, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      )}

      {/* Image Slider */}
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
              <motion.img
                src={image.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover brightness-90"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Section */}
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
              {/* Enhanced Subtitle */}
              <motion.div
                className={`mb-4 ${images[activeIndex].subtitleColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="inline-flex items-center px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    <PiDiamond className="inline mr-2" />
                  </motion.span>
                  <span className="text-sm md:text-base tracking-widest font-medium">
                    {images[activeIndex].subtitle}
                  </span>
                  <motion.span
                    animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    <PiDiamond className="inline ml-2" />
                  </motion.span>
                </motion.div>
              </motion.div>
              
              {/* Title */}
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
                style={{ textShadow: images[activeIndex].textGlow }}
              >
                {images[activeIndex].title}
              </motion.h1>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href="/collection"
                className="flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium text-sm md:text-base hover:bg-white/90 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
                <FaOpencart className="text-lg" />
              </motion.a>
              
              <motion.a
                href="/about"
                className="flex items-center justify-center gap-2 px-8 py-3 md:py-4 border-2 border-white text-white rounded-full font-medium text-sm md:text-base hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Our Story
                <TbBrandStorytel className="text-lg" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute top-8 left-8 text-white/60"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ 
              duration: 120, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 8, repeat: Infinity },
              opacity: { duration: 4, repeat: Infinity }
            }}
          >
            <PiFlowerLotus className="text-3xl" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 right-8 text-white/60"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TbSparkles className="text-2xl" />
          </motion.div>
        </>
      )}

      {/* Border Glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none border-2 border-white/10 rounded-3xl"
        animate={{
          borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default Hero;