import React from 'react';
import { motion } from 'framer-motion';

interface EmptyCartIllustrationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
}

const EmptyCartIllustration: React.FC<EmptyCartIllustrationProps> = ({
  className = '',
  width = 256,
  height = 256,
  primaryColor = '#6B7280', // gray-500
  secondaryColor = '#9CA3AF' // gray-400
}) => {
  return (
    <motion.svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cart Body */}
      <motion.path
        d="M96 216C96 220.418 92.4183 224 88 224C83.5817 224 80 220.418 80 216C80 211.582 83.5817 208 88 208C92.4183 208 96 211.582 96 216Z"
        fill={primaryColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.path
        d="M176 216C176 220.418 172.418 224 168 224C163.582 224 160 220.418 160 216C160 211.582 163.582 208 168 208C172.418 208 176 211.582 176 216Z"
        fill={primaryColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25 }}
      />
      <motion.path
        d="M224 72L211.2 164.8C210.756 168.049 208.049 170.756 204.8 171.2L60.8 188.8C57.5506 189.244 54.8438 186.537 54.4 183.288L42 72H224Z"
        stroke={primaryColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Cart Wheels */}
      <motion.circle
        cx="88"
        cy="216"
        r="16"
        stroke={secondaryColor}
        strokeWidth="4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.circle
        cx="168"
        cy="216"
        r="16"
        stroke={secondaryColor}
        strokeWidth="4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35 }}
      />
      
      {/* Cart Handle */}
      <motion.path
        d="M56 72L40 40H16"
        stroke={primaryColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      
      {/* Empty State Elements */}
      <motion.path
        d="M104 136L152 136"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <motion.path
        d="M104 104L152 104"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
      <motion.path
        d="M104 72L152 72"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />
      
      {/* Question Mark */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <circle cx="200" cy="120" r="24" fill={primaryColor} />
        <path
          d="M200 104V108M200 136V140"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M200 116C200 112 196 108 192 108"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
};

export default EmptyCartIllustration;