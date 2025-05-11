import { FiCheckCircle, FiShoppingBag, FiHeadphones, FiAward, FiTruck, FiShield } from "react-icons/fi";
import { assets } from '../assets/assets';
import Settler from '../components/home/Sletter';
import Title from './../components/common/Title';

const About = () => {
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
                        <Title text1={"OUR"} text2={"STORY"} />
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            Discover the journey behind Lumière and our passion for redefining luxury fashion
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Image with elegant frame */}
                    <div className="relative lg:w-1/2 group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <img
                            src={assets.about3}
                            alt="About Us"
                            className="relative z-10 w-full rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute -bottom-6 -right-6 z-0 w-24 h-24 bg-blue-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-light text-gray-800 mb-6">
                            <span className="font-serif italic text-blue-900">Lumira</span> - Where Elegance Meets Innovation
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                Founded in 2015, Lumière emerged from a vision to create a luxury fashion experience that transcends traditional boundaries. Our founder, Isabelle Laurent, envisioned a brand that would blend Parisian elegance with contemporary design.
                            </p>
                            <p>
                                Each Lumière collection is meticulously crafted by our team of master artisans in our ateliers in Milan and Paris. We source only the finest materials, from Italian cashmere to French lace, ensuring every piece meets our exacting standards.
                            </p>
                            
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center">
                                    <FiAward className="text-blue-500 mr-2" />
                                    Our Mission
                                </h3>
                                <p>
                                    To redefine luxury fashion through sustainable innovation, exceptional craftsmanship, and timeless designs that empower our clients to express their individuality with confidence and grace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Title text1={"OUR"} text2={"VALUES"} />
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            The principles that guide every decision we make
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                            <div className="w-16 h-16 mb-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                                <FiCheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-3">Quality Assurance</h3>
                            <p className="text-gray-600">
                                Every garment undergoes 27 quality checks before reaching you. We accept only perfection.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                            <div className="w-16 h-16 mb-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors duration-300">
                                <FiShoppingBag className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-3">Effortless Experience</h3>
                            <p className="text-gray-600">
                                From virtual styling consultations to white-glove delivery, we make luxury effortless.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                            <div className="w-16 h-16 mb-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-300">
                                <FiHeadphones className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-3">Concierge Service</h3>
                            <p className="text-gray-600">
                                Your personal style advisor available 24/7 to ensure complete satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Commitment Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl font-light text-gray-800">
                            Our <span className="font-serif italic">Commitment</span> to Excellence
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <FiShield className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Sustainable Luxury</h4>
                                    <p className="text-gray-600 mt-1">
                                        We partner with ethical suppliers and use eco-friendly materials without compromising on quality.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <FiTruck className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Global Excellence</h4>
                                    <p className="text-gray-600 mt-1">
                                        Free worldwide shipping with carbon-neutral delivery options and hassle-free returns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="text-4xl font-light text-blue-600 mb-2">27+</div>
                            <div className="text-gray-600">Quality Checks Per Item</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="text-4xl font-light text-blue-600 mb-2">150+</div>
                            <div className="text-gray-600">Master Artisans</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="text-4xl font-light text-blue-600 mb-2">98%</div>
                            <div className="text-gray-600">Client Satisfaction</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="text-4xl font-light text-blue-600 mb-2">40+</div>
                            <div className="text-gray-600">Countries Served</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Component */}
            <Settler />
        </div>
    );
};

export default About;