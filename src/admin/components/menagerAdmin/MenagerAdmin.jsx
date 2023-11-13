import React from 'react'
import "./menagerAdmin.css"
import { AiOutlineDelete,AiOutlineLeft,AiOutlineRight  } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AdminMenu from '../adminMenu/AdminMenu';
import users from '../../../img/users.png'


const MenagerUser = () => {
  return (
    <>
        <section id='menager'>
            <AdminMenu/>
            <div className='container_body_adminuser'>
                <div className='container_box_users'>
                    <div className='box_users'>
                        <h2>Admin</h2>
                        <form className="search">
                            <div className="search-box_menageruser">
                                <input type="text" placeholder="Search ..." />
                                <button type="submit">
                                <IoSearchOutline />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='box_users_admin'>
                        <Link to="#" className='box_admin_text'>
                            <img src={users} alt='img'></img>
                            <div className='container_chat_name'>
                                <p>Name: Sompong</p>
                                <p>Eamil: Sompong@gmail.com</p>
                            </div>
                        </Link>
                        <div className='container_admin_icon'>
                            
                            <Link to="/editadmin/" className='btn_edit'>
                                <MdOutlineEdit id='icon_edit_delete'/>
                            </Link>
                            <button className='btn_delete'>
                                <AiOutlineDelete id='icon_edit_delete'/>
                            </button>
                        </div>
                    </div>
                    <div className='box_users_admin'>
                        <Link to="#" className='box_admin_text'>
                            <img src={users} alt='img'></img>
                            <div className='container_chat_name'>
                                <p>Name: Sompong</p>
                                <p>Eamil: Sompong@gmail.com</p>
                            </div>
                        </Link>
                        <div className='container_admin_icon'>
                            
                            <Link to="/editadmin/" className='btn_edit'>
                                <MdOutlineEdit id='icon_edit_delete'/>
                            </Link>
                            <button className='btn_delete'>
                                <AiOutlineDelete id='icon_edit_delete'/>
                            </button>
                        </div>
                    </div>
                    <div className='box_users_admin'>
                        <Link to="#" className='box_admin_text'>
                            <img src={users} alt='img'></img>
                            <div className='container_chat_name'>
                                <p>Name: Sompong</p>
                                <p>Eamil: Sompong@gmail.com</p>
                            </div>
                        </Link>
                        <div className='container_admin_icon'>
                            
                            <Link to="/editadmin/" className='btn_edit'>
                                <MdOutlineEdit id='icon_edit_delete'/>
                            </Link>
                            <button className='btn_delete'>
                                <AiOutlineDelete id='icon_edit_delete'/>
                            </button>
                        </div>
                    </div>
                    <div className='box_users_admin'>
                        <Link to="#" className='box_admin_text'>
                            <img src={users} alt='img'></img>
                            <div className='container_chat_name'>
                                <p>Name: Sompong</p>
                                <p>Eamil: Sompong@gmail.com</p>
                            </div>
                        </Link>
                        <div className='container_admin_icon'>
                            
                            <Link to="/editadmin/" className='btn_edit'>
                                <MdOutlineEdit id='icon_edit_delete'/>
                            </Link>
                            <button className='btn_delete'>
                                <AiOutlineDelete id='icon_edit_delete'/>
                            </button>
                        </div>
                    </div>
                    <div className='box_users_admin'>
                        <Link to="#" className='box_admin_text'>
                            <img src={users} alt='img'></img>
                            <div className='container_chat_name'>
                                <p>Name: Sompong</p>
                                <p>Eamil: Sompong@gmail.com</p>
                            </div>
                        </Link>
                        <div className='container_admin_icon'>
                            
                            <Link to="/editadmin/" className='btn_edit'>
                                <MdOutlineEdit id='icon_edit_delete'/>
                            </Link>
                            <button className='btn_delete'>
                                <AiOutlineDelete id='icon_edit_delete'/>
                            </button>
                        </div>
                    </div>
                    
                    <div className='box_next_admin'>
                        <button className='box_prev_next_admin'>
                            <AiOutlineLeft id="box_prev_next_icon"/>
                            <p>Prev</p>
                        </button>
                        <div className='box_num_admin'>
                            <p className='num_admin'>1</p>
                            <p className='num_admin'>2</p>
                            <p className='num_admin'>3</p>
                        </div>
                        
                        <button className='box_prev_nexts_admin'>
                            <p>Next</p>
                            <AiOutlineRight id="box_prev_next_icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default MenagerUser