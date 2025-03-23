import { assets } from '../assets/assets';
import Title from './../components/Title';
import Settler from '../components/Sletter';

const Collection = () => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-12">
                    <Title text1={"CONTACT"} text2={"US"} />
                </div>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <img
                        src={assets.contact2}
                        alt="Contact Us"
                        className="w-full md:max-w-[480px] rounded-lg shadow-lg"
                    />

                    <div className="flex flex-col gap-6">
                        <p className="font-semibold text-xl text-gray-600">
                            Our Store
                        </p>
                        <p className="text-gray-500">
                            54709 Willms Station <br /> Suite 350, Washington, USA
                        </p>
                        <p className="text-gray-500">
                            Tel: (+20) 010100000 <br /> Email: abdelrahmanataa17@gmail.com
                        </p>
                        <p className="font-semibold text-xl text-gray-600">
                            Careers at Forever
                        </p>
                        <p className="text-gray-500">
                            Learn more about our teams and job openings.
                        </p>
                        <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-full">
                            Explore Jobs
                        </button>
                    </div>
                </div>
            </div>

            {/* Settler Component */}
            <Settler />
        </div>
    );
};

export default Collection;