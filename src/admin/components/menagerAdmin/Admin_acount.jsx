import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import "./addAmin.css";

const Admin_acount = () => {
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

  return (
    <>
      <AdminMenu />
      <section id="addAmin">
        <div className="goback">
          <Link to="/admins" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>Back</p>
          </Link>
        </div>
        <div className="box_addAdmin">
          <form>
            <div className="addAdminForm">
              <h3>Admin account</h3>
              <div className="del-update">
                <div className="del">
                  <AiOutlineDelete />
                </div>
                <div className="update upd">
                  <Link>
                    <MdOutlineEdit className="iconcoloredite" />
                  </Link>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User ID:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{userDetail.id}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User Name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{userDetail.fname} {userDetail.lname}</p>
                  </div>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">Email:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <div className="input">
                    <p>{userDetail.email}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">Phone number:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <div className="input">
                    <p>{userDetail.tel}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">Profile image:</label>
                <div className="BorderinputThenImage">
                  <div className="input">
                    <img src={
                      import.meta.env.VITE_API +
                      "/uploads/images/" +
                      userDetail.profile_image
                    }
                      alt="admin profile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Admin_acount;
