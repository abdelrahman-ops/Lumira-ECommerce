import { motion } from "framer-motion";
import Title from "./common/Title";

const LuxuryHeader = ({ 
    title1 = "EXQUISITE", 
    title2 = "Collections", 
    description = "Discover our hand-selected pieces, each meticulously crafted to embody timeless elegance and unparalleled quality.",
    accentColor = "blue"
}) => {
    // Define color mappings for different accents
    const accentColors = {
        blue: {
            gradient: "from-blue-600 to-indigo-600",
            text: "text-blue-600",
            shadow: "rgba(79, 70, 229, 0.3)"
        },
        amber: {
            gradient: "from-amber-600 to-orange-600",
            text: "text-amber-600",
            shadow: "rgba(217, 119, 6, 0.3)"
        },
        emerald: {
            gradient: "from-emerald-600 to-teal-600",
            text: "text-emerald-600",
            shadow: "rgba(5, 150, 105, 0.3)"
        }
    };

    const colors = accentColors[accentColor] || accentColors.blue;

    return (
        <motion.div 
            className={`relative overflow-hidden bg-indigo-50 py-10 rounded-3xl rounded-tl-[50px] md:rounded-tl-[100px] rounded-br-[50px] md:rounded-br-[100px] border border-opacity-20 border-white shadow-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                backdropFilter: 'blur(10px)',
                backgroundImage: 'radial-gradient(at 20% 30%, rgba(199, 210, 254, 0.3) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(199, 210, 254, 0.3) 0px, transparent 50%)'
            }}
        >
            {/* Floating luxury elements - Responsive sizing */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div 
                    className={`absolute top-1/4 left-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-${accentColor}-100 to-${accentColor}-200 filter blur-[50px] sm:blur-[80px] md:blur-[100px]`}
                    animate={{
                        x: [0, 20, 0],
                        y: [0, 20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className={`absolute bottom-1/3 right-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-${accentColor}-100 to-purple-100 filter blur-[60px] sm:blur-[90px] md:blur-[120px]`}
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -30, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 10,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    className="text-center mb-6 md:mb-8 lg:mb-10"
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        delay: 0.3,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <div className="text-center font-light tracking-tight">
                            <Title text1={title1} text2={title2} />
                        </div>
                    </motion.div>
                    
                    <motion.p 
                        className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6 leading-relaxed font-light`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        dangerouslySetInnerHTML={{ __html: description
                            .replace(/hand-selected/g, `<span class="font-medium ${colors.text}">hand-selected</span>`)
                            .replace(/timeless elegance/g, `<span class="font-medium ${colors.text}">timeless elegance</span>`)
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LuxuryHeader;