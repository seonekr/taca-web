import "./account.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Header from "../header/Header";
import { BiLogOut } from "react-icons/bi";
import user from "../../../img/user.png";
import Menu from "../menu/Menu"
import { Link } from "react-router-dom";
const Account = () => {
    return (
        <>
            <Header />

            <section id="account" className="accountContainer">
                <div className="account_navbarr">
                    <div className="header_boxBack"><Link to="/" className='guopIconbAck'><FaAngleLeft className='iconnBack' />Back</Link></div>
                    <div className="headerTiele">Account</div>
                    <div className="header-box"></div>
                </div>

                <div className="personal-info">
                    <div className="profile">
                        <div className="box-image"><span><img src={user} alt="" /></span></div>
                        <span className="name">Name<p>.....</p></span>
                    </div>
                    <div className="text-info">
                        <Link to="/account/general">
                            <span>General</span><FaAngleRight />
                        </Link>
                        <Link to="/account/contact">
                            <span>Contact</span><FaAngleRight />
                        </Link>
                        <Link to="/account/password">
                            <span>Password</span><FaAngleRight />
                        </Link>
                    </div>

                    <div className="about-account">
                        <Link to="/" className="logout">
                            <div className="icon-logout"><BiLogOut /></div>
                            <div className="text-logout">Logout</div>
                        </Link>
                        <Link to="/">Delete account</Link>
                    </div>
                </div>
            </section>
            <Menu />
        </>
    )
};

export default Account;
