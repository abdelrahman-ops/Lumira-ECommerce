import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useNavigate, NavLink, useLocation, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
    FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut,
    FiCreditCard, FiMapPin, FiBell, FiChevronRight, FiChevronLeft,FiChevronDown
} from 'react-icons/fi';

const ProfileSidebar = ({ image, data }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { logout } = useData();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            Cookies.remove('token');
            logout();
            navigate('/login');
        }
    };

    const menuItems = [
        { name: 'Profile', icon: <FiUser size={18} />, section: '', path: '' },
        { name: 'Orders', icon: <FiShoppingBag size={18} />, section: 'orders', path: 'orders' },
        { name: 'Wishlist', icon: <FiHeart size={18} />, section: 'wishlist', path: 'wishlist' },
        { name: 'Payments', icon: <FiCreditCard size={18} />, section: 'payment', path: 'payment' },
        { name: 'Addresses', icon: <FiMapPin size={18} />, section: 'address', path: 'address' },
        { name: 'Notifications', icon: <FiBell size={18} />, section: 'notifications', path: 'notifications' },
        { name: 'Settings', icon: <FiSettings size={18} />, section: 'settings', path: 'settings' },
    ];

    const getActiveSection = () => {
        const pathParts = location.pathname.split('/');
        return pathParts[pathParts.length - 1] || '';
    };

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
            const currentSection = getActiveSection();
            const currentIndex = menuItems.findIndex((item) => item.section === currentSection);
            const newIndex = diff > 0 
                ? Math.min(currentIndex + 1, menuItems.length - 1) 
                : Math.max(currentIndex - 1, 0);
            navigate(`/profile/${id}/${menuItems[newIndex].path}`);
        }
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <motion.div 
                    initial={{ width: isCollapsed ? 80 : 280 }}
                    animate={{ width: isCollapsed ? 80 : 280 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="hidden md:flex bg-gradient-to-b from-white to-gray-50 border rounded-3xl border-gray-200 flex-col h-full relative"
                >
                    {/* Collapse Button */}
                    <button 
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="absolute -right-3 top-6 bg-white p-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-300 z-10" 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? (
                            <FiChevronRight className="text-gray-600" />
                        ) : (
                            <FiChevronLeft className="text-gray-600" />
                        )}
                    </button>

                    {/* Profile Header */}
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 p-6 pb-4 border-b border-gray-200"
                            >
                                <div className="relative">
                                    <img 
                                        src={image || '/default-profile.png'} 
                                        alt="Profile" 
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Welcome back</p>
                                    <p className="text-gray-800 font-medium">
                                        {data.firstName} {data.lastName}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto py-4 px-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.section}
                                to={`/profile/${id}/${item.path}`}
                                end={item.path === ''}
                            >
                                {({ isActive }) => (
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-lg transition-all ${
                                            isActive 
                                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                                : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {item.icon}
                                        </div>
                                        {!isCollapsed && (
                                            <span className="text-sm font-medium">{item.name}</span>
                                        )}
                                    </motion.div>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-4">
                        <motion.button
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-gray-600 hover:text-red-500 w-full p-3 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <FiLogOut className="text-red-400" />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">Sign Out</span>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div 
                    className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex justify-around items-center p-2">
                        {menuItems.slice(0, 4).map((item) => (
                            <NavLink
                                key={item.section}
                                to={`/profile/${id}/${item.path}`}
                                end={item.path === ''}
                                className={({ isActive }) => 
                                    `flex flex-col items-center p-2 rounded-lg transition-all ${
                                        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
                                    }`
                                }
                            >
                                <div className={`p-2 rounded-full ${
                                    getActiveSection() === item.section ? 'bg-blue-100' : ''
                                }`}>
                                    {item.icon}
                                </div>
                                <span className="text-xs mt-1">{item.name}</span>
                            </NavLink>
                        ))}
                        <div className="relative group">
                            <button className="flex flex-col items-center p-2 text-gray-500">
                                <div className="p-2 rounded-full">
                                    <FiChevronDown />
                                </div>
                                <span className="text-xs mt-1">More</span>
                            </button>
                            <div className="absolute bottom-full -right-3  w-48 bg-white rounded-lg shadow-xl border border-gray-200 hidden group-hover:block">
                                {menuItems.slice(4).map((item) => (
                                    <NavLink
                                        key={item.section}
                                        to={`/profile/${id}/${item.path}`}
                                        className={({ isActive }) => 
                                            `flex items-center gap-2 p-3 hover:bg-gray-50 ${
                                                isActive ? 'text-blue-600' : 'text-gray-600'
                                            }`
                                        }
                                    >
                                        {item.icon}
                                        <span className="text-sm">{item.name}</span>
                                    </NavLink>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 w-full text-left border-t border-gray-200"
                                >
                                    <FiLogOut />
                                    <span className="text-sm">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileSidebar;