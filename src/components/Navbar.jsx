import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../css/Nav.css';
import { useData } from '../context/DataContext';
import { 
    FaSearch, 
    FaUserCircle,
    FaStore,
    FaInfoCircle,
    FaEnvelope,
    FaLaptopCode
} from "react-icons/fa";
import { PiUserCircleDashedThin ,PiUserCircleDuotone } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { motion } from "framer-motion";

const Navbar = () => {
    const { totalQuantity } = useCart();
    const { isAuthenticated } = useAuth();
    const { user } = useData();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const handleLoginClick = () => {
        if (isAuthenticated) {
            navigate(`/profile/${user._id}`);
        } else {
            navigate('/login', { state: { showSignUp: false } });
        }
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleNavLinkClick = () => {
        setVisible(false);
    };

    // Animation variants
    const menuVariants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    return (
        <div className="relative py-5 m-0 font-medium z-10 bg-white">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/">
                    <motion.img 
                        src={assets.lumiraB} 
                        alt="Logo" 
                        className="w-36"
                        whileHover={{ scale: 1.05 }}
                    />
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden sm:flex items-center gap-8">
                    <ul className="flex items-center gap-8 text-sm text-blue-950">
                        <li>
                            <NavLink 
                                className="nav-link hover:text-[#2563eb]"
                                to="/"
                            >
                                HOME
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                className="nav-link hover:text-[#2563eb]"
                                to="/collection"
                            >
                                COLLECTION
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                className="nav-link hover:text-[#2563eb]"
                                to="/about"
                            >
                                ABOUT
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                className="nav-link hover:text-[#2563eb]"
                                to="/contact"
                            >
                                CONTACT
                            </NavLink>
                        </li>
                    </ul>

                    <Link 
                        className="admin-link flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs hover:bg-blue-600 hover:text-white transition duration-300"
                        target="_blank" 
                        to="http://localhost:5173/"
                    >
                        <RiAdminFill />
                        <span>ADMIN</span>
                    </Link>
                </nav>

                {/* Icons Section */}
                <div className="flex items-center gap-6">
                    {/* Search Icon */}
                    <NavLink to="/collection" aria-current="page">
                        <motion.div 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-950"
                        >
                            <FaSearch className="w-5 h-5" />
                        </motion.div>
                    </NavLink>
                    
                    {/* Profile Icon - Changes based on auth state */}
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLoginClick}
                        className="cursor-pointer text-blue-950"
                    >
                        {isAuthenticated ? (
                            <PiUserCircleDuotone  className="w-8 h-8 text-blue-600" />
                        ) : (
                            <PiUserCircleDashedThin  className="w-8 h-8" />
                        )}
                    </motion.div>

                    {/* Cart Icon with badge */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCartClick}
                        className="relative cursor-pointer text-blue-950"
                    >
                        <FaCartShopping className="w-6 h-6" />
                        {totalQuantity > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full"
                            >
                                {totalQuantity}
                            </motion.span>
                        )}
                    </motion.div>
                    
                    {/* Mobile Menu Button */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="sm:hidden cursor-pointer text-blue-950"
                        onClick={() => setVisible(true)}
                    >
                        <GiHamburgerMenu className="w-6 h-6" />
                    </motion.div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={{ 
                        opacity: visible ? 1 : 0,
                        pointerEvents: visible ? "auto" : "none"
                    }}
                    onClick={() => setVisible(false)}
                />

                <motion.aside
                    className="fixed top-0 right-0 h-full w-64 bg-white z-30 shadow-xl sm:hidden"
                    initial="closed"
                    animate={visible ? "open" : "closed"}
                    variants={menuVariants}
                >
                    <div className="h-full flex flex-col">
                        <div className="p-4 flex justify-between items-center border-b">
                            <img src={assets.lumiraB} alt="Logo" className="w-28" />
                            <button 
                                onClick={() => setVisible(false)}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-4">
                            <ul className="space-y-2">
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => 
                                            `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`
                                        }
                                        onClick={handleNavLinkClick}
                                    >
                                        <FaStore className="text-lg" />
                                        <span>HOME</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/collection" 
                                        className={({ isActive }) => 
                                            `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`
                                        }
                                        onClick={handleNavLinkClick}
                                    >
                                        <FaCartShopping className="text-lg" />
                                        <span>COLLECTION</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/about" 
                                        className={({ isActive }) => 
                                            `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`
                                        }
                                        onClick={handleNavLinkClick}
                                    >
                                        <FaInfoCircle className="text-lg" />
                                        <span>ABOUT</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/contact" 
                                        className={({ isActive }) => 
                                            `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`
                                        }
                                        onClick={handleNavLinkClick}
                                    >
                                        <FaEnvelope className="text-lg" />
                                        <span>CONTACT</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <a 
                                        href="http://localhost:5173/" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50"
                                    >
                                        <FaLaptopCode className="text-lg" />
                                        <span>ADMIN PANEL</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {isAuthenticated && (
                            <div className="p-4 border-t">
                                <button 
                                    onClick={() => {
                                        handleNavLinkClick();
                                        navigate(`/profile/${user._id}`);
                                    }}
                                    className="flex items-center gap-3 w-full px-6 py-2 text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    <FaUserCircle className="text-blue-600 text-lg" />
                                    <span>MY PROFILE</span>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.aside>
            </div>
        </div>
    );
};

export default Navbar;