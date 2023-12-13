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
    navigate("/cart/payment");
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

  // Confirm transfer Choose image
  const [mainImage, setMainImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file)); // Use createObjectURL directly
    }
  };

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
              <div className="detailsProductInPayMentBox">
                <h3>Details</h3>

                <div className="paymentbill">
                  <table className="group_tble">
                    <thead className="theaed_tble">
                      <tr className="tr_txt">
                        <th>Product Name</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Product Counts</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody className="tbody_tble">
                      <tr className="tr_txt">
                        <td>Pro0</td>
                        <td>L</td>
                        <td>red</td>
                        <td>3</td>
                        <td>1500</td>
                      </tr>
                      <tr className="tr_txt">
                        <td>Pro01</td>
                        <td>L</td>
                        <td>red</td>
                        <td>3</td>
                        <td>150</td>
                      </tr>
                      <tr className="tr_txt">
                        <td>Pro01</td>
                        <td>L</td>
                        <td>red</td>
                        <td>3</td>
                        <td>150</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="hr" />
                  <div className="payment_total_Price">
                    <h3>Total:</h3>
                    <p>450</p>
                  </div>
                </div>
              </div>
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
                    <label htmlFor="onePay">BcelOne</label>
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

              <div className="box_description">
                <h3>Confirm transfer</h3>
                <div className="image_confirm_transfer">
                  <label htmlFor="img">
                    {mainImage ? (
                      <img src={mainImage} alt="Main Product" />
                    ) : (
                      <p>Choose image</p>
                    )}
                    <input type="file" id="img" onChange={handleImage} />
                  </label>

                </div>
              </div>

              <div className="save">
                <Link to="/cart/successfulBuy/">
                <button
                  // type="submit"
                  // disabled={
                  //   !selectedOption ||
                  //   address == 0 ||
                  //   (products == 0 && productsCart == 0)
                  // }
                >
                  Confirm
                </button>
                {/* The button will show when user input information */}
                </Link>
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
