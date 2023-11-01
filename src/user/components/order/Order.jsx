import React from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import './order.css'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import Header from '../header/Header';

const Order = () => {
    
    return (
        <>
            <Header/>
            <section id='container_order_item'>
                <div className="account-navbar">
                    <div className="header-box"><Link to="/" className='guopIconbAck'><FaAngleLeft className='iconnBack'/>Back</Link></div>
                    <h3 className="header-box ">Orders</h3>
                    <div className="header-box"></div>
                </div>
                <div className='container_order_all'>
                    <Link to="/order/bill" className='box_item_order'>
                        <div className='box_item_order_text'>
                            <p>No1</p>
                            <p className='txtheadeproductorder'>Acer Swift 5, Acer Swift 5, Acer Swift 5</p>
                            <p>3/4/2023 1:32</p>
                        </div>
                    </Link>
                    <Link to="/order/bill" className='box_item_order'>
                        <div className='box_item_order_text'>
                            <p>No2</p>
                            <p className='txtheadeproductorder'>Acer Swift 5, Acer Swift 5, Acer Swift 5</p>
                            <p>3/4/2023 1:32</p>
                        </div>
                    </Link>
                </div>
            </section>
            <Menu />
        </>
    )
}

export default Order