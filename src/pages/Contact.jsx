/* eslint-disable react/no-unescaped-entities */
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from "react-icons/fi";
import { assets } from '../assets/assets';
import Title from './../components/common/Title';
import Settler from '../components/home/Sletter';

const Contact = () => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-10">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 filter blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-indigo-200 filter blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-10">
                        <Title text1={"CONTACT"} text2={"US"} />
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            Connect with our luxury concierge team for personalized assistance
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Contact Image */}
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <img
                            src={assets.contact2}
                            alt="Lumière Boutique"
                            className="relative z-10 w-full rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl font-light text-gray-800">
                            Visit Our <span className="font-serif italic">Atelier</span>
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <FiMapPin className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Flagship Boutique</h4>
                                    <p className="text-gray-600 mt-1">
                                        54709 Willms Station<br />
                                        Suite 350, Washington, USA
                                    </p>
                                </div>
                            </div>
                            
                            {/* Contact Methods */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <FiPhone className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800">Concierge</h4>
                                        <p className="text-gray-600 mt-1">
                                            +1 (555) 123-4567<br />
                                            <span className="text-sm text-gray-400">Available 24/7</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <FiMail className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800">Email</h4>
                                        <p className="text-gray-600 mt-1">
                                            concierge@lumiere.com<br />
                                            <span className="text-sm text-gray-400">Response within 24 hours</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Hours */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <FiClock className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Atelier Hours</h4>
                                    <p className="text-gray-600 mt-1">
                                        Monday - Friday: 10am - 7pm<br />
                                        Saturday: 11am - 6pm<br />
                                        Sunday: By appointment only
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Career Section */}
                        <div className="pt-8 border-t border-gray-200 mt-8">
                            <h3 className="text-2xl font-light text-gray-800 mb-4">
                                <span className="font-serif italic">Join</span> Our Team
                            </h3>
                            <p className="text-gray-600 mb-6">
                                We're always looking for passionate individuals to join our team of artisans and style consultants.
                            </p>
                            <button className="group relative inline-flex items-center justify-center px-8 py-3 
                                text-blue-600 text-base uppercase tracking-wider 
                                overflow-hidden transition-all duration-500 border-2 border-blue-600
                                rounded-full hover:text-white hover:bg-blue-600
                                hover:shadow-lg transform">
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Careers
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-light text-gray-800 mb-2 text-center">
                            <span className="font-serif italic">Personalized</span> Assistance
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Our style consultants are ready to provide bespoke recommendations
                        </p>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    placeholder="How can we help?"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                    id="message" 
                                    rows="4" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Newsletter Component */}
            <Settler />
        </div>
    );
};

export default Contact;