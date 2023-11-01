import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './productBuy.css';
import acer1 from "/acer1.jpg";
import acer2 from "/acer2.jpg";
import acer3 from "/acer3.jpg";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from 'react-icons/io';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';

function ProductDetails() {
  const [slides, setSlides] = useState([acer1, acer2, acer3]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState("right");

  const handlePrevSlide = () => {
    setDirection("left");
    setActiveSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
  };

  const handleNextSlide = () => {
    setDirection("right");
    setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeSlide]);



  // ============ Add to cart =============



  /*============== minus_plus ============= */

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
      
        <div className="contentBody">
          <Link to="/product_search/" className='box_container_back_icons_back'>
            <IoIosArrowBack id="icons_back"/>
            <p>Back</p>
          </Link>
          <div className="boxProduct_deteils">
            
            <div className="slider">
              <div className={`slide ${direction}`} style={{ backgroundImage: `url(${slides[activeSlide]})` }}></div>
              <div className="navigation but1">
                <div className="nav-btn " onClick={handlePrevSlide}>&#8249;</div>
              </div>
              <div className="navigation but2">
                <div className="nav-btn " onClick={handleNextSlide}>&#8250;</div>
              </div>
            </div>

            <div className="txtContentproduct">
              <h1 className="txt_nameP">Havic HV G-92 Gamepad</h1>
              <p className='money_txt'>$192.00</p>
              <div className="startBox">
                <div className='sartBox_icon'>
                  <AiFillStar id="icon_stars"/>
                  <AiFillStar id="icon_stars"/>
                  <AiFillStar id="icon_stars"/>
                  <AiFillStar id="icon_stars"/>
                  <AiOutlineStar id="icon_star"/>
                </div>

                <div>
                  <p>( 150 Reviews )</p>
                </div>
              </div>
              <p className='txt_description'> Hello PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>
              <div className="hr"><hr/></div>
              <div className="color_product">
                <p>Color:</p>
                <div className="echColor colB"></div>
                <div className="echColor colW"></div>
                <div className="echColor colBlue"></div>
              </div>

              <div className="size_product">
                <p>Size:</p>
                <div className="echSize">S</div>
                <div className="echSize">M</div>
                <div className="echSize">L</div>
                <div className="echSize">XL</div>
              </div>

              <div className='container_item_icon'>
                <div className="container_minus_plus" onClick={decrementValue}>-</div>
                <span>{parseInt(value)}</span>
                <div className="container_minus_plus" onClick={incrementValue}>+</div>
              </div>

              <div className="Count_product">
                  <Link to="/cart/payment" className="echbtn btnBut">Buy Now</Link>
                  <Link to="#" className="echbtn btnAdd">Add To Cart</Link>
              </div>
            </div>
          </div>
        </div>

      
      <Menu/>
    </>
  )
}

export default ProductDetails