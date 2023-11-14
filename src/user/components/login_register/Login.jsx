import React, { useState } from "react";
import "./login.css";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import google from "../../../img/google.png";
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
      .post(import.meta.env.VITE_API + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          localStorage.setItem("token", res.data.token);

          console.log(res.data.urole);

          // if (res.data.urole === "Admin") {
          //   navigate("/dashboard");
          // } else {
          //   navigate("/");
          // }

          if (res.data.urole === "Admin") {
            console.log("Main!");
            navigate("/dashboard");
          } else {
            console.log("Dashboard!");
            navigate("/");
          }
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
      <form className="box_container_login2">
        <div className="box_cancel_login">
          <Link to="/">
            <AiOutlineClose id="icon_cancel_login" />
          </Link>
        </div>
        <div className="cover">
          <h2 className="box_container_login_text">Login</h2>
          <h3>{error && error}</h3>
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

          <Link to="#" className="forgot_password">
            Forgot Password?
          </Link>

          <div className="loginbtn_login">
            <Link onClick={handleSubmit} type="submit" className="login_btn">
              Login
            </Link>
          </div>

          <p>
            Don't have an account? <Link to="/register">Signup</Link>
          </p>

          <p>Or</p>
          <div className="googlebtn_btn">
            <Link to="#" className="google_btn">
              <img src={google} alt="img" />
              <p>Login with Google</p>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
