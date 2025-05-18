import { url } from "../constant/URL";

export const ProfileImage = ({ image, className }) => {
    const isGoogleImage = image?.includes('googleusercontent.com');
    
    return (
        <img 
            src={isGoogleImage ? image : `${url}${image}`}
            alt="Profile"
            className={className}
            onError={(e) => {
                // Fallback if image fails to load
                e.target.src = '/default-profile.jpg';
            }}
        />
    );
};