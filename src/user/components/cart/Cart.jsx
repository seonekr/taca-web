import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import acer from "../../../img/acer.png";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { AiOutlineDelete } from "react-icons/ai";

import "./cart.css";

const Cart = () => {
  // For authenticate user if user didn't login, So thay can't go to see the product details
  const token = localStorage.getItem("token");
  const accountID = localStorage.getItem("userID");
  const [products, setProducts] = useState([]);

  const [productCounts, setProductCounts] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.productID]: 1 }), {})
  );

  const navigate = useNavigate();

  useEffect(() => {
    AuthenUser();
    GetCartByCustomerByID();
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
      import.meta.env.VITE_API + "/getProductsInCart/" + accountID,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProducts(result.Result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  console.log(products);

  const handleInputChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  const incrementCount = (productID, quantity) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: (prevCounts[productID] || quantity) + 1,
    }));
  };

  const decrementCount = (productID, quantity) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: Math.max(1, (prevCounts[productID] || quantity) - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProducts([]);
    setPrice("");
    setShipping("");
    const selectedProducts = products.map((product) => ({
      productID: product.productID,
      productName: product.productName,
      color: product.colorName,
      price: product.price,
      size: product.size,
      productCounts: productCounts[product.productID] || 0,
    }));

    // Submit the selected products with userID
    // Send to checkout
    navigate("/cart/payment/", {
      state: {
        productsCart: selectedProducts,
      },
    });
  };

  const DeleteProductInCartByID = (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/deleteProductInCart/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          console.log(result.Status);
          navigate("/cart");
        } else {
          console.log(result.Error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleCheckout = () => {
    navigate("/payment");
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
                  <img
                    src={
                      import.meta.env.VITE_API +
                      "/uploads/images/" +
                      product.image
                    }
                    alt="img"
                  ></img>
                  <div className="box_item_text">
                    <p>{product.name}</p>
                    <p>{product.size}</p>
                    <p>{product.color}</p>
                    <p>{product.price}</p>
                  </div>
                </div>
                <div className="box_icon_order">
                  <div
                    className="btnicon_delete_order"
                    onClick={() => {
                      DeleteProductInCartByID(product.id);
                    }}
                  >
                    <AiOutlineDelete id="btnicon_delete" />
                  </div>
                  <div className="box_item_icon">
                    <div
                      className="icon_minus_plus"
                      onClick={() =>
                        decrementCount(product.id, product.quantity)
                      }
                    >
                      -
                    </div>
                    <span>
                      <input
                        type="text"
                        value={productCounts[product.id] || product.quantity}
                      />
                    </span>
                    <div
                      className="icon_minus_plus"
                      onClick={() =>
                        incrementCount(product.id, product.quantity)
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {products.length > 0 ? (
          <div className="box_item_total">
            <div className="btn">
              <Link to="/product_search" className="Continues_btn">
                Continues Shopping
              </Link>
              <button
                type="submit"
                className="checkout_btn"
                onClick={handleCheckout}
              >
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
