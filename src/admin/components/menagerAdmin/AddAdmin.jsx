import "./addAmin.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ShowMessage()
  });

  const ShowMessage = () => {
    // Check messages
    if (successMsg === "Success") {
      setMessage("Added Admin Successful!");
    } else {
      setMessage(errorMsg);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = "firstName is required"
    }
    if (!lastName.trim()) {
      validationErrors.lastName = "lastName is required"
    }
    if (!email.trim()) {
      validationErrors.email = "email is required"
    }
    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber = "phone number is required"
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg(validationErrors);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      fname: firstName,
      lname: lastName,
      tel: phoneNumber,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/admin/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setSuccessMsg(result.Status);
          navigate("/admin/register");
        } else {
          setErrorMsg(result.Error);
          navigate("/admin/register");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <AdminMenu />
      <section id="addAmin">
        <div className="goback">
          <Link to="/admins" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>Back</p>
          </Link>
        </div>
        <div className="box_addAdmin">
          {/* <h3>{message && message}</h3> */}
          <form onSubmit={handleSubmit}>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Add Admin</h2>
                <div>
                  <button type="submit" className="submit">Add</button>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">First name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="text"
                    id="fname"
                    className="input"
                    placeholder="Fist name..."
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  {errorMsg.firstName && <p className="error_message">{errorMsg.firstName}</p>}
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="lname" className="titlelabel">Last name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="text"
                    id="lname"
                    className="input"
                    placeholder="Last name..."
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {errorMsg.lastName && <p className="error_message">{errorMsg.lastName}</p>}
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">Email:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email address..."
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errorMsg.email && <p className="error_message">{errorMsg.email}</p>}
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">Phone number:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <input
                    type="text"
                    id="phone"
                    className="input"
                    placeholder="Phone number..."
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  {errorMsg.phoneNumber && <p className="error_message">{errorMsg.phoneNumber}</p>}
                </div>

              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">Profile image:</label>
                <div className="boxiconnandinput">
                  <CiImageOn className="iconinput" />
                  <input type="file" className="input"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddAdmin;
