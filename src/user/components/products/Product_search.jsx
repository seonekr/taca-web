import React from "react";
import "./product_search.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product_search = () => {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilter, setSelectedFilter] = useState("default");
  const [displayCount, setDisplayCount] = useState(8);
  const [showButton, setShowButton] = useState(true);

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

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle inputChange
  // Function to handle the filter change
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    switch (selectedValue) {
      case "higherPrice":
        filterByHigherPrice();
        break;
      case "lowerPrice":
        filterByLowerPrice();
        break;
      case "newProducts":
        filterByNewProducts();
        break;
      case "popularProducts":
        filterByPopularProducts();
        break;
      default:
        setFilteredProducts(products);
    }
  };

  // Function to filter products by higher price
  const filterByHigherPrice = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedProducts);
  };

  // Function to filter products by lower price
  const filterByLowerPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedProducts);
  };

  // Function to filter products by new products (assuming newer products have higher productID)
  const filterByNewProducts = () => {
    const sortedProducts = [...products].sort(
      (a, b) => b.productID - a.productID
    );
    setFilteredProducts(sortedProducts);
  };

  // Function to filter products by popularity (you can customize the popularity criteria)
  const filterByPopularProducts = () => {
    // Implement your popularity criteria here
    // For simplicity, let's assume popularity is based on productID
    const sortedProducts = [...products].sort(
      (a, b) => b.productID - a.productID
    );
    setFilteredProducts(sortedProducts);
  };

  const displayedProducts = filteredProducts.slice(0, displayCount);
  // Read more
  const handleViewMore = () => {
    setDisplayCount(products.length);
    setShowButton(false);
  };

  console.log(displayedProducts);

  // Get send ID
  const navigate = useNavigate();

  // Handle product
  const handleProduct = (id) => {
    navigate("/productdetails/" + id);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
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
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <option value="default">All Product</option>
                <option value="higherPrice">Higher Price</option>
                <option value="lowerPrice">Lower Price</option>
                <option value="newProducts">New Products</option>
                <option value="popularProducts">Popular Products</option>
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
        <div className="btn_more">
          {showButton && filteredProducts.length > displayCount && (
            <button className="btnViewProduct" onClick={handleViewMore}>
              View More
            </button>
          )}
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Product_search;
