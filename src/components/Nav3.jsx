import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from '../customHook/AuthContext';
import Cookies from "js-cookie";
import { useCart } from '../customHook/CartContext';

const Nav3 = () => {
    const { totalQuantity } = useCart();

    // const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        const token = Cookies.get('token');

        if (token) {
            navigate('/profile');
        } else {
            navigate('/login', { state: { showSignUp: false } });
        }
    };

    const handleCartClick = () =>{
        const token = Cookies.get('token');
        if (token) {
            navigate('/cart');
        } else {
            navigate('/error');
        }
    }


    const [visible, setVisible] = useState(false);
    const handleNavLinkClick = () => {
        setTimeout(() => {
            setVisible(false);
        }, 200);
    };
    
    
    return (
        <div className="flex items-center justify-between py-5 m-0 font-medium">
            <a href="/">
                <img src={assets.logo} alt="" className="w-36" />
            </a>
            
            <ul className="hidden sm:flex gap-5  text-sm text-gray-700">
                <NavLink  className="flex flex-col items-center gap-1 m-0 " aria-current="page" to="/">
                    <p className="text-sm">HOME</p>
                    {/* <div className="w-2/4 border-none h-[1.5px] bg-gray-700 "></div> */}
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/collection">
                    <p className="text-sm">Collection</p>
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/about">
                    <p className="text-sm">about</p>
                </NavLink>

                <NavLink className="flex flex-col items-center gap-1 m-0" aria-current="page" to="/contact">
                    <p className="text-sm">contact</p>
                </NavLink>
                
                <a href="https://ecom-admin" target="_blank" className="border px-5 text-xs py-1 rounded-full -mt-2">
                    <p className="mt-1 admin">Admin Panel</p>
                </a>

            </ul>
            <div className="flex items-center gap-6">
                <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
                
                <div className="group relative">
                    <img
                        src={assets.profile_icon}
                        alt=""
                        className="w-5 cursor-pointer"
                        onClick={handleLoginClick}
                    />
                </div>

                <div className="relative cursor-pointer" onClick={handleCartClick}>
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        <span>{totalQuantity}</span>
                    </p>
                </div>
                
                {/* Drop Down icon */}
                <img 
                    src={assets.menu_icon} 
                    className="w-5 cursor-pointer sm:hidden" 
                    alt=""
                    onClick={() => setVisible(true)}
                />
            </div>
            {/* side bar for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-10 ${ visible ? "w-full" : "w-0" }`}>
                <div className="drop flex flex-col text-gray-600">
                    <div className="flex items-center gap-4 p-3 cursor-pointer w-full" onClick={() => setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
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
                    
                    <a href="https://ecom-admin" className="py-2 pl-6 border w-full">
                        <h2>Admin Panel</h2>
                    </a>
            

                </div>
            </div>
        </div>
    );
};

export default Nav3;