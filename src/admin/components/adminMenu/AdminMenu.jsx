import "./adminMenu.css";
import {
  IoDocumentText,
  IoLogOutOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { LiaUserCogSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSell } from "react-icons/md";
import Logo1 from "../../../img/Logo1.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const userID = localStorage.getItem("userID");

  const navigate = useNavigate();

  // For get user by id
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getAdmin/" + userID, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setUserDetail(result.Result[0]);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    console.log("Logged out");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <section id="dashboard">
        <div className="left">
          <div className="menu">
            <NavLink to="/dashboard" className="link">
              <RxDashboard />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to="/product" className="link">
              <IoDocumentText />
              <p>Products</p>
            </NavLink>
            <NavLink to="/orderpage" className="link">
              <MdOutlineSell />
              <p>Orders</p>
            </NavLink>
            <NavLink to="/users" className="link">
              <BiUser />
              <p>Users</p>
            </NavLink>
            <NavLink to="/admins" className="link">
              <LiaUserCogSolid />
              <p>Admins</p>
            </NavLink>
            <div onClick={() => setShowConfirmation(true)} className="link">
              <IoLogOutOutline />
              <p>Log Out</p>
            </div>
            {showConfirmation && (
              <div className="boxAlertDelete2">
                <div className="confirmation-popup">
                  <p>Do you want to Log out?</p>
                  <div className="btn_ok_on">
                    <button onClick={handleConfirmLogout} className="btn_yes">
                      Yes
                    </button>
                    <button onClick={handleCancelLogout} className="btn_on">
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <div>
              <NavLink to="/dashboard" className="logo">
                <span>
                  <img src={Logo1} alt="" />
                </span>
              </NavLink>
            </div>
            <div className="boximage_admin">
              <NavLink to="/admin/acount" className="userAdminImage">
                <img
                  src={
                    import.meta.env.VITE_API +
                    "/uploads/images/" +
                    userDetail.profile_image
                  }
                  alt="admin profile"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminMenu;
