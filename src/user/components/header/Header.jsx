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

const Header = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  var isLoggedin = true; //For check login or not

  useEffect(() => {
    const id = localStorage.getItem("id");
    
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/getCustomer/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setAccount(result.Result[0].email);
        } else {
          navigate("/");
        }
        console.log("2 : " + isLoggedin);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
                    Chat
                  </Link>
                </li>

                {isLoggedin ? (
                  <li>
                    <p>{account}</p>
                  </li>
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
                <Link to="/">
                  <FaMagnifyingGlass className="head_colorr" />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <FaCartShopping className="head_colorr" />
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaRegUser className="head_colorr" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
