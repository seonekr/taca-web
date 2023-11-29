import React, { useState } from 'react';
import 'boxicons';
import { Link } from 'react-router-dom';
import { IoMdAlert } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import google from '../../../img/google.png';
import { AiOutlineClose } from "react-icons/ai"

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        console.log('Form submitted!');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <div className="box_container">
            <div className="container_register">
                <div className='box_cancel_register'>
                    <h2 className="text_register">Register</h2>
                    <Link to="/"><AiOutlineClose id="icon_cancel_register" /></Link>
                </div>
                <div className="boxAlartLogin">
                    <IoMdAlert className='iconAlert' />
                    <p className='txtalert_p'>Email and password is wrong</p>
                    <MdOutlineCancel className='iconAlert_canCel' />
                </div>
                <form onSubmit={handleSubmit} className="box_form_register">
                    <div className="box_form1">
                        <input
                            className="input_form1"
                            type="name"
                            placeholder="First name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <input
                            className="input_form1"
                            type="name"
                            placeholder="Last name"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <input
                        className="input_form"
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        className="input_form"
                        type="phonenumber"
                        placeholder="Enter Your Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <input
                        className="input_form"
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input
                        className="input_form"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <Link to="/login" type="submit" className="signup_btn">
                        Signup
                    </Link>
                </form>

                <div className='box_already'>
                    <p>Already have an account? <Link to="/login" className='loginmoreLink'>Login</Link></p>
                    <p>Or</p>
                    <Link to="#" className="google_btn">
                        <img
                            src={google}
                            alt="img"
                        />
                        <p>Login with Google</p>
                    </Link>
                    <Link to="/register">Go back</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;