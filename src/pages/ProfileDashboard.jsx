/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useData } from '../context/DataContext';

import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileLoader from '../components/profile/ProfileLoader';

import ProfileDetails from '../components/profile/ProfileDetails';
import OrderHistory from '../components/profile/OrderHistory';
import WishList from '../components/profile/WishList';
import Payment from '../components/profile/Payment';
import Address from '../components/profile/Address';
import Notifications from '../components/profile/Notifications';
// import Settings from './profile/Settings';

const DEFAULT_SECTION = 'profile';

const getUserFormData = (user) => ({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    number: user?.number || '',
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    image: user?.image || null,
});

const ProfileDashboard = () => {
    const { user, fetchUserData, updateUserData } = useData();

    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(getUserFormData(null));
    const [imagePreview, setImagePreview] = useState(null);
    const [activeSection, setActiveSection] = useState(DEFAULT_SECTION);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

  // Load user data and initialize form
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

        if (user) {
            setFormData(getUserFormData(user));
            setIsLoading(false);
        } else {
            loadUserData();
        }
    }, [user]);

    // Clean up image object URL on unmount
    useEffect(() => {
        return () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.match('image.*')) {
            setErrorMsg('Please select a valid image file.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setErrorMsg('Image must be less than 2MB');
            return;
        }

        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));

    };

    const handleSave = async (e) => {
        e.preventDefault();
        setErrorMsg('');
    
        try {
            const submission = new FormData();
            
            // Append all regular fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'image' && value !== null && value !== undefined) {
                    submission.append(key, value);
                }
            });
    
            // Append image if it exists
            if (formData.image instanceof File) {
                submission.append('image', formData.image);
            }
    
            const response = await updateUserData(submission);
            if (response.success) {
                await fetchUserData();
                setIsEditing(false);
            } else {
                setErrorMsg(response.error || 'Profile update failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Unexpected error occurred. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        if (user) {
        setFormData(getUserFormData(user));
        }
        setImagePreview(null);
        setIsEditing(false);
        setErrorMsg('');
    };

    const renderSection = useCallback(() => {
        switch (activeSection) {
        case 'orders':
            return <OrderHistory />;
        case 'wishlist':
            return <WishList />;
        case 'payments':
            return <Payment />;
        case 'addresses':
            return <Address />;
        case 'notifications':
            return <Notifications />;
        // case 'settings':
        //     return <Settings />;
        default:
            return (
            <ProfileDetails
                user={user}
                isEditing={isEditing}
                formData={formData}
                setIsEditing={setIsEditing}
                handleChange={handleChange}
                handleSave={handleSave}
                handleImageChange={handleImageChange}
                displayImage={
                imagePreview ||
                (user?.image && `https://server-e-commerce-seven.vercel.app${user.image}`) ||
                assets.profile
                }
                setFormData={setFormData}
                handleCancelEdit={handleCancelEdit}
                errorMsg={errorMsg}
            /> // https://server-e-commerce-seven.vercel.app http://localhost:5000
            );
        }
    }, [activeSection, user, formData, isEditing, imagePreview, errorMsg]);

    if (isLoading || !user) {
        return <ProfileLoader sections={['basic', 'detailed']} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 py-10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar
                image={
                imagePreview ||
                (user.image && `https://server-e-commerce-seven.vercel.app${user.image}`) ||
                assets.profile
                }
                data={user}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Main Section */}
            <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 ease-in-out">
                {renderSection()}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ProfileDashboard;
