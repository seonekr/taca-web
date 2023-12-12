import React, { useState, useEffect } from "react";
import "./header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Logo1 from "../../../img/Logo1.png";

const Header = ({ handleSearch }) => {
  // For authenticate user
  const userID = localStorage.getItem("userID");
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/products" },
    { label: "Orders", path: "/order" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Search bar function
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <div className="headMenu">
              <div className="logo1">
                <Link to="/">
                  <img src={Logo1} alt="Logo" />
                </Link>
              </div>

              <div className="boxLiMenu">
                <div className="linkLi">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.label}
                      to={menuItem.path}
                      className={`link ${location.pathname === menuItem.path ? "active" : ""
                        }`}
                    >
                      {menuItem.icon}
                      <p>{menuItem.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="ulHead_box">
              <form onSubmit={handleSubmit} className="searchBarForm">
                {" "}
                {/* Here is search bar */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <FaMagnifyingGlass className="iconSearch" />
                </button>
              </form>

              <div className="right_ofHeadBox">
                <div className="boxsearchContainer">
                  {userID ? (
                    <Link to="/cart">
                      <FaCartShopping className="head_colorr" />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <FaCartShopping className="head_colorr" />
                    </Link>
                  )}
                </div>
                <div>
                  {userID ? (
                    <div>
                      <Link to="/account">
                        <FaRegUser className="head_colorr" />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link to="/login" className="head_colorr">
                        Login
                        <BiLogIn className="login" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
