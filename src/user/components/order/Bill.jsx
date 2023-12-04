import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import "./bill.css";
const Bill = () => {
  // Orders
  const [orders, setOrders] = useState([
    {
      orderID: 1,
      userID: 2,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          size: "m",
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Houngaloun",
    },
    {
      orderID: 2,
      userID: 1,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro2",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colW",
          size: "l",
        },

        {
          productID: 3,
          productName: "pro3",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "xl",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Anousit",
    },
    {
      orderID: 3,
      userID: 1,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Houngaloun",
    },
    {
      orderID: 4,
      userID: 3,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Anousit",
    },
  ]);

  // users
  const [users, setUsers] = useState([
    { userID: 1, name: "John Doe", email: "john@gmail.com" },
    { userID: 2, name: "Sam", email: "sam@gmail.com" },
    { userID: 3, name: "Will", email: "wil@gmail.com" },
  ]);

  // Get order ID
  const location = useLocation();
  const { id } = location.state;
  const [getId, setGetId] = useState(id);

  const filteredOrders = orders
    .filter((order) => order.orderID === getId) // Filter orders by userID = 2 (Sam)
    .map((order) => {
      const user = users.find((user) => user.userID === order.userID); // Find user details for the order

      // Calculate total price
      const totalPrice = order.products.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0);

      return {
        orderID: order.orderID,
        userID: order.userID,
        userName: user.name,
        products: order.products,
        orderDate: order.orderDate,
        status: order.status,
        payment: order.payment,
        delivery: order.delivery,
        totalPrice: totalPrice,
      };
    });

  return (
    <>
      <Header></Header>
      <section id="bill">
        <Link to="/order" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>Back</p>
        </Link>
        {filteredOrders.map((order) => (
          <div className="bill-detial newspanBox" key={order.orderID}>
            <div className="guopoidHead">
              <div className="idf">
                <p>OrderID: {order.orderID}</p>
                <p>UserID: {order.userID}</p>
                <p>Name: {order.userName}</p>
              </div>
            </div>
            <hr />
            <div className="billGopBox">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Color</th>
                    <th>Size</th>
                  </tr>
                </thead>
                {order.products.map((product) => (
                  <tbody key={product.productID}>
                    <tr>
                      <td>{product.productName}</td>
                      <td>${product.price}</td>
                      <td>{product.amount}</td>
                      <td>{product.color}</td>
                      <td>{product.size}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <hr />
            <div className="titlePrice">
              <p>Total:</p>
              <p>${order.totalPrice}</p>
            </div>
            <div className="place-on">
              <p>Place on: {order.orderDate}</p>
              <p>Payment method: {order.payment}</p>
              <p>Status: {order.status}</p>
              <p>Delivery: {order.delivery}</p>
            </div>
          </div>
        ))}
      </section>
      <Menu />
    </>
  );
};

export default Bill;
