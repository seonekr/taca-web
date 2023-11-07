import React from 'react'
import Header from "../header/Header";
import Banner from "../header/Banner";
import Category from "./Category";
import ProductHome from "../products/ProductHome";
import Menu from "../menu/Menu";
import "./home.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/authen",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.Status === "Success") {
          console.log(JSON.stringify(response.data.Status));
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
        <Header/>
        <Banner/>
        <Category/>
        <ProductHome/>
        <Menu/>
    </>
  );
};

export default Home;
