import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import './bill.css';
const Bill = () => {
    return (
        <>
            <Header></Header>
            <section id="bill">

                <div className="account-navbar">
                    <div className="header-box"><Link to="/order" className='guopIconbAck'><FaAngleLeft className='iconnBack' />Back</Link></div>
                    <div className="header-box middle">Bill</div>
                    <div className="header-box"></div>
                </div>

                <div className="bill-detial">
                    <div className="guopoidHead">
                        <div className="idf">
                            <p>NO: 15</p>
                            <p>ID: 4</p>
                            <p>Name: Sam</p>
                        </div>
                    </div>
                    <hr />
                    <div className="billGopBox">
                        <div className="detial">
                            <h5>Product Name</h5>
                            <p>name...</p>
                            <p>name...</p>
                            <p>name...</p>
                        </div>
                        <div className="detial">
                            <h5>Price</h5>
                            <p>name...</p>
                            <p>name...</p>
                            <p>name...</p>
                        </div>
                        <div className="detial">
                            <h5>Amount</h5>
                            <p>name...</p>
                            <p>name...</p>
                            <p>name...</p>
                        </div>
                    </div>
                    <hr />
                    <div className="titlePrice">
                        <p>Title:</p>
                        <p>100,000 Kip</p>
                    </div>
                    <div className="place-on">
                        <p>Place on: 15/09/2023</p>
                        <p>Payment method: Bcel One</p>
                        <p>Status: completed</p>
                        <p>Delivery by: Anousit</p>
                    </div>
                </div>
            </section>
            <Menu />
        </>
    );
}

export default Bill;