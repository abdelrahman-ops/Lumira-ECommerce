import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../css/Nav.css';

const Navbar = () => {
    const { totalQuantity } = useCart();

    const { isAuthenticated } = useAuth();
    
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login', { state: { showSignUp: false } });
        }
    };

    const handleCartClick = () =>{
        navigate('/cart')
    }


    const [visible, setVisible] = useState(false);
    const handleNavLinkClick = () => {
        setTimeout(() => {
            setVisible(false);
        }, 200);
    };
    
    return (
        <div className="flex items-center justify-between py-5 m-0 font-medium z-10">
            <a href="/">
                <img src={assets.lumiraB} alt="Logo" className="w-36" />
            </a>
            
            <ul className="hidden sm:flex gap-8 text-sm text-blue-950">
                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/">
                    <p className="text-sm transition-colors duration-300 hover:text-blue-600">HOME</p>
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/collection">
                    <p className="text-sm transition-colors duration-300 hover:text-blue-600">Collection</p>
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/about">
                    <p className="text-sm transition-colors duration-300 hover:text-blue-600">ABOUT</p>
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/contact">
                    <p className="text-sm transition-colors duration-300 hover:text-blue-600">CONTACT</p>
                </NavLink>

                <Link className="border px-5 text-xs py-1 rounded-full -mt-2 hover:bg-blue-600 hover:text-white transition duration-300" target="_blank" to="http://localhost:5173/">
                    <p className="mt-1 admin">Admin Panel</p>
                </Link>
            </ul>

            <div className="flex items-center gap-6">
                <NavLink to="/collection" aria-current="page">
                    <img src={assets.search_icon} alt="Search" className="w-5 cursor-pointer hover:scale-110 transition-transform duration-300" />
                </NavLink>
                
                
                <div className="group relative">
                    <img
                        src={assets.profile_icon}
                        alt="Profile"
                        className="w-5 cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={handleLoginClick}
                    />
                </div>

                <div className="relative cursor-pointer" onClick={handleCartClick}>
                    <img src={assets.cart_icon} className="w-5 min-w-5 hover:scale-110 transition-transform duration-300" alt="Cart" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-blue-800 text-white aspect-square rounded-full text-[8px]">
                        <span>{totalQuantity}</span>
                    </p>
                </div>
                
                {/* Hamburger Menu (only visible on small screens) */}
                <img 
                    src={assets.menu_icon} 
                    className="w-5 cursor-pointer sm:hidden" 
                    alt="Menu"
                    onClick={() => setVisible(true)}
                />
            </div>

            {/* Side Menu for Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-10 ${ visible ? "w-full" : "w-0" }`}>
                <div className="drop flex flex-col text-gray-600">
                    <div className="flex items-center gap-4 p-3 cursor-pointer w-full" onClick={() => setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="Back" className="h-4 rotate-180" />
                        <p className="w-full">Back</p>
                    </div>

                    <NavLink to="/" className="py-2 pl-6 border w-full" onClick={handleNavLinkClick}>
                        <h2>HOME</h2>
                    </NavLink>
                    
                    <NavLink to="/collection" className="py-2 pl-6 border w-full" onClick={handleNavLinkClick}>
                        <h2>COLLECTION</h2>
                    </NavLink>
                    
                    <NavLink to="/about" className="py-2 pl-6 border w-full" onClick={handleNavLinkClick}>
                        <h2>ABOUT</h2>
                    </NavLink>
                    
                    <NavLink to="/contact" className="py-2 pl-6 border w-full" onClick={handleNavLinkClick}>
                        <h2>CONTACT</h2>
                    </NavLink>
                    
                    <a href="http://localhost:5173/" className="py-2 pl-6 border w-full">
                        <h2>Admin Panel</h2>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
