import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import user from "../../../img/user.png";

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

    fetch("http://localhost:5000/getAdmin/" + id, requestOptions)
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
      <section id="user">
        <div className="back">
          <Link to="/admins" className="link-back">
            <FaAngleLeft />
            Back
          </Link>
          <div>Admin</div>
        </div>
        <div className="userInfo">
          <div className="info">
            <div>User ID: {adminDetail.id}</div>
            <div>
              User Name: {adminDetail.fname} {adminDetail.lname}
            </div>
            <div>User Email: {adminDetail.email}</div>
            <div>User Phone number: {adminDetail.tel}</div>
            <div>Password: ********</div>
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
          </div>
          <div className="img">
            <img
              src={`../../../../public/images/${adminDetail.profile_image}`}
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
                DeleteAdmin(adminDetail.reg_id);
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

export default AdminDetail;
