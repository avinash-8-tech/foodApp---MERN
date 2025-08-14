import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img id='logo' src={assets.logo} alt="l" />
                    <p>Bringing delicious meals to your doorstep with speed, freshness, and care. From local favorites to global cuisines, we make sure every bite is a moment to savor. Order with us and experience food the way it’s meant to be.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="i" />
                        <img src={assets.twitter_icon} alt="i" />
                        <img src={assets.linkedin_icon} alt="i" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+291094932</li>
                        <li>example@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 @ foodApp.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer