import "./product.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminMenu from "../adminMenu/AdminMenu";
import { BiPlus } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const product_Admin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // prev next button user in react
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredProducts.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredProducts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // Delete product
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const openConfirmationPopup = (id) => {
    setDeleteProductId(id);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setDeleteProductId(null);
    setConfirmationPopupOpen(false);
  };

  useEffect((event) => {
    Showproducts();
  }, []);

  const Showproducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/allProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
          setFilteredProducts(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const DeleteProduct = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/deleteProduct/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setSuccess(result.Status);
          navigate("/products");
        } else {
          setError(result.Error);
          navigate("/products");
        }
      })
      .catch((error) => console.log("error", error));

    closeConfirmationPopup();
  };

  // Send ID product for update
  const navigate = useNavigate();
  // Update products
  const handleUpdate = (id) => {
    navigate("/product/edit/" + id);
  };

  // Function to handle search by product name
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <AdminMenu />
      <section id="product_admin">
        <div className="container_body_admin_product">
          <div className="search-box_product">
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <IoSearchOutline onClick={handleSearch} />
            </button>
          </div>

          <div className="productHead_content">
            <h1 className="htxthead">
              <span className="spennofStyleadmin"></span>Products
            </h1>
            <div className="categoryBoxfiler">
              <Link to="/product/add" className="box_add_product">
                <BiPlus id="icon_add_product" />
                <p>Add Product</p>
              </Link>
            </div>
          </div>

          <div className="product-area">
            {records.length >= 1 ? (
              records.map((product, index) => (
                <div className="box-product" key={index}>
                  <div>
                    <img
                      src={
                        import.meta.env.VITE_API +
                        "/uploads/images/" +
                        product.image
                      }
                      alt="image"
                    />
                  </div>
                  <ul className="txtOFproduct">
                    <li>{product.name}</li>
                    <li>{product.description}</li>
                    <li>{product.price}</li>
                    <div className="box_btn_edit_delete">
                      <button
                        className="btn_icon_delete_user"
                        onClick={() => openConfirmationPopup(product.id)}
                      >
                        <AiOutlineDelete id="btn_icon_edit" />
                      </button>
                      <div
                        className="btn_icon_edit_user"
                        onClick={() => handleUpdate(product.id)}
                      >
                        <MdOutlineEdit id="btn_icon_edit" />
                      </div>
                    </div>
                  </ul>
                </div>
              ))
            ) : (
              <p>No Product!</p>
            )}

          </div>

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
      </section>
      {isConfirmationPopupOpen && (
        <div className="boxAlertDelete">
          <div className="confirmation-popup">
            <p>Do you want to delete?</p>
            <div className="btn_ok_on">
              <button onClick={closeConfirmationPopup} className="btn_on">
                No
              </button>
              <button
                onClick={() => {
                  DeleteProduct(deleteProductId);
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

export default product_Admin;
