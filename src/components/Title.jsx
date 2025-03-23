const Title = ({ text1, text2 }) => {
    return (
        <div className="inline-flex gap-2 items-center mb-6 group cursor-pointer">
            {/* Text Part */}
            <p className="text-gray-500 text-lg sm:text-2xl font-light">
                {text1}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">
                    {text2}
                </span>
            </p>

            {/* Gradient Line */}
            <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-16 sm:group-hover:w-24"></div>
        </div>
    );
};

export default Title;