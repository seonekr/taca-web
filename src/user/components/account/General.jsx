import "./account.css"
import { FaArrowLeft } from "react-icons/fa6";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const General = () => {
    return(
        <>
            <section id="header-account">
                <div className="account-navbar">
                    <div className="header-box"><Link to="/account"><FaArrowLeft/></Link></div>
                    <div className="header-box middle">General</div>
                    <div className="header-box"></div>
                </div>
            </section>
            <section id="account">
                <div className="personal-info">
                    <div className="text-info">
                        <a><span>Email</span><p>example@gmail.com</p></a>
                        <a><span>Phone</span><p>+856 2099988787</p></a>
                        <a><span>Password</span><p>**********</p></a>
                    </div>
                </div>
            </section>
            <Menu/>
        </>
    )
};

export default General;
