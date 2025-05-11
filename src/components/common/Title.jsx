import { motion } from "framer-motion";

const Title = ({ text1, text2, className = "" }) => {
    return (
        <motion.div 
            className={`inline-flex flex-col gap-1 group cursor-pointer ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                }
            }}
        >
            {/* Text Part */}
            <div className="flex items-center gap-3">
                <p className="text-gray-500 text-lg sm:text-2xl font-light tracking-tight">
                    {text1}{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 bg-clip-text text-transparent font-medium">
                        {text2}
                    </span>
                </p>

                {/* Animated Gradient Line */}
                <motion.div 
                    className="relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                    <div className="w-full h-[2px] bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 group-hover:from-purple-500 group-hover:to-blue-500" />
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-full bg-white mix-blend-screen"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                            duration: 1.8, 
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                    />
                </motion.div>
            </div>

            {/* Subtle Underline Animation */}
            <motion.div 
                className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent w-0 group-hover:w-full"
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
        </motion.div>
    );
};

export default Title;