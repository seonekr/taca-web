import "./addAmin.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";

import { FaAngleLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const EditAdmin = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getAdmin/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setFirstName(result.Result[0].fname);
          setLastName(result.Result[0].lname);
          setEmail(result.Result[0].email);
          setPhoneNumber(result.Result[0].tel);
          // setPhoneNumber(result.Result[0].profile_image);
          setProfile_image("profile.png");
        }
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  useEffect(() => {
    // Check messages
    if (successMsg === "Success") {
      setMessage("Added Admin Successful!");
    } else {
      setMessage(errorMsg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      tel: phoneNumber,
      fname: firstName,
      lname: lastName,
      // password: password,
      password: "1234",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/updateAdmin/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setSuccessMsg(result.Status);
          navigate("/admin/detail/" + id);
        } else {
          setErrorMsg(result.Error);
          navigate("/admin/edit/" + id);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <AdminMenu />
      <section id="addAmin">
        <div className="box_addAdmin">
          <div className="container_add_admin">
            <Link to="/admins" className="box_guopIconbAck">
              <FaAngleLeft id="box_icon_Back" />
              <p>Back</p>
            </Link>
            <h2>Update Admin</h2>
            <div></div>
          </div>
          <h3>{message && message}</h3>
          <form>
            <div className="addAdminForm">
              <div className="add-box">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>
              <div className="add-box">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
              <div className="add-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="add-box">
                <label htmlFor="phoneNumber">Phone</label>
                <input
                  type="text"
                  id="phoneNumber"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  value={phoneNumber}
                />
              </div>
            </div>
            <div className="imageAdmin">
              <div className="image">
                <label htmlFor="adminImage">
                  <img
                    src={
                      import.meta.env.VITE_API +
                      "/uploads/images/" +
                      profile_image
                    }
                  />
                </label>
              </div>
            </div>
            <div className="submit">
              <button onClick={handleSubmit} type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditAdmin;
