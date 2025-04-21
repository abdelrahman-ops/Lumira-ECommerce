import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faPhone, faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';
import PhoneNumberInput from '../../hooks/PhoneNumberInput';
import toast from 'react-hot-toast';

const ProfileDetails = ({
    user,
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    handleChange,
    handleImageChange,
    displayImage,
    handleSave
}) => {
    const [loading, setLoading] = useState(false);

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date).getTime())) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleSave(e);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => !loading && setIsEditing(false)}
                                disabled={loading}
                                className="text-gray-700 border border-gray-400 px-5 py-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onSave}
                                disabled={loading}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-blue-600 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center mb-8 space-x-6">
                <div className="relative group w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                        src={displayImage || '/default-avatar.png'}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                    {isEditing && (
                        <div
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
                            onClick={() => document.getElementById('imageInput')?.click()}
                        >
                            <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {formData.firstName || 'First Name'} {formData.lastName || 'Last Name'}
                    </h3>
                    <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
                </div>
            </div>

            {/* Form Section */}
            {isEditing ? (
                <form className="space-y-6" onSubmit={onSave}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['firstName', 'lastName'].map((field) => (
                            <div key={field} className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1 capitalize">
                                    {field.replace('Name', ' Name')}
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                                    <input
                                        name={field}
                                        type="text"
                                        className="flex-1 bg-transparent outline-none"
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
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                            <FontAwesomeIcon icon={faCalendar} className="text-gray-400 mr-2" />
                            <input
                                name="dateOfBirth"
                                type="date"
                                className="flex-1 bg-transparent outline-none"
                                value={formatDate(formData.dateOfBirth) ?? ''}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Gender</label>
                        <div className="flex items-center gap-6">
                            {['male', 'female'].map((gender) => (
                                <label key={gender} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={formData.gender === gender}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <span className="capitalize">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                            <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2" />
                            <PhoneNumberInput
                                onChange={(num) => setFormData((prev) => ({ ...prev, number: num ?? '' }))}
                                defaultPhone={formData.number ?? ''}
                                defaultCountryCode={formData.countryCode ?? ''}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Email (Read Only) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                value={user.email ?? ''}
                                className="flex-1 bg-transparent outline-none"
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    {[{ label: 'Name', icon: faUser, value: `${user.firstName ?? ''} ${user.lastName ?? ''}` },
                    { label: 'Date of Birth', icon: faCalendar, value: formatDate(user.dateOfBirth) },
                    { label: 'Phone Number', icon: faPhone, value: user.number ?? 'Not provided' },
                    { label: 'Email', icon: faEnvelope, value: user.email }
                    ].map(({ label, icon, value }) => (
                        <div key={label} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                                <FontAwesomeIcon icon={icon} className="text-gray-400 mr-2" />
                                <span className="text-gray-800">{value}</span>
                            </div>
                        </div>
                    ))}

                    {/* Gender Display */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Gender</label>
                        <div className="flex items-center gap-6">
                            {['male', 'female'].map((gender) => (
                                <label key={gender} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={user.gender === gender}
                                        readOnly
                                        disabled
                                    />
                                    <span className="capitalize">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
