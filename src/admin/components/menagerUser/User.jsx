import "./user.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";

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
      <section id="addAmin">
        <div className="goback">
          <Link to="/users" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>Back</p>
          </Link>
        </div>
        <div className="box_addAdmin">
          <form>
            <div className="addAdminForm">
              <div className="del-update">
                <div
                  className="del"
                  onClick={() => openConfirmationPopup(userDetail.reg_id)}
                >
                  <AiOutlineDelete />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User ID:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{userDetail.id}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User Name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{userDetail.fname} {userDetail.lname}</p>
                  </div>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">Email:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <div className="input">
                    <p>{userDetail.email}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">Phone number:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <div className="input">
                    <p>{userDetail.tel}</p>
                  </div>
                </div>

              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">Profile image:</label>
                <div className="BorderinputThenImage">
                  <div className="input">
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
              </div>
            </div>
          </form>
        </div>
      </section>

      {isConfirmationPopupOpen && (
        <div className="boxAlertDelete">
          <div className="confirmation-popup">
            <div>
              <AiOutlineDelete className="iconndelete" />
              <p>Do you want to delete?</p>
            </div>
            <div className="btn_ok_on">
              <button onClick={closeConfirmationPopup} className="btn_on">
                No
              </button>
              <button
                onClick={() => {
                  DeleteUser(userDetail.reg_id);
                }}
                className="btn_yes"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
