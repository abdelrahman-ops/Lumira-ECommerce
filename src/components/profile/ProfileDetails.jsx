import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiUser, FiCalendar, FiPhone, FiMail, FiCamera, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import PhoneNumberInput from '../../hooks/PhoneNumberInput';
import toast from 'react-hot-toast';
import { useData } from '../../context/DataContext';
import { url } from '../constant/URL';
import Title from '../common/Title';

const ProfileDetails = () => {
    const { user, imagePreview, setImagePreview } = useOutletContext();
    const { updateUserData, setUserData } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date).getTime())) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            setErrorMsg('Please select a valid image file (JPEG, PNG)');
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
            setErrorMsg('Image must be less than 2MB');
            return;
        }

        setFormData(prev => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
        setErrorMsg('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);
    
        try {
            const submission = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'image' && value !== null && value !== undefined) {
                    submission.append(key, value);
                }
            });
    
            if (formData.image instanceof File) {
                submission.append('image', formData.image);
            }
    
            const response = await updateUserData(submission);
            if (response.success) {
                toast.success('Profile updated successfully!', {
                    position: 'top-center',
                    style: {
                        background: '#4BB543',
                        color: '#fff',
                    }
                });
                setUserData(prev => ({ ...prev, ...formData }));
                setIsEditing(false);
            } else {
                setErrorMsg(response.error || 'Profile update failed. Please try again.');
                toast.error('Failed to update profile.', {
                    position: 'top-center'
                });
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Unexpected error occurred. Please try again.');
            toast.error('Failed to update profile.', {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };

    const displayImage = imagePreview || (user?.image && `${url}${user.image}`) || '/default-avatar.png';

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Title text1='My' text2='Profile' className="text-3xl"/>
                    <p className="text-gray-500 mt-1">
                        {isEditing ? 'Update your personal information' : 'View your profile details'}
                    </p>
                </div>
                
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => !loading && setIsEditing(false)}
                                disabled={loading}
                                className="flex items-center gap-2 text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                <FiX size={18} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                            <FiEdit2 size={18} />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="relative group w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                        src={displayImage}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                    {isEditing && (
                        <label
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
                            htmlFor="imageInput"
                        >
                            <div className="text-center p-4">
                                <FiCamera className="text-white text-2xl mx-auto mb-2" />
                                <span className="text-white text-sm font-medium">Change Photo</span>
                            </div>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        {formData.firstName || 'First Name'} {formData.lastName || 'Last Name'}
                    </h3>
                    <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
                    {errorMsg && (
                        <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                    )}
                </div>
            </div>

            {/* Form Section */}
            {isEditing ? (
                <form className="space-y-6" onSubmit={handleSave}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['firstName', 'lastName'].map((field) => (
                            <div key={field} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">
                                    {field.replace('Name', ' Name')}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <FiUser size={18} />
                                    </div>
                                    <input
                                        name={field}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder={`Enter ${field.replace('Name', ' name')}`}
                                        value={formData[field] ?? ''}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DOB */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiCalendar size={18} />
                            </div>
                            <input
                                name="dateOfBirth"
                                type="date"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Gender</label>
                        <div className="flex gap-4">
                            {['male', 'female', 'other'].map((gender) => (
                                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={formData.gender === gender}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="capitalize text-gray-700">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiPhone size={18} />
                            </div>
                            <PhoneNumberInput
                                onChange={(num) => setFormData((prev) => ({ ...prev, number: num ?? '' }))}
                                defaultPhone={formData.number ?? ''}
                                defaultCountryCode={formData.countryCode ?? ''}
                                disabled={loading}
                                className="p-32"
                            />
                        </div>
                    </div>

                    {/* Email (Read Only) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiMail size={18} />
                            </div>
                            <input
                                type="email"
                                value={user.email ?? ''}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: 'First Name', icon: <FiUser size={18} />, value: user.firstName || 'Not provided' },
                        { label: 'Last Name', icon: <FiUser size={18} />, value: user.lastName || 'Not provided' },
                        { label: 'Date of Birth', icon: <FiCalendar size={18} />, value: formatDate(user.dateOfBirth) || 'Not provided' },
                        { label: 'Gender', icon: <FiUser size={18} />, value: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified' },
                        { label: 'Phone Number', icon: <FiPhone size={18} />, value: user.number || 'Not provided' },
                        { label: 'Email', icon: <FiMail size={18} />, value: user.email }
                    ].map(({ label, icon, value }) => (
                        <div key={label} className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-gray-500">
                                    {icon}
                                </div>
                                <span className="text-gray-800">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;