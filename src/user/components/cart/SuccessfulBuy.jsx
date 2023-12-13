import React from 'react'
import './SuccessfulBuy.css'
import { Link } from "react-router-dom";
import { ImCheckmark } from 'react-icons/im';
import Header from "../header/Header";
import Menu from "../menu/Menu";

function SuccessfulBuy() {
    return (
        <>
            <Header />
            <form id='menager'>
                <div className="group_lisblecackk">
                    <div className="box_guopoidHead">
                        <div className="idf">
                            <p>NO: 15</p>
                            <p>ID: 4</p>
                            <p>Name: Acer</p>
                        </div>
                        <div className='order_successfulBox'>
                            <div className='box_icon_Check'>
                                <ImCheckmark className='box_icon_Check_iconn' />
                            </div>
                            <p>Takes 24 hours to deliver</p>
                        </div>
                        <div className='spenboxspad'></div>
                    </div>

                    <div className='box_bill_productS'>
                        <hr />
                        <div className="order_billGopBox">
                            <div className="detial">
                                <h3>Product Name</h3>
                                <p>name...</p>
                                <p>name...</p>
                                <p>name...</p>
                            </div>
                            <div className="detial">
                                <h3>Price</h3>
                                <p>$20.00</p>
                                <p>$20.00</p>
                                <p>$20.00</p>
                            </div>
                            <div className="detial">
                                <h3>Amount</h3>
                                <p>5</p>
                                <p>5</p>
                                <p>5</p>
                            </div>
                        </div>
                        <hr />
                        <div className='box_title_product'>
                            <div className="box_titlePrice">
                                <h3>TOTAL:</h3>
                                <p>$100.00</p>
                            </div>
                            <div className="box_place-on">
                                <p>Place on: 15/09/2023</p>
                                <p>Payment method: Bcel One</p>
                                <p>Status: completed</p>
                                <p>Delivery by: Anousit</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/">
                        <button className="btnViewProduct" >Go To Shop More</button>
                    </Link>
                </div>
            </form>
            <Menu />
        </>
    )
}

export default SuccessfulBuy