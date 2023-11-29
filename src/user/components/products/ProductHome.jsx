import "./productHome.css";
import dress from "../../../img/dress.png";
import image1 from "../../../img/image1.png";
import Header from "../header/Header";
import acer from "../../../img/acer.png";
import productImage from "../../../img/productImage.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

    fetch("http://localhost:5000/allProducts", requestOptions)
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

  const displayedProducts = filteredProducts.slice(0, displayCount);
  // Read more
  const handleViewMore = () => {
    setDisplayCount(30);
    setShowButton(false);
  };

  // Get send ID
  const navigate = useNavigate();

  // Handle product
  const handleProduct = (id) => {
    navigate("/productdetails/" + id);
  };

  return (
    <div>
      <Header />
      <section id="product">
        <div className="productHead_content">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>Product
          </h1>
          <div className="categoryBoxfiler">
            <form className="boxfilterseach">
              <label>Select Filter</label>
              <select className="filter_priceProduct">
                <option value="default">All Product</option>
                <option value="higherPrice">Higher Price</option>
                <option value="lowerPrice">Lower Price</option>
                <option value="newProducts">New Products</option>
                <option value="popularProducts">Popular Products</option>
              </select>
            </form>
            <box-icon name="filter"></box-icon>
          </div>
        </div>

        <div className="product-area">
          {displayedProducts.map((product, index) => (
            <div className="box-product" key={index}>
              <div onClick={() => handleProduct(product.id)}>
                <div className="img">
                  <img
                    src={"../../../../public/images/" + product.main_image_path}
                    alt="image"
                  />
                </div>
                <ul className="txtOFproduct2">
                  <li>
                    <input
                      className="name"
                      type="text"
                      value={product.name}
                      onChange={(e) => handleInputChange(e, index, "name")}
                    />
                  </li>
                  <li>
                    <input
                      className="price"
                      type="text"
                      value={product.price}
                      onChange={(e) => handleInputChange(e, index, "price")}
                    />
                  </li>
                  <li>
                    <input
                      className="desc"
                      type="text"
                      value={product.description}
                      onChange={(e) =>
                        handleInputChange(e, index, "description")
                      }
                    />
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {showButton && filteredProducts.length > displayCount && (
          <button className="btnViewProduct" onClick={handleViewMore}>
            View More
          </button>
        )}
      </section>
    </div>
  );
};

export default ProductHome;
