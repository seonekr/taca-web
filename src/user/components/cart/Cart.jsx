import React, { useState } from 'react';
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import acer from '../../../img/acer.png'
import './cart.css';
import { IoIosArrowBack } from 'react-icons/io';

const Cart = () => {

    const [value, setValue] = useState(0);

    const incrementValue = () => {
        setValue(value + 1);
    };

    const decrementValue = () => {
        setValue(value - 1);
    };

  return (
    <>
    <Header/>
    <div  className='box_container_cart'>
        
        <div className='container_cart_item'>
            <Link to="/" className='box_icons_back'>
                <IoIosArrowBack id="icons_back"/>
                <p>Back</p>
            </Link>
            <div className='box_item'>
                <div className="box_item_image">
                    <img src={acer} alt='img'></img>
                    <div className='box_item_text'>
                        <h2>Acer Swift 5</h2>
                        <p>RAM...</p>
                        <p>$800.00</p>
                    </div>
                </div>
                
                <div className='box_item_icon'>
                    <Link className="icon_minus_plus" onClick={decrementValue}>-</Link>
                    <span>{value}</span>
                    <Link className="icon_minus_plus" onClick={incrementValue}>+</Link>
                </div>
            </div>
            <div className='box_item'>
                <div className="box_item_image">
                    <img src={acer} alt='img'></img>
                    <div className='box_item_text'>
                        <h2>Acer Swift 5</h2>
                        <p>RAM...</p>
                        <p>$800.00</p>
                    </div>
                </div>
                
                <div className='box_item_icon'>
                    <Link className="icon_minus_plus" onClick={decrementValue}>-</Link>
                    <span>{value}</span>
                    <Link className="icon_minus_plus" onClick={incrementValue}>+</Link>
                </div>
            </div>
            <div className='box_item'>
                <div className="box_item_image">
                    <img src={acer} alt='img'></img>
                    <div className='box_item_text'>
                        <h2>Acer Swift 5</h2>
                        <p>RAM...</p>
                        <p>$800.00</p>
                    </div>
                </div>
                
                <div className='box_item_icon'>
                    <Link className="icon_minus_plus" onClick={decrementValue}>-</Link>
                    <span>{value}</span>
                    <Link className="icon_minus_plus" onClick={incrementValue}>+</Link>
                </div>
            </div>

        </div>
        <div className='box_item_total'>
            <h1>Cart Total</h1>
            <div className='box_item_total_text'>
                <p>Subtotal: </p>
                <p>$400.00</p>
            </div>
            <hr/>
            <div className='box_item_total_text'>
                <p>Shopping: </p>
                <p>Free</p>
            </div>
            <hr/>
            <div className='box_item_total_text'>
                <h3>Total: </h3>
                <p>$400.00</p>
            </div>


            <div className='btn'>
                <Link to="/product_search/" className="Continues_btn">Continues Shopping</Link>
                <Link to="/cart/payment/" className="checkout_btn">Checkout</Link>
            </div>
                
        </div>
    </div>
    <Menu/>
    </>
  )
}

export default Cart