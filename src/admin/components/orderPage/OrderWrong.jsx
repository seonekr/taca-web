import React from 'react';
import './orderBill.css';
import { FaAngleLeft } from "react-icons/fa6";
import AdminMenu from '../adminMenu/AdminMenu';
import { MdClose } from 'react-icons/md';
import { Link } from "react-router-dom";
import { MdOutlineEdit } from 'react-icons/md';


const OrderWrong = () => {
    return (
        <>
            <AdminMenu />
            <form id='menager'>
                <div className='container_box_orderBill'>
                    <div className="content_box_orderBill">
                        <div className="header-box"><Link to="/orderpage/" className='guopIconbAck'><FaAngleLeft className='iconnBack' />Back</Link></div>
                        <div className="group_lisblecackk">
                            <div className="box_guopoidHead">
                                <div className="idf">
                                    <p>NO: 15</p>
                                    <p>ID: 4</p>
                                    <p>Name: Acer</p>
                                </div>
                                <div className='box_icon_Check_wrong'>
                                    <MdClose id='icon_MdClose' />
                                </div>
                            </div>

                            <div className='box_bill_product'>
                                <hr />
                                <div className='bill_product_name'><h2>Products</h2></div>

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
                                    <div className='container_btn_edit'>
                                        <div className="box_place-on">
                                            <p>Place on: 15/09/2023</p>
                                            <p>Payment method: Bcel One</p>
                                            <div className='box_filter_status'>
                                                <p>Status: </p>
                                                <form>
                                                    <select className='statusFilter'>
                                                        <option className='listOption_status' value="Something">Pending</option>
                                                        <option className='listOption_status' value="Something">Completed</option>
                                                    </select>
                                                </form>
                                            </div>
                                            <p>Delivery by: Anousit</p>
                                        </div>
                                        <Link to="#" className='btn_edit_product'>
                                            <MdOutlineEdit id='icon_edit_delete'/>
                                            <p>Edit</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default OrderWrong