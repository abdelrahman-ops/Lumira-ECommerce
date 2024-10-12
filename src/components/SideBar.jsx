import { NavLink, Outlet } from "react-router-dom"
import { assets } from "../assets/admin_assets/assets"



const SideBar = () => {
    
    
    return (
        <div className="flex w-full">
            
            <div className="w-[18%] min-h-screen border-r-2">
                <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                    <NavLink 
                        className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf5] focus:border-[#c586a5]' : ''}  `}
                        aria-current="page" 
                        to="/admin/add">
                        
                        
                        <img src={assets.add_icon} alt="" className="w-5 h-5"/>
                        <p className="hidden md:block">Add Items</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf5]  focus:border-[#c586a5]' : ''} `}
                        aria-current="page" to="/admin/list">
                        
                        <img src={assets.order_icon} alt="" className="w-5 h-5"/>
                        <p className="hidden md:block">List Items</p>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf5] focus:border-[#c586a5]' : ''} `}
                        aria-current="page" to="/admin/orders">
                        
                        
                        <img src={assets.order_icon} alt="" className="w-5 h-5"/>
                        <p className="hidden md:block">Orders</p>
                    </NavLink>
                </div>
            </div>
            
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Outlet />
            </div>
        </div>
    )
}

export default SideBar