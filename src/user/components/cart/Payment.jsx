import { FiPlus } from "react-icons/fi";
import "./payment.css";
import qrcode from "../../../img/QRCODE.png";
import wechat from "../../../img/WeChat.png";
import Menu from "../menu/Menu";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "../header/Header";

const Payment = () => {
  // state payment method
  const [selectedOption, setSelectedOption] = useState("onePay");

  // get address state
  const location = useLocation();
  const navigate = useNavigate();

  const {
    address = [],
    products = [],
    productsCart = [],
  } = location?.state || {}; // Here mean if "empty"

  // Get date tody
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // January is month 0 in JavaScript
  const year = today.getFullYear();

  //   Get userID
  const [userID, setUserID] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateTody = `${date}/${month}/${year}`;

    console.log("payment:", selectedOption);
    console.log("address:", address.province);
    console.log("city:", address.city);
    console.log("company:", address.companny);
    console.log("branch:", address.branch);
    console.log("date:", dateTody);
    console.log("userID:", userID);

    if (products.length > 0) {
      console.log(products);
    } else if (productsCart.length > 0) {
      console.log(productsCart);
    }
    navigate("/cart/payment/");
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddAddress = () => {
    if (products.length > 0) {
      navigate("/cart/address", {
        state: {
          products,
        },
      });
    } else if (productsCart.length > 0) {
      navigate("/cart/address", {
        state: {
          productsCart,
        },
      });
    }
  };

  const totalProductPrice = () => {
    let total = 0;
    productsCart.forEach((product) => {
      total = product.totalPrice;
    });

    return total;
  };

  const totalPrice = totalProductPrice();

  return (
    <>
      <Header />
      <section id="payment">
        <div className="guopBoxPayment">
          <div className="header_box">
            <h3>Payment</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="adress-payment">
              <div className="box">
                <div className="address" onClick={handleAddAddress}>
                  <FiPlus /> Update address
                </div>
                <p>
                  {address.province} {address.city} {address.companny}{" "}
                  {address.branch}
                </p>{" "}
                {/* Get from address */}
              </div>
              {/* procuts */}
              {products.length > 0 ? (
                <div className="detailsProductInPayMentBox">
                  <h3>Details</h3>
                  <ul>
                    {products.map((product) => (
                      <li className="detailsProduct_li" key={product.productID}>
                        <div>Product ID: {product.productID}</div>
                        <div>Product Name: {product.productName}</div>
                        <div>Size: {product.size}</div>
                        <div>Color: {product.color}</div>
                        <div>Price: {product.price}</div>
                        <div>Product Counts: {product.productCounts}</div>
                        <div>
                          Have to pay: {product.productCounts * product.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              {/* Procuts Cart */}
              {productsCart.length > 0 ? (
                <div className="detailsProductInPayMentBox">
                  <ul>
                    {productsCart.map((product) => (
                      <li key={product.productID}>
                        <div>Product ID: {product.productID}</div>
                        <div>Product Name: {product.productName}</div>
                        <div>Size: {product.size}</div>
                        <div>Color: {product.color}</div>
                        <div>Price: {product.price}</div>
                        <div>Product Counts: {product.productCounts}</div>
                      </li>
                    ))}
                    <div>Have to pay: {totalPrice}</div>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}

              <div className="box">
                <div className="transfer">
                  <div className="select-option">
                    <input
                      type="radio"
                      id="onePay"
                      value="onePay"
                      checked={selectedOption === "onePay"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="onePay">Bcel One</label>
                  </div>
                  <div className="select-option">
                    <input
                      type="radio"
                      id="wechat"
                      value="wechat"
                      checked={selectedOption === "wechat"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="wechat">WeChat</label>
                  </div>
                </div>
                <div className="boxImageqr">
                  {selectedOption === "onePay" && (
                    <div className="qr">
                      <img src={qrcode} alt="" />
                    </div>
                  )}
                  {selectedOption === "wechat" && (
                    <div className="qr">
                      <img src={wechat} alt="" />
                    </div>
                  )}
                  {!selectedOption && (
                    <div className="qr">
                      <img src={qrcode} alt="" />
                    </div>
                  )}
                </div>
              </div>
              <div className="save">
                {/* <Link to="/cart/successfulBuy/"> */}
                <button
                  type="submit"
                  disabled={
                    !selectedOption ||
                    address == 0 ||
                    (products == 0 && productsCart == 0)
                  }
                >
                  Confirm
                </button>
                {/* The button will show when user input information */}
                {/* </Link>  */}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Payment;
