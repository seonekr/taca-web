import "./account.css";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const General = () => {
  const [userAccount, setUserAccount] = useState("");
  const [customer, setCustomer] = useState([]);
  const token = localStorage.getItem("token");

  const navitage = useNavigate();

  console.log(token);

  useEffect(() => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/authen",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.Status === "Success") {
          setUserAccount(response.data.decoded.id);
          console.log(userAccount);

          // For get some detail of this user
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/getCustomer/" + userAccount,
            headers: {
              "Content-Type": "application/json",
            },
          };

          axios
            .request(config)
            .then((response) => {
              // console.log(JSON.stringify(response.data));
              setCustomer(response.data.Result[0]);
              console.log(JSON.stringify(customer));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              <p>{customer.email}</p>
            </a>
            <a>
              <span>Phone</span>
              <p>{customer.tel}</p>
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
