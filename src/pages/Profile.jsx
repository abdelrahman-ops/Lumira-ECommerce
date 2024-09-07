import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../customHook/AuthContext';
import { useData } from '../customHook/DataContext';

import Title from "../components/Title";
import { shop } from "../App";
import { useContext } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { products } = useContext(shop);
    
    const {data} = useData();
    
    
    if (!data) {
        return <p>No user data found. Please log in again.</p>;
    }
    // console.log(data.name);
    
    
    const handleLogout = () => {
        Cookies.remove('token');
        logout();
        navigate('/login');
    };
    
    

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                
                <div className="min-w-60 border border-gray-300">
                    
                    <div className="flex flex-row pl-5 py-3 justify-start gap-7 items-center">
                        <img src={products[1].image} alt="Profile" className="w-24 h-24 rounded-full" />
                        <div className="flex flex-col text-xl items-center gap-0">
                            <p className="text-gray-500">HELLO</p>
                            <p className="text-gray-700 font-medium">{data.name}</p>
                        </div>
                    </div>


                    <div className="border-t border-gray-300 pl-5 py-3 bg-gray-400">
                        <p className="mb-0 text-sm font-medium">My Account</p>
                    </div>
                    <div className="border-t border-gray-300 pl-5 py-3">
                        <p className="mb-0 text-sm font-medium">My Orders</p>
                    </div>
                    <div className="border-t border-gray-300 pl-5 py-3">
                        <p className="mb-0 text-sm font-medium">My Wish List</p>
                    </div>
                    <div className="border-t border-gray-300 pl-5 py-3">
                        <button 
                            onClick={handleLogout} 
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1="PERSONAL" text2="INFORMATION" />
                    </div>

                    {/* Updated Personal Information Fields */}
                    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    {/* Profile Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className='flex items-center gap-4'>
                                <img src={products[1].image} alt="Profile" className="w-32 h-32 rounded-full" />
                                <div>
                                    <p className="text-lg font-semibold">{"Name"}</p>
                                    <p className="text-sm text-gray-500">{data.name}</p>
                                </div>
                            </div>
                            <div className="text-sm px-2">
                                <p className="text-blue-500 hover:underline cursor-pointer">Change Profile Information</p>
                            </div>
                        </div>

                {/* Form Fields */}
                    <form className="space-y-6">
                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Name</label>
                            <input 
                                type="text" 
                                className="border rounded-md p-2 mt-1"
                                value={data.name} 
                                readOnly
                            />
                        </div>

                        {/* Date of Birth Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Date Of Birth</label>
                            <input 
                                type="date" 
                                className="border rounded-md p-2 mt-1"
                                value={"2022-01-20"} 
                                readOnly
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium">Gender</label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="male" checked={'male'} readOnly />
                                <span>male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="female" readOnly  />
                                <span>Female</span>
                            </label>
                        </div>

                        {/* Phone Number Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Phone Number</label>
                            <div className="flex items-center border rounded-md p-2">
                                <img src="https://flagcdn.com/w40/jp.png" alt="Turkey" className="w-6 h-4 mr-2" />
                                <input 
                                    type="text" 
                                    className="flex-1"
                                    value={"+90-123456789"} 
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
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
                </div>
            </div>
            </div>
        </>
    );
};

export default Profile;
