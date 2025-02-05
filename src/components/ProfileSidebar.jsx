// import React from 'react'

import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProfileSidebar = ({image , data}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const { logout } = useAuth();
    const handleLogout = () => {
        Cookies.remove('token');
        logout();
        navigate('/login');
    };
    
    return (
        <div className={`min-w-60 border shadow-md rounded-lg p-6`}>
            <div className="flex flex-row pl-5 py-3 items-center relative">
                <div className="flex flex-row gap-4 items-center">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-24 h-24 rounded-full"
                    />
                    <div className="flex flex-col text-xl items-start">
                        <p className="text-gray-500">HELLO</p>
                        <p className="text-gray-700 font-medium pr-3">{data.firstName}</p>
                    </div>
                </div>
                <img
                    src={assets.dropdown_icon}
                    alt=""
                    className={`h-3 sm:hidden absolute bottom-0 right-0 mx-3 my-3 ${show ? "rotate-90" : ""}`}
                    onClick={() => setShow(!show)}
                />
            </div>
            <div className={`${show ? "" : "hidden"}`}>
                <div className="border-t border-gray-300 pl-5 py-3 bg-gray-400 cursor-pointer">
                    <p className="mb-0 text-sm font-medium">My Account</p>
                </div>
                <div className="border-t border-gray-300 pl-5 py-3 hover:bg-gray-300 cursor-pointer">
                    <p className="mb-0 text-sm font-medium">My Orders</p>
                </div>
                <div className="border-t border-gray-300 pl-5 py-3 hover:bg-gray-300 cursor-pointer">
                    <p className="mb-0 text-sm font-medium">My Wish List</p>
                </div>
                <div className="border-t border-gray-300 pl-5 py-3 cursor-pointer">
                    <button 
                        onClick={handleLogout} 
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebar