/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useData } from '../context/DataContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileLoader from '../components/profile/ProfileLoader';
import { url } from '../components/constant/URL';

const ProfileDashboard = () => {
    const { user, fetchUserData } = useData();
    const [isLoading, setIsLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);

    // Load user data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                await fetchUserData();
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, [fetchUserData]);

    // Clean up image preview
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    if (isLoading || !user) {
        return <ProfileLoader sections={['basic', 'detailed']} />;
    }

    // Safe image URL handling
    const getImageUrl = () => {
        if (imagePreview) return imagePreview;
        
        if (!user.image) return assets.profile;
        
        // Check if it's a Google image URL
        if (typeof user.image === 'string' && user.image.includes('googleusercontent.com')) {
            return user.image;
        }
        
        // Handle local image path
        return `${url}${user.image}`;
    };  

    const profileImageUrl = getImageUrl();

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <ProfileSidebar
                        image={
                            profileImageUrl
                        }
                        data={user}
                        setImagePreview={setImagePreview}
                    />
                    
                    {/* Main Content Area */}
                    <div className="flex-1 transition-all duration-300 ease-in-out">
                        <Outlet context={{ 
                            user, 
                            image: profileImageUrl,
                            setImagePreview 
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;