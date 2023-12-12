import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";

const UpdateAdmin = () => {
    

    return (
        <>
            <AdminMenu />
            <section id="user">
                <div className="back">
                    <Link to="/admins" className="link-back">
                        <FaAngleLeft />
                        Back
                    </Link>
                    <div>Admin</div>
                </div>
                <form className="userInfo">
                    <div className="info">
                        <div>
                            <input
                                type="text"
                                placeholder="User ID: "
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Name: "
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="User Email: "
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Phone number:"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Password: ********"
                            />
                        </div>
                        <div className="del-update">
                            <button type="submit" className="update upd">
                                <MdOutlineEdit />
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="img">
                        
                        <img src={user} alt="admin profile" />
                    </div>
                </form>
            </section>
           
        </>
    );
};

export default UpdateAdmin;
