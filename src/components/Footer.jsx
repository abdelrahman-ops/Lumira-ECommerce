// import React from 'react'
import '../css/footer.css'
const Footer = () => {
    return (
    <div>
        <div className="footer">
            <div className="f1">
                <div className="logo">
                    <a className="navbar-brand" href="/"><img src="data:image/png;base64,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" alt="" /></a>
                    <p className="des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className="company">
                    <h3>Company</h3>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Delivery</p>
                    <p>Privacy policy</p>
                </div>
                <div className="contact">
                    <h3>Get in touch</h3>
                    <p>+1-000-000-0000</p>
                    <p>greatstackdev@gmail.com</p>
                    <p>Instagram</p>
                </div>
            </div>
            <div className="f2">
                <p>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
            </div>
        </div>
    </div>
    )
}

export default Footer
