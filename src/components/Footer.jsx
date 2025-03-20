import '../css/footer.css';
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className=" text-blue-900 py-10  ">
            <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
                {/* About Section */}
                <div>
                    <img src={assets.lumiraB} className="mb-5 w-40" alt="Brand Logo" />
                    <p className="text-sm md:text-base leading-relaxed">
                        Lumira is your one-stop shop for modern fashion and accessories. 
                        Redefining style since 2000s with a touch of class and innovation.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <p className="text-xl font-semibold text-blue-950 mb-5">Company</p>
                    <ul className="flex flex-col gap-2 text-sm md:text-base">
                        <li className="hover:text-indigo-400 cursor-pointer">Home</li>
                        <li className="hover:text-indigo-400 cursor-pointer">About Us</li>
                        <li className="hover:text-indigo-400 cursor-pointer">Delivery</li>
                        <li className="hover:text-indigo-400 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <p className="text-xl font-semibold text-blue-950 mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-2 text-sm md:text-base">
                        <li className="hover:text-indigo-400">+20-010100000</li>
                        <li className="hover:text-indigo-400">abdelrahmanataa17@gmail.com</li>
                        <li className="hover:text-indigo-400 cursor-pointer">Instagram</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
                <p>© 2024 Abdelrahman Ops - All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
