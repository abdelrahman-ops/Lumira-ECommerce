import { MdPayments } from "react-icons/md";

const Payment = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12
        space-y-6 p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 border-2">
            <div className="text-gray-300 text-5xl mb-4">
                <MdPayments className="w-8 h-8"/>
            </div>
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <p className="text-gray-500">No payment methods saved.</p>
        </div>
    )
}

export default Payment