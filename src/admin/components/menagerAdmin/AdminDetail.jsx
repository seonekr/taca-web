import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import "./addAmin.css";


const AdminDetail = () => {
  const userID = localStorage.getItem("userID");
  // For delete User
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarnung] = useState("");

  const openConfirmationPopup = (id) => {
    setDeleteAdminId(id);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setDeleteAdminId(null);
    setConfirmationPopupOpen(false);
  };

  const DeleteAdmin = (id) => {
    if (id === Number(userID)) {
      setWarnung("Can't delete current user login!");
      console.log(warning);
      closeConfirmationPopup();
    } else {
      console.log("Deleted");
      // console.log("Deleted success!!" + id)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(import.meta.env.VITE_API + "/deleteAdmin/" + id, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.Status === "Success") {
            setSuccess(result.Status);
            navigate("/admins");
          } else {
            setError(result.Error);
          }
        })
        .catch((error) => console.log("error", error));
      closeConfirmationPopup();
    }
  };

  const EditAdmin = (id) => {
    navigate("/admin/edit/" + id);
  };

  // For get user by id
  const [adminDetail, setAdminDetail] = useState([]);
  const { id } = useParams();

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
          setAdminDetail(result.Result[0]);
          console.log(adminDetail);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

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
          <form>
            <div className="addAdminForm">
              <div className="del-update">
                <div
                  className="del"
                  onClick={() => {
                    openConfirmationPopup(adminDetail.reg_id);
                  }}
                >
                  <AiOutlineDelete />
                </div>
                <div
                  className="update upd"
                  onClick={() => EditAdmin(adminDetail.reg_id)}
                >
                  <Link>
                    <MdOutlineEdit className="iconcoloredite" />
                  </Link>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User ID:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{adminDetail.fname} {adminDetail.lname}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">User Name:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>{adminDetail.fname} {adminDetail.lname}</p>
                  </div>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">Email:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <div className="input">
                    <p>{adminDetail.fname} {adminDetail.lname}</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">Phone number:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <div className="input">
                    <p>{adminDetail.fname} {adminDetail.lname}</p>
                  </div>
                </div>

              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">Profile image:</label>
                <div className="BorderinputThenImage">
                  <div className="input">
                    <img
                      src={`../../../../public/images/${adminDetail.profile_image}`}
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
                  DeleteAdmin(adminDetail.reg_id);
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

export default AdminDetail;
