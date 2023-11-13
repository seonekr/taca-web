import React, { useState } from "react";
import "./loginadmin.css";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavsior
    axios
      .post("http://localhost:3001/admin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          localStorage.setItem("token", res.data.Token)
          localStorage.setItem("id", res.data.id)
          console.log("login token: " + res.data.Token);
          console.log("login id: " + res.data.id);
          navigate("/admin/dashboard");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <form className="box_container_login">
        <div className="box_cancel_admin">
          <Link to="/">
            <AiOutlineClose id="icon_cancel_admin" />
          </Link>
        </div>
        <div className="cover_admin">
          <h2 className="box_container_login_text">Login</h2>
          <h1>{error && error}</h1>
          <input
            className="input_form"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="input_form"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={handlePassword}
          />

          <div className="loginbtn_login">
          <Link to="/admin/dashboard/" type="button" className="login_btn" onClick={handleSubmit}>
              Login
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
