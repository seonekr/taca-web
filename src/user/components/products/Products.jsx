import React from "react";
import "./products.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [value, setValue] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (value === "higher") {
      HigherProducts();
    } else if (value === "lower") {
      LowerProducts();
    } else if (value === "new") {
      NewProducts();
    } else if (value === "popular") {
      PopularProducts();
    } else {
      AllProducts();
    }
  }, [value]);

  const AllProducts = () => {
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
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const HigherProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/higherPriceProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const LowerProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/lowerPriceProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const NewProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(import.meta.env.VITE_API + "/newProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const PopularProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/popularProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
        } else {
          setError(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // Display is limited to 8 products
  const displayedProducts = products.slice(0, displayCount);

  // Handle product
  const handleProduct = (id) => {
    navigate("/productdetails/" + id);
  };

  return (
    <>
      <Header />
      <div className="container_home">
        <div className="content_itemBox">
          <div className="container_product">
            <h3 className="htxthead">
              <span className="spennofStyle"></span>Product
            </h3>
            <form className="box_Filterseach_home">
              <label>Select Filter</label>
              <select
                className="categoryFilter"
                onClick={(event) => setValue(event.target.value)}
                defaultValue={value}
              >
                <option value="all">All Product</option>
                <option value="higher">Higher Price</option>
                <option value="lower">Lower Price</option>
                <option value="new">New Products</option>
                <option value="popular">Popular Products</option>
              </select>
            </form>
          </div>
          <div className="contentImageProducts">
            {displayedProducts.map((product, index) => (
              <div key={index}>
                <div
                  className="group_itemBox"
                  onClick={() => handleProduct(product.id)}
                >
                  <div className="img">
                    <img
                      src={
                        import.meta.env.VITE_API +
                        "/uploads/images/" +
                        product.image
                      }
                      alt="img"
                    />
                  </div>
                  <div className="txtOFproduct">
                    <h4>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                      />
                    </h4>
                    <p>
                      <input
                        className="priceProduct"
                        type="text"
                        value={product.price}
                        onChange={(e) => handleInputChange(e, index, "price")}
                      />
                    </p>
                    <p className="txtP_width">
                      <input
                        type="text"
                        value={product.description}
                        onChange={(e) =>
                          handleInputChange(e, index, "description")
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Products;
