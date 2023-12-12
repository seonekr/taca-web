import "./productHome.css";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductHome = () => {
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
              <select
                className="filter_priceProduct"
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
            <box-icon name="filter"></box-icon>
          </div>
        </div>

        <div className="product-area">
          {displayedProducts.map((product, index) => (
            <div className="box-product" key={index}>
              <div onClick={() => handleProduct(product.id)}>
                <div className="img">
                  <img
                    src={
                      import.meta.env.VITE_API +
                      "/uploads/images/" +
                      product.image
                    }
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
      </section>
    </div>
  );
};

export default ProductHome;
