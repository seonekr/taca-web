import "./account.css"
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const General = () => {
    return (
        <>
            <Header />
            <div id="account" className="accountContainer">
                <div className="account_navbarr">
                    <div className="header_boxBack"><Link to="/account" className='guopIconbAck'><FaAngleLeft className='iconnBack' />Back</Link></div>
                </div>
                <div className="personal-info">
                    <div className="text-info">
                        <a><span>Email</span><p>example@gmail.com</p></a>
                        <a><span>Phone</span><p>+856 2099988787</p></a>
                        <a><span>Password</span><p>**********</p></a>
                    </div>
                </div>
            </div>
            <Menu />
        </>
    )
};

export default General;
