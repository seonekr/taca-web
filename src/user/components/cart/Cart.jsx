import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import acer from "../../../img/acer.png";
import Header from "../header/Header";
import Menu from "../menu/Menu";

import "./cart.css";

const Cart = () => {
  // For authenticate user if user didn't login, So thay can't go to see the product details
  const token = localStorage.getItem("token");
  const accountID = localStorage.getItem("userID");
  const [customer, setCustomer] = useState("");
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AuthenUser();
    GetCustomerByID();
    GetCartByCustomerByID();
    // GetProductByID();
  }, []);
  // For authen user
  const AuthenUser = () => {
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
  };
  // For get customer by id
  const GetCustomerByID = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_API + "/getCustomer/" + accountID,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setCustomer(result.Result[0]);
        }
      })
      .catch((error) => console.log("error", error));
  };
  // For get cart by customer ID
  const GetCartByCustomerByID = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_API + "/getProductsInCart/" + customer.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);

          // // For get customer by id
          // const GetProductByID = () => {
          //   var myHeaders = new Headers();
          //   myHeaders.append("Content-Type", "application/json");

          //   var requestOptions = {
          //     method: "GET",
          //     headers: myHeaders,
          //     redirect: "follow",
          //   };

          //   fetch(import.meta.env.VITE_API + "/getProduct/" + 4, requestOptions)
          //     .then((response) => response.json())
          //     .then((result) => {
          //       if (result.Status === "Success") {
          //         setProductDetail(result.Result[0]);
          //         console.log(productDetail);
          //       }
          //     })
          //     .catch((error) => console.log("error", error));
          // };
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [price, setPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [productCounts, setProductCounts] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.productID]: 1 }), {})
  );

  useEffect(() => {
    const totalPrice = products.reduce(
      (accumulator, product) =>
        accumulator + product.price * (productCounts[product.productID] || 0),
      0
    );
    const shipping = 0;
    const grandTotal = totalPrice + shipping;

    setPrice(totalPrice);
    setShipping(shipping);
    setGrandTotal(grandTotal);
  }, [products, productCounts]);

  const handleInputChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  const incrementCount = (productID) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: (prevCounts[productID] || 0) + 1,
    }));
  };

  const decrementCount = (productID) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: Math.max(0, (prevCounts[productID] || 0) - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProducts([]);
    setPrice("");
    setShipping("");
    setGrandTotal("");
    const selectedProducts = products.map((product) => ({
      productID: product.productID,
      productName: product.productName,
      color: product.colorName,
      price: product.price,
      size: product.size,
      productCounts: productCounts[product.productID] || 0,
      totalPrice: grandTotal,
    }));

    // Submit the selected products with userID
    // Send to checkout
    navigate("/cart/payment/", {
      state: {
        productsCart: selectedProducts,
      },
    });
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="box_container_cart">
          <div className="display_products">
            {products.map((product, index) => (
              <div className="container_cart_item" key={index}>
                <div className="box_item_image">
                  {/* <img src={product.images[0]} alt="img"></img> */}
                  <div className="box_item_text">
                    <input
                      type="text"
                      value={product.prod_id}
                      onChange={(e) => handleInputChange(e, index, "name")}
                      className="name"
                    />
                    <input
                      type="text"
                      value={product.size}
                      className="description"
                    />
                    <input type="text" value={product.color} />
                  </div>
                </div>
                <div className="box_item_icon">
                  <div
                    className="icon_minus_plus"
                    onClick={() => decrementCount(product.id)}
                  >
                    -
                  </div>
                  <span>
                    <input
                      type="text"
                      value={productCounts[product.id] || 0}
                      onChange={() => {}}
                    />
                  </span>
                  <div
                    className="icon_minus_plus"
                    onClick={() => incrementCount(product.id)}
                  >
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {products.length > 0 ? (
          <div className="box_item_total">
            <h1>Cart Total</h1>
            <div className="box_item_total_text">
              <p>Subtotal:</p>
              <p>
                <input type="text" value={"$ " + price} onChange={() => {}} />
              </p>
            </div>
            <hr />
            <div className="box_item_total_text">
              <p>Shipping: </p>
              <p>
                <input
                  type="text"
                  value={"$ " + shipping}
                  onChange={() => {}}
                />
              </p>
            </div>
            <hr />
            <div className="box_item_total_text">
              <h3>Total: </h3>
              <p>
                <input
                  type="text"
                  value={"$ " + grandTotal}
                  onChange={() => {}}
                />
              </p>
            </div>
            <div className="btn">
              <Link to="/product_search" className="Continues_btn">
                Continues Shopping
              </Link>
              <button type="submit" className="checkout_btn">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="cart">Your cart is empty</p>
        )}
      </form>
      <Menu />
    </>
  );
};

export default Cart;
