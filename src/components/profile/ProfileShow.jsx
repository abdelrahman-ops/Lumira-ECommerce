const ProfileShow = ({ data }) => {
    return (
        <form className="space-y-6">
            {/* Name Field */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Name</label>
                <input 
                    type="text" 
                    className="border rounded-md p-2 mt-1"
                    value={`${data.firstName} ${data.lastName}`} 
                    readOnly
                />
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Date Of Birth</label>
                <input 
                    type="date" 
                    className="border rounded-md p-2 mt-1"
                    value={
                        data.dateOfBirth && !isNaN(new Date(data.dateOfBirth).getTime()) 
                            ? new Date(data.dateOfBirth).toISOString().split('T')[0] 
                            : ''
                    }
                    readOnly
                />
            </div>

            {/* Gender Field */}
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Gender</label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={data.gender === 'male'}
                        readOnly
                    />
                    <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={data.gender === 'female'}
                        readOnly
                    />
                    <span>Female</span>
                </label>
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="flex items-center border rounded-md p-2">
                    {/* <img src="https://flagcdn.com/w40/jp.png" alt="Country Flag" className="w-6 h-4 mr-2" /> */}
                    <input 
                        type="text" 
                        className="flex-1"
                        value={data.number} 
                        readOnly
                    />
                </div>
                {/* <PhoneNumberDisplay fullPhoneNumber={data.number}/> */}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center border rounded-md p-2">
                    <i className="fas fa-envelope text-gray-500 mr-2"></i>
                    <input 
                        type="email" 
                        className="flex-1"
                        value={data.email} 
                        readOnly
                    />
                </div>
            </div>
        </form>
    );
};

export default ProfileShow;
