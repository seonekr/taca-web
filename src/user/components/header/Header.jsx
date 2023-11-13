import "./header.css";
import {
  FaStore,
  FaMagnifyingGlass,
  FaCartShopping,
  FaRegUser,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Logo1 from "../../../img/Logo1.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");

  console.log(token);

  //   var isLoggedIn = false;
  //   var user = "";

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
          setUser(response.data.decoded.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <ul className="headMenu">
              <li>
                <Link to="/">
                  <img src={Logo1} alt="Logo" />
                </Link>
              </li>
              <div className="boxLiMenu">
                <li>
                  <Link to="/" className="linkLi active">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/product_search" className="linkLi">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/order" className="linkLi">
                    Order
                  </Link>
                </li>
                <li>
                  <Link to="/chatuser" className="linkLi">
                    Contact
                  </Link>
                </li>

                {user ? (
                  user
                ) : (
                  <li>
                    <Link to="/login" className="linkLi">
                      Login
                    </Link>
                  </li>
                )}
              </div>
            </ul>
            <ul className="ulHead_box">
              <li>
                <Link to="/product_search">
                  <FaMagnifyingGlass className="head_colorr" />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <FaCartShopping className="head_colorr" />
                </Link>
              </li>
              {user ? (
                <li>
                  <Link to="/account">
                    <FaRegUser className="head_colorr" />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <FaRegUser className="head_colorr" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
