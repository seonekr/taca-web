import "./account.css"
import { FaArrowLeft } from "react-icons/fa6";
import React, { useState } from 'react';
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const Password = () => {

    const[password, setPassword] = useState('');
    const[oldPassword, setOldPassword] = useState('');

    const oldPass = "1234"; // old password to check

    // This is submit function
    const handleSubmit = (e) => {
        e.preventDefault();

        setPassword('')
        setOldPassword('')

        if(oldPassword != oldPass ){
            console.log('Old password incorrect please try again')
        }else{
            console.log('Form Data:', { // Here you can update password to database 
            oldPassword: "Success",
        });
        }

    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleOldPassword = (e) => {
        const value = e.target.value;
        setOldPassword(value);
    };

    return(
        <>
            <section id="header-account">
                <div className="account-navbar">
                    <div className="header-box"><Link to="/account"><FaArrowLeft/></Link></div>
                    <div className="header-box middle">Password</div>
                    <div className="header-box"></div>
                </div>
            </section>
            <section id="account">
                <form onSubmit={handleSubmit} className="personal-info">
                    <div className="contact-info">
                        <div className="contact">
                            <label htmlFor="password">New password:</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={handlePassword}
                            />
                        </div>
                        <div className="contact">
                            <label htmlFor="oldPassword">Old password:</label>
                            <input 
                                type="password" 
                                id="oldPassword"
                                value={oldPassword}
                                required
                                onChange={handleOldPassword}
                            />
                        </div>
                    </div>
                    <div className="submit">
                        <div className="save">
                            <button type="submit" disabled={!password}>Done</button> {/* The button will show when user input information */}
                        </div>
                    </div> 
                </form>
            </section>
            <Menu/>
        </>
    )
};

export default Password;
