import "./adminMenu.css";
import {
  IoDocumentText,
  IoSettingsOutline,
  IoLogOutOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BiUser, BiMessageDetail } from "react-icons/bi";
import { LiaUserCogSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSell } from "react-icons/md";
import cart from "../../../img/cart.png";
import user from "../../../img/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminMenu = () => {
  const navigate = useNavigate();
  var isLoggedin = false; //For check login or not
  const [account, setAccount] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3001/getAdmin/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setAccount(result.Result[0].email);
        }
        console.log(account);
        // console.log(result.Result[0].email)
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/admin");
  };

  return (
    <>
      <section id="dashboard">
        <div className="container_boxD">
          <div className="left">
            <Link to="/admin">
              <div className="logo">
                <span>
                  <img src={cart} alt="" />
                </span>
              </div>
            </Link>

            <div className="menu">
              <Link to="admin/dashboard" className="link active">
                <RxDashboard />
                <p>Dashboard</p>
              </Link>
              <Link to="/admin/post/" className="link">
                <IoDocumentText />
                <p>Products</p>
              </Link>
              <Link to="/admin/gallery" className="link">
                <MdOutlineSell />
                <p>Orders</p>
              </Link>
              <Link to="/admin" className="link">
                <BiUser />
                <p>User</p>
              </Link>
              <Link to="/admin/addadmin" className="link">
                <LiaUserCogSolid />
                <p>Admin</p>
              </Link>
              <Link to="/admin/message" className="link">
                <BiMessageDetail />
                <p>Message</p>
              </Link>
              <Link to="/admin" className="link">
                <IoSettingsOutline />
                <p>Setting</p>
              </Link>
              <Link className="link" onClick={handleLogout}>
                <IoLogOutOutline />
                <p>Log Out</p>
              </Link>
            </div>
          </div>
          <div className="right">
            <h3>Dashboard</h3>
            <form className="search">
              <div className="search-box">
                <input type="text" placeholder="search ..." />
                <button type="submit">
                  <IoSearchOutline />
                </button>
              </div>
            </form>
            {isLoggedin ? (
              <div className="userAdminImage">
                <img src={user} alt="Logo_Profile" />
              </div>
            ) : (
              <div className="userAdminImage">
                <p>{account}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminMenu;
