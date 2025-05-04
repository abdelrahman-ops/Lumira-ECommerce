import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const RatingStars = ({ 
  rating = 0, 
  size = 'md',
  showNumber = false,
  className = '' 
}) => {
  // Validate rating between 0-5
  const validatedRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(validatedRating);
  const hasHalfStar = validatedRating % 1 >= 0.5;
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex ${sizeClasses[size] || sizeClasses.md}`}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <FontAwesomeIcon 
                key={`full-${i}`} 
                icon={faStar} 
                className="text-yellow-400" 
              />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <FontAwesomeIcon 
                key="half" 
                icon={faStarHalfAlt} 
                className="text-yellow-400" 
              />
            );
          }
          return (
            <FontAwesomeIcon 
              key={`empty-${i}`} 
              icon={faStarRegular} 
              className="text-yellow-400" 
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="ml-2 text-gray-600 text-sm">
          {validatedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;