import React from 'react'
import Header from "../header/Header";
import Banner from "../header/Banner";
import Category from "./Category";
import ProductHome from "../products/ProductHome";
import Menu from "../menu/Menu";
import "./home.css"

const Home = () => {
  return (
    <div className='containerHomeBox'>
        <Header/>
        <Banner/>
        <Category/>
        <ProductHome/>
        <Menu/>
    </div>
  );
};

export default Home;
