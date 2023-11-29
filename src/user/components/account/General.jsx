import "./account.css";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const General = () => {
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
          console.log(userDetail);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Header />
      <div id="account" className="accountContainer">
        <div className="account_navbarr">
          <div className="header_boxBack">
            <Link to="/account" className="guopIconbAck">
              <FaAngleLeft className="iconnBack" />
              Back
            </Link>
          </div>
        </div>
        <div className="personal-info">
          <div className="text-info">
            <a>
              <span>Email</span>
              <p>{userDetail.email}</p>
            </a>
            <a>
              <span>Phone</span>
              <p>{userDetail.tel}</p>
            </a>
            <a>
              <span>Password</span>
              <p>**********</p>
            </a>
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default General;
