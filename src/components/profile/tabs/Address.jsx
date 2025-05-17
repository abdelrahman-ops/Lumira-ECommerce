import { GrMapLocation } from "react-icons/gr";

const Address = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12
        space-y-6 p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 border-2">
            <div className="text-gray-300 text-5xl mb-4">
                            <GrMapLocation className="w-8 h-8"/>
                        </div>
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            <p className="text-gray-500">No addresses saved.</p>
        </div>
    )
}

export default Address