import React from 'react'
import "./orderpage.css"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import AdminMenu from '../adminMenu/AdminMenu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    //OrderPage
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

    // Get order ID
    const [id, setId] = useState();
    const navigate = useNavigate();

    const handleOrder = (id) => {
        setId(id);
        navigate("/orderbill/", { state: { id: id } });
    };


    return (
        <>
            <AdminMenu />
            <section id='menager'>
                <div className='container_box_orderpage'>
                    <h2>Order</h2>
                    {orders.map((order) => (
                        <div key={order.orderID}>
                            <form className='box_users_order'>
                                <div className='box_order_text'>
                                    <p>No: {order.orderID}</p>
                                    <div className='container_chat_name'>
                                        {order.products.slice(0, 2).map((product, index) => (
                                            <span key={product.productID}>
                                                {product.productName}
                                                {index === 0 && order.products.length > 1
                                                ? ", "
                                                : " ..."}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='box_container_time'>
                                    <p>{order.orderDate}</p>
                                </div>
                                <div className='container_order_icon'>
                                    <div className='btn_pending'>
                                        Pending
                                    </div>
                                    <button className='btn_view' onClick={() => handleOrder(order.orderID)}>
                                        View
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                    <div className='box_next_order'>
                      <button className='box_prev_next_order'>
                        <AiOutlineLeft id="box_prev_next_icon" />
                        <p>Prev</p>
                      </button>
                      <div className='box_num_order'>
                        <p className='num_admin'>1</p>
                        <p className='num_admin'>2</p>
                        <p className='num_admin'>3</p>
                      </div>
                      <button className='box_prev_nexts_order'>
                        <p>Next</p>
                        <AiOutlineRight id="box_prev_next_icon" />
                      </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderPage