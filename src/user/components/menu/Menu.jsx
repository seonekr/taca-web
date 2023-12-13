import "./menu.css"
import 'boxicons'
import { Link } from "react-router-dom";
import QrdownloadApp from '../../../img/QrdownloadApp.png'
import {FaCartShopping} from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { BsShop, BsClipboardCheck  } from "react-icons/bs";
import Logo1 from "../../../img/Logo1.png";

const Menu = () => {
    return (
        <section>

            {/*Footer Menu For PC */}

            <footer className="footerBox">
                <div className="footer_Container">
                    <div className="footconentBox">
                        <div className="logo_footer">
                            <Link to="/">
                            <img src={Logo1} alt="Logo" />
                            </Link>
                        </div>

                        <p><Link to="/product_search" className="txt_pFoot">Products</Link></p>
                        <p><Link to="/" className="txt_pFoot">All Womwn's fashion</Link></p>
                        <p><Link to="/" className="txt_pFoot">All Electronic device</Link></p>
                        <p><Link to="/" className="txt_pFoot">About Humascot</Link></p>
                    </div>

                    <div className="footconentBox">
                        <h3 className="txt_footHead">Contact us</h3>
                        <p><Link to="/" className="txt_pFoot">Phone: 020 998878788</Link></p>
                        <p><Link to="/" className="txt_pFoot">Phone: 020 998878788</Link></p>
                        <p><Link to="/" className="txt_pFoot">Email: humascot@gmail.com</Link></p>
                        <p><Link to="/" className="txt_pFoot">Address: Asian mall</Link></p>
                    </div>
                    <div className="footconentBox3">
                        <h3 className="txt_footHead txh3">Download App</h3>
                        <div className="foot_contentItem">
                            <img src={QrdownloadApp} alt="QrdownloadApp" />
                            <div className="guop_btndownl">
                                <Link to="https://play.google.com/store/apps" className="footLink">Play Store</Link>
                                <Link to="https://www.apple.com/app-store/" className="footLink">App Store</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hrfoo"/>
                <p className="lastFooter">
                    Copyright &#169;
                    TACA 2023
                </p>
            </footer>

            {/* Footer Menu For Mobile */}

            <div className="menubar">
                <Link to="/" className="box-menu active">
                    <span className="iconMenuSpan"><HiOutlineHome/></span><span>Home</span>
                </Link>
                <Link to="/product_search" className="box-menu">
                    <span className="iconMenuSpan"><BsShop /></span><span>Shop</span>
                </Link>
                <Link to="/order" className="box-menu">
                    <span className="iconMenuSpan"><BsClipboardCheck/></span><span>Order</span>
                </Link>
                <Link to="/cart" className="box-menu">
                    <span className="iconMenuSpan"><FaCartShopping/></span><span>Cart</span>
                </Link>
            </div>

        </section>
    )
}

export default Menu;