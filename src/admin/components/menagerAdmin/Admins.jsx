import React, { useState, useEffect } from "react";
import "./admins.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import AdminMenu from "../adminMenu/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import user from "../../../img/user.png";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // prev next button user in react
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = admins.slice(firstIndex, lastIndex);
  const npage = Math.ceil(admins.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/allAdmins", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setAdmins(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const AdminDetail = (id) => {
    navigate("/admin/detail/" + id);
    console.log(id);
  };

  return (
    <>
      <section id="menager">
        <AdminMenu />
        <div className="container_body_adminuser">
          <div className="container_box_users">
            <div className="box_users">
              <div className="box_add_admin">
                <Link to="/admin/register" className="btn_addadmin">
                  <BiPlus id="icon_add_admin" />
                  Add Admin
                </Link>
              </div>

              <form className="search">
                <div className="search-box_menageruser">
                  <input type="text" placeholder="Search ..." />
                  <button type="submit">
                    <IoSearchOutline />
                  </button>
                </div>
              </form>
            </div>

            {admins.map((e) => {
              return (
                <div
                  className="box_users_user"
                  key={e.reg_id}
                  onClick={() => {
                    AdminDetail(e.reg_id);
                  }}
                >
                  <Link className="box_user_text">
                    <img
                      src={`../../../../public/images/${e.profile_image}`}
                      alt="admin profile"
                    />

                    <div className="container_chat_name" key={e.reg_id}>
                      <p>
                        Name: {e.fname} {e.lname}
                      </p>
                      <p>Eamil: {e.email}</p>
                    </div>
                  </Link>
                </div>
              );
            })}

            <div className="box_container_next_product">
              <button className="box_prev_left_product" onClick={prePage}>
                <AiOutlineLeft id="box_icon_left_right_product" />
                <p>Prev</p>
              </button>

              <div className="box_num_product">
                {numbers.map((n, i) => (
                  <div
                    className={`page-link ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <div className="num_admin_product">
                      <p onClick={() => changeCPage(n)}>{n}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="box_prev_right_product" onClick={nextPage}>
                <p>Next</p>
                <AiOutlineRight id="box_icon_left_right_product" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCPage(userID) {
    setCurrentPage(userID);
  }
};

export default Admins;
