import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { assets } from "../assets/frontend_assets/assets";

import { useData } from '../context/DataContext';
import PhoneNumberInput from '../hooks/PhoneNumberInput';

import ProfileSidebar from '../components/ProfileSidebar';
import Title from "../components/Title";
import ProfileLoader from '../components/ProfileLoader';
import ProfileShow from './ProfileShow';
// import ProfileEdit from './ProfileEdit';

// import PhoneNumberDisplay from '../hooks/PhoneNumberDisplay';



const Profile = () => {
    const { data , storeData} = useData();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

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
    
    
    
    useEffect(() => {
        if (data) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            setFormData({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                number: data.number,
                email: data.email,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                image: data.image,
            });

            return () => clearTimeout(timer);
        }
    }, [data]);
    

    
    const handleEditClick = () => setIsEditing(true);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSubmit.append(key, formData[key]);
            });
    
            const response = await axios.put('https://server-e-commerce-seven.vercel.app/api/users/update', formDataToSubmit, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            setFormData(response.data);
            storeData(response.data);
            setIsEditing(false);
    
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    
    
    

    if (isLoading) {
        return <ProfileLoader sections={['basic' , 'detailed']} />
    }


    const defaultImage = `${assets.profile}`;
    const userImage = data.image ? `https://server-e-commerce-seven.vercel.app${data.image}` : null;
    const displayImage = imagePreview || userImage || defaultImage;

    
    return (
        <>
            <div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                    {/* Sidebar Section */}
                    <ProfileSidebar image={displayImage} data={data}  />

                    {/* Personal Information Section */}
                    <div className="flex-1">
                        <div className="flex justify-between text-base sm:text-2xl mb-4">
                            <Title text1="PERSONAL" text2="INFORMATION" />
                        </div>

                        <div className="w-full max-w-3xl border bg-white shadow-md rounded-lg p-6">
                            {/* Profile Header */}
                            <div className="flex items-center flex-wrap justify-between mb-6">
                                <div className='flex items-center gap-4 max-sm:hidden'>
                                    {isEditing ? ( 
                                        <>
                                            <div className="flex items-center flex-wrap justify-between mb-6 relative">
                                                <div 
                                                    className='relative w-32 h-32 rounded-full group cursor-pointer' 
                                                    onClick={() => document.getElementById('imageInput').click()}
                                                >
                                                    <img
                                                        src={displayImage}
                                                        alt="Profile"
                                                        className="w-full h-full rounded-full"
                                                    />
                                                    <span
                                                        className="material-symbols-outlined rounded-full p-2 absolute top-1/2 left-1/2 bg-green-500 text-white
                                                                    transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                                                    >
                                                        reset_image
                                                    </span>

                                                    <input
                                                        type="file"
                                                        id="imageInput"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />

                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                            <img 
                                                src={displayImage} 
                                                alt="Profile" 
                                                className="w-32 h-32 rounded-full" 
                                            />
                                    )}
                                    <div>
                                        <p className="text-lg font-semibold">{"Name"}</p>
                                        <p className="text-sm text-gray-500">{formData.firstName}</p>
                                    </div>
                                </div>
                                <div className="text-sm px-2 sm:mt-5">
                                    {isEditing ? (
                                        <button onClick={handleSave} className="text-blue-500">Save Changes</button>
                                    ) : (
                                        <p className="text-blue-500 hover:underline cursor-pointer" onClick={handleEditClick}>Change Profile Information</p>
                                    )}
                                </div>
                            </div>



                            {/* Form Fields */}

                            {isEditing ? 
                            (
                                // {/* EDIT MODE*/}
                                <form className="space-y-6" onSubmit={handleSave}>
                                    {/* Name Field */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium">First Name</label>
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            className="border rounded-md p-2 mt-1"
                                            value={formData.firstName} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            className="border rounded-md p-2 mt-1"
                                            value={formData.lastName} 
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Date of Birth Field */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium">Date Of Birth</label>
                                        <input 
                                            type="date" 
                                            name="dateOfBirth"
                                            className="border rounded-md p-2 mt-1"
                                            value={
                                                formData.dateOfBirth && !isNaN(new Date(formData.dateOfBirth).getTime()) 
                                                    ? new Date(formData.dateOfBirth).toISOString().split('T')[0] 
                                                    : ''
                                            }
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Gender Field */}
                                    <div className="flex items-center space-x-4">
                                        <label className="text-sm font-medium">Gender</label>
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

                                    {/* Phone Number Field */}
                                    <PhoneNumberInput
                                        onChange={(completePhoneNumber) => setFormData((prevData) => ({ ...prevData, number: completePhoneNumber }))}
                                        defaultPhone={formData.number}
                                        defaultCountryCode={formData.countryCode}
                                    />
                                    {/* Email Field */}
                                    <div className="flex flex-col text-gray-600">
                                        <label className="text-sm font-medium">Email</label>
                                        <div className="flex items-center border rounded-md p-2">
                                            <i className="fas fa-envelope text-gray-500 mr-2"></i>
                                            <input 
                                                type="email" 
                                                className="flex-1"
                                                value={data.email} 
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </form>
                            ) : 
                            
                            (
                                // {/* SHOW MODE*/}
                                <ProfileShow data={data}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
