import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { assets } from "../assets/assets";
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

import PhoneNumberInput from '../hooks/PhoneNumberInput';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileLoader from '../components/ProfileLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, faUser, faCalendar, faPhone, faSave, faEdit, faSignOutAlt, faTimes 
} from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { user, error, fetchUserData, clearUserData } = useData();
    console.log("userdata from profile", user);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [activeSection, setActiveSection] = useState('profile');
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { id } = useParams();


    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        image: null,
    });

    // Fetch user data on component mount
    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                number: user.number,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                image: user.image,
            });
            // Simulate loading delay for better UX
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // If no user data, try to fetch it
            fetchUserData().catch(() => {
                setIsLoading(false);
            });
        }
    }, [user, fetchUserData]);

    
    // Handle logout
    const handleLogout = () => {
        Cookies.remove('token');
        logout();
        navigate('/login');
    };


    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Save updated profile data
    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const formDataToSubmit = new FormData();

            // Append all form data to FormData object
            Object.keys(formData).forEach(key => {
                // formDataToSubmit.append(key, formData[key]);
                if (formData[key] !== null && formData[key] !== undefined) {
                    formDataToSubmit.append(key, formData[key]);
                }
            });

            const response = await axios.put('http://localhost:5000/api/users/update', formDataToSubmit, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setFormData(response.user);
            storeData(response.user);
            setIsEditing(false);

            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancelEdit = () => {
        // Reset form to original user data
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            number: user.number || '',
            email: user.email || '',
            dateOfBirth: user.dateOfBirth || '',
            gender: user.gender || '',
            image: user.image || null,
        });
        setImagePreview(null);
        setIsEditing(false);
    };

    if (isLoading || !user) {
        return <ProfileLoader sections={['basic', 'detailed']} />;
    }


    const defaultImage = assets.profile;
    const userImage = user.image ? `http://localhost:5000${user.image}` : null;
    const displayImage = imagePreview || userImage || defaultImage;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <ProfileSidebar
                        image={displayImage}
                        data={user}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />

                    {/* Main Content */}
                    <div className="flex-1 bg-white shadow-2xl rounded-lg p-8">
                        {/* Profile Section */}
                        {activeSection === 'profile' && (
                            <div>
                                {/* Header with Edit/Cancel/Save Buttons */}
                                <div className="flex justify-between items-center mb-8">
                                    <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
                                    <div className="flex gap-4">
                                        {isEditing ? (
                                            <>
                                                {/* Cancel Button */}
                                                <button
                                                    onClick={() => setIsEditing(false)} 
                                                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                                    Cancel
                                                </button>

                                                {/* Save Button */}
                                                <button
                                                    onClick={handleSave} 
                                                    className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-6 py-2 rounded-2xl 
                                                            hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                                                >
                                                    {/* from-purple-500 via-indigo-500 to-blue-500 */}
                                                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                                                    Save Changes
                                                </button>
                                            </>
                                        ) : (
                                            /* Edit Button */
                                            <button 
                                                onClick={() => setIsEditing(true)} 
                                                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-6 py-2 rounded-2xl 
                                                        hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                                            >
                                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Profile Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden group">
                                            <img
                                                src={displayImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                            {isEditing && (
                                                <div
                                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                                                    onClick={() => document.getElementById('imageInput').click()}
                                                >
                                                    <span className="text-white text-sm">Change</span>
                                                    <input
                                                        type="file"
                                                        id="imageInput"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold">{`${formData.firstName} ${formData.lastName}`}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Editable Personal Information */}
                                {isEditing ? (
                                    <form className="space-y-6" onSubmit={handleSave}>
                                        {/* Name Field */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="flex-1 outline-none bg-transparent"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className="flex-1 outline-none bg-transparent"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date of Birth Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={
                                                        formData.dateOfBirth && !isNaN(new Date(formData.dateOfBirth).getTime())
                                                            ? new Date(formData.dateOfBirth).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Gender Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"
                                                        checked={formData.gender === 'male'}
                                                        onChange={handleChange}
                                                    />
                                                    <span>Male</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"
                                                        checked={formData.gender === 'female'}
                                                        onChange={handleChange}
                                                    />
                                                    <span>Female</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Phone Number Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
                                                <PhoneNumberInput
                                                    onChange={(completePhoneNumber) => setFormData((prevData) => ({ ...prevData, number: completePhoneNumber }))}
                                                    defaultPhone={formData.number}
                                                    defaultCountryCode={formData.countryCode}
                                                />
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
                                                <input
                                                    type="email"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={user.email}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Name Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                                <input
                                                    type="text"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={`${user.firstName} ${user.lastName}`}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        {/* Date of Birth Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
                                                <input
                                                    type="date"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={
                                                        user.dateOfBirth && !isNaN(new Date(user.dateOfBirth).getTime())
                                                            ? new Date(user.dateOfBirth).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        {/* Gender Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"
                                                        checked={user.gender === 'male'}
                                                        readOnly
                                                    />
                                                    <span>Male</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"
                                                        checked={user.gender === 'female'}
                                                        readOnly
                                                    />
                                                    <span>Female</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Phone Number Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
                                                <input
                                                    type="text"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={user.number}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
                                                <input
                                                    type="email"
                                                    className="flex-1 outline-none bg-transparent"
                                                    value={user.email}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Orders Section */}
                        {activeSection === 'orders' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                                <p className="text-gray-500">No orders placed yet.</p>
                            </div>
                        )}

                        {/* Wishlist Section */}
                        {activeSection === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
                                <p className="text-gray-500">Your wishlist is empty.</p>
                            </div>
                        )}

                        {/* Payments Section */}
                        {activeSection === 'payments' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                                <p className="text-gray-500">No payment methods saved.</p>
                            </div>
                        )}

                        {/* Addresses Section */}
                        {activeSection === 'addresses' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Addresses</h2>
                                <p className="text-gray-500">No addresses saved.</p>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeSection === 'notifications' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                                <p className="text-gray-500">No notifications.</p>
                            </div>
                        )}

                        {/* Settings Section */}
                        {activeSection === 'settings' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                                <button 
                                    className="flex items-center text-red-500 hover:text-red-600"
                                    onClick={handleLogout}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;