import { FaArrowLeft } from "react-icons/fa6";
import React, { useState } from "react";
import Menu from "../menu/Menu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Address = () => {

    const navigate = useNavigate();

    // state address 
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [companny, setCompanny] = useState('');
    const [branch, setBranch] = useState('');


    // submit
    const handleSubmit = (e) => {
        e.preventDefault();

        setProvince(''),
        setCity(''),
        setCompanny(''),
        setBranch('')

        navigate('/cart/payment/',{ // Navigate to the payment page with the address props
            state: {
                province: province+ ',',
                city: city + ',',
                companny: companny + ',',
                branch
            }
        });
    }

    const handleProvince = (e) => {
        const value = e.target.value;
        setProvince(value);
    };

    const handleCity = (e) => {
        const value = e.target.value;
        setCity(value);
    };
    const handleCompanny = (e) => {
        const value = e.target.value;
        setCompanny(value);
    };
    const handleBranch = (e) => {
        const value = e.target.value;
        setBranch(value);
    };

    return(
        <>
            <section id="header-account">
                <div className="account-navbar">
                    <div className="header-box"><Link to="/payment"><FaArrowLeft/></Link></div>
                    <div className="header-box middle">Address</div>
                    <div className="header-box"></div>
                </div>
            </section>
            <section id="address">
                <form onSubmit={handleSubmit}>
                    <div className="box">
                        <label htmlFor="prov">Province:</label>
                        <input
                            type="text"
                            id="prov"
                            value={province}
                            onChange={handleProvince}
                            required
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleCity}
                            required
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="companny">Companny:</label>
                        <input
                            type="text"
                            id="companny"
                            value={companny}
                            onChange={handleCompanny}
                            required
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="branch">Branch:</label>
                        <input
                            type="text"
                            id="branch"
                            value={branch}
                            onChange={handleBranch}
                            required
                        />
                    </div>
                    <div className="submit">
                        <div className="save">
                            <button type="submit" disabled={!province && !city && !companny && !branch}>Confirm</button> {/* The button will show when user input information */}
                        </div>
                    </div> 
                </form>
            </section>
            <Menu/>
        </>
    )
}

export default Address;