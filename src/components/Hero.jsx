import React from 'react'

const Hero = () => {
    return (
        <div className='hero-container'>
                <div className="content">
                    <div className="flex">
                        <div className='line'></div>
                        <p className='text'>Our Bestsellers</p>
                    </div>
                    <h1>Latest Arrivals</h1>
                    <div className="flex">
                        <p className='text'>Our Bestsellers</p>
                        <div className='line'></div>
                    </div>
                </div>
                <div className="image">
                    <img src="https://forever-ecom.vercel.app/assets/hero_img-DOCOb6wn.png" alt="Latest Arrivals" />
                </div>
        </div>

    );
}

export default Hero