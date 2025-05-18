import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield,
  CalendarCheck,
  ChevronRight,
  Award,
  Zap
} from "lucide-react";
import { BiSolidHot } from "react-icons/bi";

const ProductBadge = ({ badges = [], isHovered = false }) => {
  const badgeConfig = {
    bestseller: {
      text: "Bestseller",
      icon: <BiSolidHot className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-yellow-400 to-amber-500",
      hoverColor: "from-amber-500 to-yellow-500",
      textColor: "text-amber-50",
      borderColor: "border-amber-300/30",
      order: 1,
    },
    new: {
      text: "New Arrival",
      icon: <CalendarCheck className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500",
      hoverColor: "from-cyan-500 to-blue-500",
      textColor: "text-cyan-50",
      borderColor: "border-cyan-300/30",
      order: 0,
    },
    limited: {
      text: "Limited Edition",
      icon: <Award className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-rose-500 to-pink-600",
      hoverColor: "from-pink-600 to-rose-500",
      textColor: "text-pink-50",
      borderColor: "border-pink-300/30",
      order: 2,
    },
    featured: {
      text: "Featured",
      icon: <Shield className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
      hoverColor: "from-indigo-600 to-purple-500",
      textColor: "text-indigo-50",
      borderColor: "border-indigo-300/30",
      order: 3,
    },
    exclusive: {
      text: "Exclusive",
      icon: <Zap className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
      hoverColor: "from-fuchsia-600 to-violet-600",
      textColor: "text-fuchsia-50",
      borderColor: "border-fuchsia-300/30",
      order: 4,
    },
    seasonal: {
      text: "Seasonal",
      icon: <CalendarCheck className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
      hoverColor: "from-teal-600 to-emerald-500",
      textColor: "text-teal-50",
      borderColor: "border-teal-300/30",
      order: 5,
    },
  };

  // Sort badges by their display order
  const sortedBadges = badges
    .map(type => badgeConfig[type] || badgeConfig.bestseller)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="absolute top-3 left-3 flex flex-col items-start gap-2 z-20">
      <AnimatePresence>
        {sortedBadges.map((badge, index) => (
          <motion.div
            key={`${badge.text}-${index}`}
            className={`group ${badge.bgColor} ${badge.textColor} border ${badge.borderColor} text-xs font-semibold rounded-full shadow-lg flex items-center backdrop-blur-sm bg-opacity-90 overflow-hidden relative`}
            initial={{ scale: 0, y: -10, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0,
              opacity: 1,
              background: isHovered 
                ? `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`
                : badge.bgColor,
              transition: { 
                type: "spring", 
                stiffness: 500,
                damping: 20,
                delay: index * 0.1
              }
            }}
            exit={{ scale: 0, y: -10, opacity: 0 }}
            whileHover={{
              background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
              transition: { duration: 0.3 }
            }}
          >
            {/* Glow effect */}
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-white/10 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className="flex items-center relative z-10">
              <motion.div
                className="p-2 flex items-center justify-center"
                animate={{ 
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                  scale: isHovered ? [1, 1.15, 1] : 1,
                  transition: { 
                    duration: 0.6,
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "mirror",
                    delay: index * 0.2
                  }
                }}
              >
                {badge.icon}
              </motion.div>
              
              <motion.div
                className="flex items-center pr-0 overflow-hidden"
                initial={{ width: 0 }}
                animate={isHovered ? "hover" : "initial"}
                variants={{
                  initial: { 
                    width: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 400,
                      damping: 20,
                      delay: 0
                    }
                  },
                  hover: { 
                    width: "auto",
                    paddingRight: "0.75rem",
                    transition: { 
                      type: "spring", 
                      stiffness: 300,
                      damping: 15,
                      delay: 0.1
                    }
                  }
                }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={isHovered ? "hover" : "initial"}
                  variants={{
                    initial: { 
                      opacity: 0, 
                      x: -10,
                      transition: { duration: 0.1 }
                    },
                    hover: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.2
                      }
                    }
                  }}
                  className="whitespace-nowrap"
                >
                  {badge.text}
                </motion.span>
                <motion.span
                  className="ml-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isHovered ? "hover" : "initial"}
                  variants={{
                    initial: { 
                      opacity: 0, 
                      scale: 0,
                      transition: { duration: 0.1 }
                    },
                    hover: { 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: 0.25
                      }
                    }
                  }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductBadge;