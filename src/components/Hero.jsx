import React from 'react';

const Hero = () => {
    return (
        <div className='hero-container row'>
            <div className="content col-lg-6 col-md-6 col-sm-12">
                
                <div className="flex">
                    <div className='line'></div>
                    <p className='text'>Our Bestsellers</p>
                </div>
                <h1 className='headline'>Latest Arrivals</h1>
                <div className="flex">
                    <p className='text'>Our Bestsellers</p>
                    <div className='line'></div>
                </div>

            </div>
            
            <div className="image-container col-lg-6 col-md-6 col-sm-12">
                <img 
                    src="https://forever-ecom.vercel.app/assets/hero_img-DOCOb6wn.png" 
                    alt="Latest Arrivals" 
                    className="hero-image"
                />
            </div>
        </div>
    );
}

export default Hero;
