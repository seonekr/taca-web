import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from "react-icons/io";
function ProductDetails() {
  // For authenticate user if user didn't login, So thay can't go to see the product details
  const token = localStorage.getItem("token");
  const accountID = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/authen", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          if (result.decoded.urole !== "Customer") {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate("/");
            return;
          }
        } else {
          localStorage.removeItem("userID");
          navigate("/login");
          return;
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  // const [customer, setCustomer] = useState("");
  const allSizes = ["S", "M", "L", "XL"];

  // Prepare for Customer is order product
  const customerID = accountID;
  const productID = id;
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (event) => {
    const { id } = event.target;
    setColor(id);
  };

  const handleSizeChange = (event) => {
    const { id } = event.target;
    setSize(id);
  };

  useEffect(() => {
    GetProductByID();
  }, []);

  // For get product by id
  const GetProductByID = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getProduct/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProduct(result.Result[0]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // ======================================================================>>
  // ======================================================================>>
  // ======================================================================>>

  // const [productCounts, setProductCounts] = useState(1);
  const decrementValue = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementValue = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setQuantity(newValue);
    }
  };

  // Handle submitted
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [slideIndex, setSlideIndex] = useState(1);
  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(9);

  const slideRef = useRef();

  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childrenElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childrenElementCount;
    setWidth(width);
  }, []);

  function plusSlides(n) {
    showSlides(slideIndex + n);
  }

  function showSlides(n) {
    const currentProduct = filteredProducts[0]; // Assuming there's only one product in the array

    if (n > currentProduct.images.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(currentProduct.images.length);
    } else {
      setSlideIndex(n);
    }
  }
  //Drag
  function dragStart(e) {
    setStart(e.clientX);
  }
  function dragOver(e) {
    let touch = e.clientX;
    setChange(start - touch);
  }
  function dragEnd(e) {
    if (change > 0) {
      slideRef.current.scrollLeft += width;
    } else {
      slideRef.current.scrollLeft -= width;
    }
  }

  useEffect(() => {
    if (!slideRef.current || !width) return;
    let numOfThumb = Math.round(slideRef.current.offsetWidth / width);
    slideRef.current.scrollLeft =
      slideIndex > numOfThumb ? (slideIndex - 1) * width : 0;
  }, [width, slideIndex]);

  const handleBuyNow = () => {
    navigate("/payment");
  };

  const handleAddToCart = () => {
    if (
      customerID != "" &&
      productID != "" &&
      size != "" &&
      color != "" &&
      quantity != ""
    ) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        cust_id: customerID,
        prod_id: productID,
        size: size,
        color: color,
        quantity: quantity,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(import.meta.env.VITE_API + "/addToCart", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result.Status))
        .catch((error) => console.log("error", error));
    } else {
      console.log("Please fill all the blank!");
    }
  };

  console.log(accountID, productID, size, color, quantity)
  // console.log(productID)
  // console.log(size)
  // console.log(color)
  // console.log(quantity)


  return (
    <>
      <Header />

      <div className="contentBody">
        <Link to="/product_search" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>Back</p>
        </Link>
        <div>
          <div className="boxProduct_deteils">
            <div className="slider">
              <React.Fragment>
                <section className="product_details">
                  <div className="product-page-img">
                    {JSON.stringify(product.gallery)
                      ? JSON.parse(product.gallery).map((image, index) => (
                        <div
                          key={index}
                          className="myslides"
                          style={{
                            display:
                              index + 1 === slideIndex ? "block" : "none",
                          }}
                        >
                          <img
                              key={image}
                              src={
                                import.meta.env.VITE_API +
                                "/uploads/images/" +
                                image
                              }
                              alt="Additional Image"
                            />
                        </div>
                      ))
                      : null}

                    <div
                      className="slider_img"
                      draggable={true}
                      ref={slideRef}
                      onDragStart={dragStart}
                      onDragOver={dragOver}
                      onDragEnd={dragEnd}
                    >
                      {JSON.stringify(product.gallery)
                        ? JSON.parse(product.gallery).map((image, index) => (
                          <div
                            key={index}
                            className={`slider-box ${index + 1 === slideIndex && "active"
                              }`}
                            onClick={() => setSlideIndex(index + 1)}
                          >
                            <img
                              src={
                                import.meta.env.VITE_API +
                                "/uploads/images/" +
                                image
                              }
                              alt=""
                            />
                          </div>
                        ))
                        : null}
                    </div>
                  </div>
                </section>
              </React.Fragment>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="txtContentproduct">
                <h1 className="txt_nameP">{product.name}</h1>
                <p className="money_txt">{product.price}</p>
                <p className="txt_description">{product.description}</p>

                <div className="hr">
                  <hr />
                </div>

                {/* Checked colors */}
                <div className="color_product">
                  {JSON.stringify(product.colors)
                    ? JSON.parse(product.colors).map((e, index) => (
                      <div key={index}>
                        <label htmlFor={e}>{e}</label>
                        <input
                          className="echColor"
                          type="radio"
                          id={e}
                          checked={e === color}
                          onChange={handleColorChange}
                        />
                      </div>
                    ))
                    : null}
                </div>

                <div className="size_product">
                  <p>Size:</p>
                  {allSizes.map((e, index) => (
                    <div key={index}>
                      <label htmlFor={e}>{e}</label>
                      <input
                        className="echColor"
                        type="radio"
                        id={e}
                        checked={e === size}
                        onChange={handleSizeChange}
                      />
                    </div>
                  ))}
                </div>

                {/* Amount product */}
                <div className="container_item_icon">
                  <div
                    className="container_minus_plus"
                    onClick={decrementValue}
                  >
                    -
                  </div>
                  <span>
                    <input
                      type="text"
                      value={quantity}
                      onChange={handleChange}
                    />
                  </span>
                  <div
                    className="container_minus_plus"
                    onClick={incrementValue}
                  >
                    +
                  </div>
                </div>
                <div className="Count_product">
                  <button
                    type="submit"
                    className="echbtn btnBut"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                  <button
                    type="submit"
                    className="echbtn btnAdd"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="description_container">
            <img
              src={
                import.meta.env.VITE_API + "/uploads/images/" + product.image
              }
              alt="img"
            />
          </div>
        </div>
      </div>

      <Menu />
    </>
  );
}

export default ProductDetails;
