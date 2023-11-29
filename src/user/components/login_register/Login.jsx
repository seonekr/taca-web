import React, { useState } from "react";
import "./login.css";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import google from "../../../img/google.png";
import { IoMdAlert } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

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
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "email is required"
    }
    if (!password.trim()) {
      validationErrors.password = "password is required"
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          const token = result.token;
          const userID = result.userID;
          if (result.urole === "Admin") {
            localStorage.setItem("token", token);
            localStorage.setItem("userID", userID);
            navigate("/dashboard");
          } else if (result.urole === "Customer") {
            localStorage.setItem("token", token);
            localStorage.setItem("userID", userID);
            navigate("/");
          } else {
            setError(result.Error);
            navigate("/login");
          }
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section>
      <form className="box_container_login2">
        <div className="cover">
          <div className="box_cancel_login">
            <h2 className="box_container_login_text">Login</h2>
            <Link to="/">
              <AiOutlineClose id="icon_cancel_login" />
            </Link>
          </div>
          {/* {error ? (
            <div className="boxAlartLogin">
              <IoMdAlert className="iconAlert" />
              <p className="txtalert_p">{error && error}</p>
              <MdOutlineCancel className="iconAlert_canCel" />
            </div>
          ) : (
            <p></p>
          )} */}

          {/* <h3>{error && error}</h3> */}
          <div>
            <input
              className="input_form"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmail}
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>

          <div>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePassword}
            />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>

          <Link to="#" className="forgot_password">
            Forgot Password?
          </Link>

          <div className="loginbtn_login">
            <Link onClick={handleSubmit} type="submit" className="login_btn">
              Login
            </Link>
          </div>
          <div className="googlebtn_btn">
            <p className="box_dont">
              Don't have an account?{" "}
              <Link to="/register" className="loginmoreLink">
                Signup
              </Link>
            </p>
            <p>Or</p>
            <Link to="#" className="google_btn">
              <img src={google} alt="img" />

              <p>Login with Google</p>
            </Link>
            {/* <Link to="/alertLogin">Alarter page</Link> */}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
