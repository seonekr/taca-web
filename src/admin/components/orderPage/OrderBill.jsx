import React from 'react'
import "./orderBill.css"
import { AiFillDashboard,AiOutlineUser,AiOutlineSetting,AiFillProfile,AiOutlineDelete,AiOutlineLeft,AiOutlineRight } from 'react-icons/ai';
import { FaBook,FaSearch } from 'react-icons/fa';
import { TbUserCog } from 'react-icons/tb';
import { RiMessage2Line } from 'react-icons/ri';
import { PiCheckFatFill } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import people from '../../img/people.png';

const OrderPaid = () => {
  return (
    <>
        <section id='menager'>
            <div className='box_menager_orderpaid'>
                <div className='container_dashboard'>
                    <div className='taca_dashboard'>
                        <h1>TACA</h1>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_dashboard_icon'>
                            <AiFillDashboard id="dashboard_icon"/>
                        </Link>
                        <p>Dashboard</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_product_icon'>
                            <AiFillProfile id="dashboard_icon"/>
                        </Link>
                        <p>Product</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_order_icon'>
                            <FaBook id="dashboard_icon"/>
                        </Link>
                        <p>Orders</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_users_icon'>
                            <AiOutlineUser id="dashboard_icon"/>
                        </Link>
                        <p>Users</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_admin_icon'>
                            <TbUserCog id="dashboard_icon"/>
                        </Link>
                        <p>Admins</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_message_icon'>
                            <RiMessage2Line id="dashboard_icon"/>
                        </Link>
                        <p>Messages</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_setting_icon'>
                            <AiOutlineSetting id="dashboard_icon"/>
                        </Link>
                        <p>Settings</p>
                    </div>
                    <div className='taca_dashboard'>
                        <Link to="#" className='box_logout_icon'>
                            <BiLogOut id="dashboard_icon"/>
                        </Link>
                        <p>Log Out</p>
                    </div>
                </div>

                <div className='container_body_orderpaid'>
                    <div className='box_search'>
                        <div className='input_wrapper_orderpaid'>
                            <FaSearch id="search-icon" />
                            <input placeholder='Search.' />
                        </div>
                        <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' alt='img'></img>
                    </div>
                    <div className='container_box_orderpaid'>
                        
                        <section id="orderbill">
                            <div className="bill-detial">
                                <div className='orderbill_detial'>
                                    <div className="id">
                                        <span><p>NO:</p><p>15</p></span>
                                        <span><p>ID:</p><p>4</p></span>
                                        <span><p>Name:</p><p>Acer</p></span>
                                    </div>
                                    <div className='box_lineCheck'>
                                        <PiCheckFatFill id="lineCheck_icon"/>
                                    </div>
                                    <div></div>
                                </div>
                                <h2>Products</h2>
                                <div className="detial">
                                    <span><h3>Product name</h3><h3>Price</h3><h3>Amount</h3></span>
                                    <span><p>name...</p><p>$15.00</p><p>5</p></span>
                                    <span><p>name...</p><p>$15.00</p><p>5</p></span>
                                    <span><p>name...</p><p>$15.00</p><p>5</p></span>
                                </div>
                                <div className="place-on">
                                    <span><p>Place on:</p><p>15/09/2023</p></span>
                                    <span><p>Payment method:</p><p>Bcel One</p></span>
                                    <span><p>Status:</p><p>completed</p></span>
                                    <span><p>Delivery by:</p><p>Anousit</p></span>
                                </div>
                            </div>
                        </section>
                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default OrderPaid