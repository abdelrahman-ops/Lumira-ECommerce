import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faShoppingCart, faHeart, faCog, faSignOutAlt, 
    faCreditCard, faMapMarkerAlt, faBell, faChevronRight, faChevronLeft 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';


const ProfileSidebar = ({ image, data, activeSection, setActiveSection }) => {
    const navigate = useNavigate();
    const { logout } = useData();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [startX, setStartX] = useState(0);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            Cookies.remove('token');
            logout();
            navigate('/login');
        }
    };

    const menuItems = [
        { name: 'Profile', icon: faUser, section: 'profile' },
        { name: 'Orders', icon: faShoppingCart, section: 'orders' },
        { name: 'Wishlist', icon: faHeart, section: 'wishlist' },
        { name: 'Payments', icon: faCreditCard, section: 'payments' },
        { name: 'Addresses', icon: faMapMarkerAlt, section: 'addresses' },
        { name: 'Notifications', icon: faBell, section: 'notifications' },
        { name: 'Settings', icon: faCog, section: 'settings' },
    ];

    // Swipe functionality for horizontal navigation bar
    const handleTouchStart = (e) => {
        setIsSwiping(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            setIsSwiping(false);
            setActiveSection((prev) => {
                const currentIndex = menuItems.findIndex((item) => item.section === prev);
                const newIndex = diff > 0 
                    ? Math.min(currentIndex + 1, menuItems.length - 1) 
                    : Math.max(currentIndex - 1, 0);
                return menuItems[newIndex].section;
            });
        }
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);
    };

    return (
        <>
            {/* Sidebar for Larger Screens */}
            <motion.div 
                initial={{ width: isCollapsed ? 80 : 260 }}
                animate={{ width: isCollapsed ? 80 : 260 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex bg-gradient-to-b from-indigo-50 to-pink-50 shadow-2xl rounded-lg p-4 flex-col h-screen relative"
            >
                {/* Collapse Button */}
                <button 
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="absolute top-1 right-4 text-gray-600 hover:text-gray-800 transition-all duration-300" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
                </button>

                {/* Profile Header */}
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-row items-center gap-4 mb-6"
                    >
                        <img 
                            src={image || '/path/to/default-profile-image.png'} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full object-cover shadow-md" 
                        />
                        <div>
                            <p className="text-gray-500 text-sm">HELLO</p>
                            <p className="text-gray-700 font-medium text-xl">{data.firstName}</p>
                        </div>
                    </motion.div>
                )}

                {/* Sidebar Menu */}
                <div className="mt-4 flex-1">
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.section}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.05 * menuItems.indexOf(item) }}
                            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-300 ${
                                activeSection === item.section 
                                    ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg' 
                                    : 'hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                            onClick={() => setActiveSection(item.section)}
                        >
                            <FontAwesomeIcon 
                                icon={item.icon} 
                                className={`w-5 h-5 ${
                                    activeSection === item.section ? 'text-white' : 'text-indigo-500'
                                }`} 
                            />
                            {!isCollapsed && (
                                <p className="text-sm font-medium">{item.name}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-auto p-3 hover:bg-red-50 cursor-pointer rounded-lg flex items-center gap-3"
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 w-5 h-5" />
                    {!isCollapsed && (
                        <p className="text-sm font-medium text-red-600 hover:text-red-800">Logout</p>
                    )}
                </motion.div>
            </motion.div>

            {/* Horizontal Navigation Bar for Small Screens */}
            <div 
                className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-indigo-50 to-pink-50 shadow-2xl rounded-t-lg p-2 z-50"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex justify-between items-center overflow-x-auto scrollbar-hide">
                    {/* Menu Items */}
                    <div className="flex flex-1 justify-around">
                        {menuItems.map((item) => (
                            <div
                                key={item.section}
                                className={`flex flex-col items-center p-2 cursor-pointer rounded-lg transition-all duration-300 ${
                                    activeSection === item.section 
                                        ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg' 
                                        : 'hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                                onClick={() => setActiveSection(item.section)}
                            >
                                <FontAwesomeIcon 
                                    icon={item.icon} 
                                    className={`w-5 h-5 ${
                                        activeSection === item.section ? 'text-white' : 'text-indigo-500'
                                    }`} 
                                />
                                <p className="text-xs font-medium mt-1">{item.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Logout Button */}
                    <div
                        className="p-2 hover:bg-red-50 cursor-pointer rounded-lg flex items-center gap-2"
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 w-5 h-5" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;