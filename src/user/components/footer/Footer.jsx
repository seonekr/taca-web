import React from 'react'
import './footer.css'
import QRCODE from '../../../img/QRCODE.png';
import {Link} from "react-router-dom";
import { BsGooglePlay, BsApple } from "react-icons/bs"

const Footer = () => {
  return (
    <>
        <footer className='box_footer'>
            <section className='box_container_footer'>
                <div className='box_customer'>
                    <h2>Customer Card</h2>
                    <Link to="#" className='box_customer_text'>
                        <p>Help Center</p>
                        <p>How to Buy</p>
                        <p>Shipping & Delivery</p>
                        <p>International Product Policy</p>
                        <p>How to Return</p>
                        <p>Contact Us</p>
                    </Link>
                </div>
                <div className='box_taca'>
                    <h2>TACA</h2>
                    <Link to="#" className='box_customer_text'>
                        <p>All Categories</p>
                        <p>About TACA</p>
                        <p>Careers</p>
                        <p>Privacy Policy</p>
                        <p>Security</p>
                        <p>Popular Product</p>
                        <p>Intellectual Property Protection</p>
                    </Link>
                </div>
                <div className='box_app'>
                    <h2>Download App</h2>
                    <div className='container_QR'>
                        <img src={QRCODE} alt="img" />
                        <Link to="#" className='box_play_app'>
                            <div className='box_playstore_app'>
                                <BsGooglePlay/>
                                <p>Play Store</p>
                            </div>
                            <div className='box_playstore_app'>
                                <BsApple/>
                                <p>App Store</p>
                            </div>
                        </Link>

                    </div>
                </div>
                
            </section>    
            <hr />
            <div className='container_copy'>@ TACA 2023</div>
        </footer>
    </>
  )
}

export default Footer