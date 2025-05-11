import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone } from "react-icons/fi";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className=" pt-20 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="border-t border-gray-200 my-8"></div>
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <img 
                            src={assets.lumiraB} 
                            className="w-40 h-auto" 
                            alt="Lumière Logo"
                            loading="lazy"
                        />
                        <p className="text-gray-600 leading-relaxed">
                            Lumira redefines luxury fashion with timeless elegance and contemporary design. 
                            Established in 2015, we craft exceptional experiences through meticulous attention to detail.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors duration-300">
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                                <FiYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Navigation</h3>
                        <ul className="space-y-3">
                            {['New Arrivals', 'Collections', 'Lookbook', 'About Us', 'Sustainability'].map((item) => (
                                <li key={item}>
                                    <a 
                                        href="#" 
                                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Client Services</h3>
                        <ul className="space-y-3">
                            {['Contact Us', 'Shipping Policy', 'Returns & Exchanges', 'FAQ', 'Care Guide'].map((item) => (
                                <li key={item}>
                                    <a 
                                        href="#" 
                                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FiPhone className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-xs text-gray-400">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FiMail className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-600">abdelrahmanataa17@gmail.com</p>
                                    <p className="text-xs text-gray-400">Response within 24 hours</p>
                                </div>
                            </li>
                            <li className="pt-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Atelier Showroom</h4>
                                <p className="text-gray-600 text-sm">
                                    By appointment only
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Lumière. All rights reserved.
                    </p>
                    
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;