import React, { useState } from "react";
import "./login.css";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import google from "../../../img/google.png";
import { IoMdAlert } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Kongchan
  const [errors, setErrors] = useState({});

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
      validationErrors.email = "email is required";
    }
    if (!password.trim()) {
      validationErrors.password = "password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
          {error ? (
            <Stack sx={{ width: "100%" }} spacing={2} className="werwer">
              <Collapse in={open}>
                <Alert severity="error">{error && error}</Alert>
              </Collapse>
            </Stack>
          ) : null}
          <div>
            <input
              className="input_form"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmail}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePassword}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
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
