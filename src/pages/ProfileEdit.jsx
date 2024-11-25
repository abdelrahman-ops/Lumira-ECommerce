// import React from 'react'

const ProfileEdit = ({formData , setFormData , displayImage , handleImageChange}) => {
    
    
    return (
        <div className="flex items-center flex-wrap justify-between mb-6 relative">
            <div 
                className='relative w-32 h-32 rounded-full group cursor-pointer' 
                onClick={() => document.getElementById('imageInput').click()}
            >
                <img
                    src={displayImage}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                />
                <span
                    className="material-symbols-outlined rounded-full p-2 absolute top-1/2 left-1/2 bg-green-500 text-white
                                transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                >
                    reset_image
                </span>

                <input
                    type="file"
                    id="imageInput"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />

            </div>
        </div>
    )
}

export default ProfileEdit