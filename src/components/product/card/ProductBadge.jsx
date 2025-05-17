import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Clock, Award } from "lucide-react";

const ProductBadge = ({ badges = [] }) => {
  const badgeConfig = {
    bestseller: {
      text: "Best Seller",
      icon: <Star className="w-3 h-3" />,
      bgColor: "bg-amber-500",
      textColor: "text-white",
      order: 1,
    },
    new: {
      text: "New",
      icon: <Zap className="w-3 h-3" />,
      bgColor: "bg-green-500",
      textColor: "text-white",
      order: 0,
    },
    limited: {
      text: "Limited",
      icon: <Clock className="w-3 h-3" />,
      bgColor: "bg-red-500",
      textColor: "text-white",
      order: 2,
    },
    featured: {
      text: "Featured",
      icon: <Award className="w-3 h-3" />,
      bgColor: "bg-indigo-500",
      textColor: "text-white",
      order: 3,
    },
  };

  // Sort badges by their display order
  const sortedBadges = badges
    .map(type => badgeConfig[type] || badgeConfig.bestseller)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="absolute top-3 left-3 flex flex-col items-start gap-2 z-10">
      <AnimatePresence>
        {sortedBadges.map((badge, index) => (
          <motion.div
            key={`${badge.text}-${index}`}
            className={`${badge.bgColor} ${badge.textColor} text-xs font-semibold px-2 py-1 rounded-full shadow-sm flex items-center gap-1`}
            initial={{ scale: 0, x: -20 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 500,
              damping: 15,
              delay: index * 0.1
            }}
            whileHover={{ scale: 1.05 }}
          >
            {badge.icon}
            <span>{badge.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductBadge;