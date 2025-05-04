// import React from 'react'

import { Link } from "react-router-dom"
import Title from './../components/common/Title';


const Error = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center text-center py-8 text-3xl g">
                <Title text1="Not " text2="Authorized" />
                <p className="text-2xl sm:text-sm md:text-base text-gray-600">
                    You need To Login First
                    <span className="block text-red-400 text-2xl hover:scale-110 hover:underline pt-10">
                        <Link to="/login">
                            Login  here
                        </Link>
                    </span>
                        
                </p>
            </div>
            
        </>
    )
}

export default Error
