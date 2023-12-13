import "./account.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Header from "../header/Header";
import { BiLogOut } from "react-icons/bi";
import user from "../../../img/user.png";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { Diversity1 } from "@mui/icons-material";

const Account = () => {
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

    fetch(import.meta.env.VITE_API + "/getCustomer/" + userID, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setUserDetail(result.Result[0]);
          console.log(userDetail.profile_image);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <>
      <Header />

      <section id="account" className="accountContainer">

        <div className="personal-info">
          <div className="box_account">
            <h2>Account</h2>
            <div className="text-info">
              <Link to="/account/general">
                <span>General</span>
                <FaAngleRight />
              </Link>
              <Link to="/account/contact">
                <span>Contact</span>
                <FaAngleRight />
              </Link>
              <Link to="/account/password">
                <span>Password</span>
                <FaAngleRight />
              </Link>
            </div>
          </div>

          <div className="profile">
            <div className="box-image">
              <span>
                {
                  <img
                    src={
                      import.meta.env.VITE_API +
                      "/uploads/images/" +
                      userDetail.profile_image
                    }
                    alt=""
                  />
                }
              </span>
            </div>
            <span className="name">
              Name: <p>{userDetail.email}</p>
            </span>
            <div className="about-account">
              <div onClick={handleLogout} className="logout">
                <div className="icon-logout">
                  <BiLogOut />
                </div>
                <div className="text-logout">Logout</div>
              </div>
            </div>
          </div>
           
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Account;
