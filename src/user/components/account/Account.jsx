import "./account.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Header from "../header/Header";
import { BiLogOut } from "react-icons/bi";
import userProfileDefault from "../../../img/user.png";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Account = () => {
  const [userAccount, setUserAccount] = useState("");
  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/authen", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setUserAccount(result.decoded.email);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navitage("/");
  };

  return (
    <>
      <Header />

      <section id="account" className="accountContainer">
        <div className="account_navbarr">
          <div className="header_boxBack">
            <Link to="/" className="guopIconbAck">
              <FaAngleLeft className="iconnBack" />
              Back
            </Link>
          </div>
          <div className="headerTiele">Account</div>
          <div className="header-box"></div>
        </div>

        <div className="personal-info">
          <div className="profile">
            <div className="box-image">
              <span>
                <img src={userProfileDefault} alt="" />
              </span>
            </div>
            <span className="name">{userAccount}</span>
          </div>
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

          <div className="about-account">
            <Link to="/" className="logout">
              <div className="icon-logout">
                <BiLogOut />
              </div>
              <div className="text-logout" onClick={handleLogout}>
                Logout
              </div>
            </Link>
            <Link>Delete account</Link>
          </div>
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Account;
