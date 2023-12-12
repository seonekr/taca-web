import "./addAmin.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";

const EditAdmin = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/getAdmin/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setFirstName(result.Result[0].fname);
          setLastName(result.Result[0].lname);
          setEmail(result.Result[0].email);
          setPhoneNumber(result.Result[0].tel);
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
      password: "1234",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/updateAdmin/" + id, requestOptions)
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

  // Handle image selection for the main admin image
  const [mainImage, setMainImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file)); // Use createObjectURL directly
    }
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
          <h3>{message && message}</h3>
          <form>
            <div className="addAdminForm">
              <div className="del-update">
                <button onClick={handleSubmit} type="submit" className="submit">
                  Update
                </button>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">First name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <input
                      type="text"
                      id="firstName"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">Last Name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <input
                      type="text"
                      id="lastName"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </div>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">Email:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <div className="input">
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">Phone number:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <div className="input">
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
              </div>

              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">Profile image:</label>
                  <div className="BorderinputThenImage">
                    <label htmlFor="img">
                      {mainImage ? (
                        <img src={mainImage} alt="Main Product" />
                      ) : (
                        <p>Choose image</p>
                      )}
                      <input type="file" id="img" onChange={handleImage}/>
                    </label>
                    
                  </div>
              </div>

            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditAdmin;
