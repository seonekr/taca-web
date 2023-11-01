import React from 'react'
import "./orderpage.css"
import { AiFillDashboard,AiOutlineUser,AiOutlineSetting,AiFillProfile,AiOutlineDelete,AiOutlineLeft,AiOutlineRight } from 'react-icons/ai';
import { FaBook,FaSearch } from 'react-icons/fa';
import { TbUserCog } from 'react-icons/tb';
import { RiMessage2Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import { BsFilter,BsPlusLg } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import people from '../../img/people.png';

const OrderPage = () => {
  return (
    <>
        <section id='menager'>
            <div className='box_menager_orderpage'>
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

                <div className='container_body'>
                    <div className='box_search'>
                        <div className='input_wrapper'>
                            <FaSearch id="search-icon" />
                            <input placeholder='Search.' />
                        </div>
                        <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png' alt='img'></img>
                    </div>
                    <div className='container_box_users'>
                        <div className='box_user'>
                            <div></div>
                            <div className='box_filter'>
                                <form className='cetegory_form'>
                                    <select className='categoryFilter'>
                                        <option className='listOption' value="Something">Filter users</option>
                                        <option className='listOption' value="Something">Filter users</option>
                                        <option className='listOption' value="Something">Filter users</option>
                                        <option className='listOption' value="Something">Filter users</option>
                                    </select>
                                </form>
                            <BsFilter id='filter_icon'/>
                            </div>
                        </div>

                        <div className='box_users_order'>
                            
                            <Link to="" className='box_order_text'>
                                <img src='https://sw.cool3c.com/user/29442/2020/c9146c0c-460f-4389-be1e-74c415a8f153.png?fit=max&w=1400&q=80' alt='#'></img>
                                <div className='container_chat_name'>
                                    <p>NO: 1</p>
                                    <p>ID: 1</p>
                                    <h4>Samsung</h4>
                                </div>
                            </Link>
                            <div className='box_container_time'>
                                <p>Time: </p>
                                <p>01/19/2023</p>
                                <p>8:00 PM</p>
                            </div>
                            <div className='container_order_icon'>
                                <Link to="#" className='btn_pending'>
                                    Pending
                                </Link>
                                <Link to="#" className='btn_view'>
                                    View
                                </Link>
                            </div>
                            
                        </div>
                        
                        <div className='box_users_order'>
                            
                            <Link to="" className='box_order_text'>
                                <img src='https://sw.cool3c.com/user/29442/2020/c9146c0c-460f-4389-be1e-74c415a8f153.png?fit=max&w=1400&q=80' alt='#'></img>
                                <div className='container_chat_name'>
                                    <p>NO: 1</p>
                                    <p>ID: 1</p>
                                    <h4>Samsung</h4>
                                </div>
                            </Link>
                            <div className='box_container_time'>
                                <p>Time: </p>
                                <p>01/19/2023</p>
                                <p>8:00 PM</p>
                            </div>
                            <div className='container_order_icon'>
                                <Link to="#" className='btn_paid'>
                                    Paid
                                </Link>
                                <Link to="#" className='btn_view'>
                                    View
                                </Link>
                            </div>
                            
                        </div>
                        <div className='box_users_order'>
                            
                            <Link to="" className='box_order_text'>
                                <img src='https://sw.cool3c.com/user/29442/2020/c9146c0c-460f-4389-be1e-74c415a8f153.png?fit=max&w=1400&q=80' alt='#'></img>
                                <div className='container_chat_name'>
                                    <p>NO: 1</p>
                                    <p>ID: 1</p>
                                    <h4>Samsung</h4>
                                </div>
                            </Link>
                            <div className='box_container_time'>
                                <p>Time: </p>
                                <p>01/19/2023</p>
                                <p>8:00 PM</p>
                            </div>
                            <div className='container_order_icon'>
                                <Link to="#" className='btn_pending'>
                                    Pending
                                </Link>
                                <Link to="#" className='btn_view'>
                                    View
                                </Link>
                            </div>
                            
                        </div>

                        <div className='box_users_order'>
                            
                            <Link to="" className='box_order_text'>
                                <img src='https://sw.cool3c.com/user/29442/2020/c9146c0c-460f-4389-be1e-74c415a8f153.png?fit=max&w=1400&q=80' alt='#'></img>
                                <div className='container_chat_name'>
                                    <p>NO: 1</p>
                                    <p>ID: 1</p>
                                    <h4>Samsung</h4>
                                </div>
                            </Link>
                            <div className='box_container_time'>
                                <p>Time: </p>
                                <p>01/19/2023</p>
                                <p>8:00 PM</p>
                            </div>
                            <div className='container_order_icon'>
                                <Link to="#" className='btn_paid'>
                                    Paid
                                </Link>
                                <Link to="#" className='btn_view'>
                                    View
                                </Link>
                            </div>
                            
                        </div>
                        
                       

                        <div className='box_next_order'>
                            <Link to="#" className='box_prev_next_order'>
                                <AiOutlineLeft id="box_prev_next_icon"/>
                                <p>Prev</p>
                            </Link>
                            <Link to="#" className='box_num_order'>
                                <p className='num_admin'>1</p>
                                <p className='num_admin'>2</p>
                                <p className='num_admin'>3</p>
                            </Link>
                            <Link to="#" className='box_prev_nexts_order'>
                                <p>Next</p>
                                <AiOutlineRight id="box_prev_next_icon"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default OrderPage