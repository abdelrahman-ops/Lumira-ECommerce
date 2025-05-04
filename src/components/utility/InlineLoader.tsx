import React, { FC } from 'react';

type InlineLoaderProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  text?: string;
  showText?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const InlineLoader: FC<InlineLoaderProps> = ({
  size = 'md',
  color = 'primary',
  text = 'Loading...',
  showText = true,
  fullWidth = false,
  className = ''
}) => {
  // Size mappings
  const sizeClasses = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-10 h-10 border-4',
    xl: 'w-12 h-12 border-4'
  };

  // Color mappings
  const colorClasses = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-cyan-500',
    light: 'border-gray-200',
    dark: 'border-gray-800'
  };

  // Text size mappings (relative to spinner)
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-base'
  };

  return (
    <div className={`flex items-center justify-center ${fullWidth ? 'w-full' : ''} ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-2">
        {/* Spinner with transparent top border for rotation effect */}
        <div
          className={`rounded-full animate-spin border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
          aria-label="Loading"
        />
        
        {/* Optional loading text */}
        {showText && (
          <p className={`text-gray-600 font-light ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default InlineLoader;