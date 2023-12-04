import "./user.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import user from "../../../img/user.png";

const User = () => {
  // DFor delete User
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const openConfirmationPopup = (id) => {
    setDeleteUserId(id);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setDeleteUserId(null);
    setConfirmationPopupOpen(false);
  };

  const DeleteUser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/deleteCustomer/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setSuccess(result.Status);
          navigate("/users");
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));

    closeConfirmationPopup();
  };

  // For get user by id
  const [userDetail, setUserDetail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getCustomer/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setUserDetail(result.Result[0]);
          console.log(userDetail);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <AdminMenu />
      <section id="user">
        <div className="back">
          <Link to="/users" className="link-back">
            <FaAngleLeft id="icon_back_user" />
            Back
          </Link>
          <div>User</div>
        </div>
        <h3>{error && error}</h3>
        <div className="userInfo">
          <div className="info">
            <div>User ID: {userDetail.id}</div>
            <div>
              User Name: {userDetail.fname} {userDetail.lname}
            </div>
            <div>User Email: {userDetail.email}</div>
            <div>User Phone number: {userDetail.tel}</div>
            <div>Password: ********</div>
            <div
              className="del"
              onClick={() => openConfirmationPopup(userDetail.reg_id)}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className="img">
            <img
              src={
                import.meta.env.VITE_API +
                "/uploads/images/" +
                userDetail.profile_image
              }
              alt="admin profile"
            />
          </div>
        </div>
      </section>

      {isConfirmationPopupOpen && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete?</p>
          <div className="btn_ok_on">
            <button
              onClick={() => {
                DeleteUser(userDetail.reg_id);
              }}
              className="btn_yes"
            >
              Yes
            </button>
            <button onClick={closeConfirmationPopup} className="btn_on">
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
