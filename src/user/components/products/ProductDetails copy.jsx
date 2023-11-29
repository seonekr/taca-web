import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import "./productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { objectOf } from "prop-types";
import { countBy } from "lodash";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState("");

  const handleRadioChange = (event) => {
    const {id} = event.target;
    setColor(id)
  }

  // For get user by id
  useEffect(() => {
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
  }, []);

  const handleSubmit = () => {};

  //Start image gallery
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
    if (n > product.other_images_path.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(product.other_images_path.length);
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

  return (
    <>
      <Header />

      <div className="contentBody">
        <Link to="/product_search" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>Back</p>
        </Link>
        <div key={product.id}>
          <div className="boxProduct_deteils">
            <div className="slider">
              <React.Fragment>
                <section className="product_details">
                  {/* --------------------------------------------- */}
                  <div className="product-page-img">
                    {JSON.stringify(product.other_images_path)
                      ? JSON.parse(product.other_images_path).map(
                          (image, index) => (
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
                                src={`../../../../public/images/${image}`}
                                alt="Additional Image"
                              />
                            </div>
                          )
                        )
                      : null}

                    <a className="prev" onClick={() => plusSlides(-1)}>
                      &#10094;
                    </a>
                    <a className="next" onClick={() => plusSlides(1)}>
                      &#10095;
                    </a>

                    <div
                      className="slider_img"
                      draggable={true}
                      ref={slideRef}
                      onDragStart={dragStart}
                      onDragOver={dragOver}
                      onDragEnd={dragEnd}
                    >
                      {JSON.stringify(product.other_images_path)
                        ? JSON.parse(product.other_images_path).map(
                            (image, index) => (
                              <div
                                key={index}
                                className={`slider-box ${
                                  index + 1 === slideIndex && "active"
                                }`}
                                onClick={() => setSlideIndex(index + 1)}
                              >
                                <img
                                  src={`../../../../public/images/${image}`}
                                  alt=""
                                />
                              </div>
                            )
                          )
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
                    ? JSON.parse(product.colors).map((colors, index) => (
                        <div key={index}>
                          <label htmlFor={colors}>
                            {colors}
                          </label>
                          <input
                            className="echColor"
                            type="radio"
                            id={index}
                            checked={colors === color}
                            onChange={handleRadioChange}
                          />
                        </div>
                      ))
                    : null}
                </div>

                {/* <div className="color_product">
                  {JSON.stringify((colors) => (
                    <div key={colors.colorID}>
                      <label htmlFor={colors.colorName}>
                        {colors.colorName}
                      </label>
                      <input
                        className="echColor"
                        type="radio"
                        id={colors.colorName}
                        checked={colors.colorName === color}
                        onChange={handleRadioChange}
                      />
                    </div>
                  ))}
                </div> */}

                {/* Checked sizes */}
                <div className="size_product">
                  <p>Size:</p>
                  <label htmlFor="s">S</label>
                  <input type="radio" id="s" />
                  <label htmlFor="m">M</label>
                  <input type="radio" id="m" />
                  <label htmlFor="l">L</label>
                  <input type="radio" id="l" />
                  <label htmlFor="xl">XL</label>
                  <input type="radio" id="xl" />
                </div>

                {/* Amount product */}
                <div className="container_item_icon">
                  <div className="container_minus_plus">-</div>
                  <span>
                    <input type="text" />
                  </span>
                  <div className="container_minus_plus">+</div>
                </div>
                <div className="Count_product">
                  <button type="submit" className="echbtn btnBut">
                    Buy Now
                  </button>
                  <button type="submit" className="echbtn btnAdd">
                    Add To Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="description_container">
            <img
              src={"../../../../public/images/1701068285422-dress.png"}
              alt=""
            />
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default ProductDetails;
