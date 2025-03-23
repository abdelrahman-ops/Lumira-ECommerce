/* eslint-disable react/no-unescaped-entities */
import { assets } from '../assets/assets';
import Settler from '../components/Sletter';
import Title from './../components/Title';

const About = () => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-12">
                    <Title text1={"ABOUT"} text2={"US"} />
                </div>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <img
                        src={assets.about3}
                        alt="About Us"
                        className="w-full md:max-w-[450px] rounded-lg shadow-lg"
                    />

                    <div className="flex flex-col gap-6 md:w-1/2">
                        <p className="text-gray-600 leading-relaxed">
                            Lumira was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                        </p>
                        <b className="text-gray-800 text-lg">Our Mission</b>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission at Lumira is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="text-center mt-16 mb-12">
                    <Title text1={"WHY"} text2={"CHOOSE US"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <b className="text-gray-800 text-lg">Quality Assurance</b>
                        <p className="text-gray-600 mt-2">
                            We meticulously select and vet each product to ensure it meets our stringent quality standards.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <b className="text-gray-800 text-lg">Convenience</b>
                        <p className="text-gray-600 mt-2">
                            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <b className="text-gray-800 text-lg">Exceptional Customer Service</b>
                        <p className="text-gray-600 mt-2">
                            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
                        </p>
                    </div>
                </div>
            </div>

            {/* Settler Component */}
            <Settler />
        </div>
    );
};

export default About;