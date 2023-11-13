import React from 'react'
import dress from "../../../img/dress.png";
import image1 from "../../../img/image1.png";
import acer from '../../../img/acer.png';
import productImage from "../../../img/productImage.png";
import { Link, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import { FaSearch } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./categories.css";


const Categories = () => {
    const [products, setProducts] = useState([
        { id: 1, productID: 1, productName: "pro1", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [acer] },
        { id: 2, productID: 2, productName: "pro2", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [dress] },
        { id: 3, productID: 3, productName: "pro3", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [acer] },
        { id: 4, productID: 4, productName: "pro4", productType: "clothes", price: 10, category: "electronich device", description: "desc for this product", images: [dress] },
        { id: 5, productID: 5, productName: "pro5", productType: "clothes", price: 10, category: "electronich device", description: "desc for this product", images: [image1] },
        { id: 6, productID: 6, productName: "pro6", productType: "clothes", price: 10, category: "cosmetics", description: "desc for this product", images: [image1] },
        { id: 7, productID: 7, productName: "pro7", productType: "clothes", price: 10, category: "cosmetics", description: "desc for this product", images: [productImage] },
        { id: 8, productID: 8, productName: "pro8", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [acer] },
        { id: 9, productID: 9, productName: "pro9", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [productImage] },
        { id: 10, productID: 10, productName: "pro10", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [acer] },
        { id: 11, productID: 11, productName: "pro11", productType: "clothes", price: 10, category: "clothes", description: "desc for this product", images: [productImage] }
    ]);


    const location = useLocation();
    const { categorys } = location.state;


    const [category, setCategory] = useState(categorys);

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [displayCount, setDisplayCount] = useState(8);

    // Filter products based on search term and price range
    const filteredProducts = products.filter((product) => {
        const cateMatch = category !== "" ? product.category === category : true;
        const nameMatch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const minPriceMatch = minPrice !== "" ? product.price <= minPrice : true;
        const maxPriceMatch = maxPrice !== "" ? product.price >= maxPrice : true;
        return nameMatch && minPriceMatch && maxPriceMatch && cateMatch;
    });

    // Handle inputChange
    const handleInputChange = (e, index, field) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = e.target.value;
        setProducts(updatedProducts);
    }

    // Handle select by price
    const handleMaxChange = (e) => {
        setMaxPrice(e.target.value); // Please change this to category
    };
    // Handle select by peice
    const handleMinChange = (e) => {
        setMinPrice(e.target.value); // Please change this to category
    };

    const handleSelectChange = (e) => {
        setCategory(e.target.value); // Please change this to category
    };

    // Read more
    const displayedProducts = filteredProducts.slice(0, displayCount);
    const handleViewMore = () => {
        setDisplayCount(displayCount + 4);
    };

    // Get send ID
    const [sendProductID, setSendProductID] = useState();
    const navigate = useNavigate();

    // Handle product
    const handleProduct = (sendProductID) => {
        navigate('/product_search/productdetails/', { state: { sendProductID: sendProductID } });
    }

    return (
        <>
            <Header />
            <div className='container_home'>
                <div className='container_head_search'>
                    <FaSearch id="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="content_itemBox">
                    <div className='container_product'>
                        <div className='searchBycate'>
                            <h3 className="htxthead"><span className="spennofStyle"></span>
                                <input
                                    className='txtheadcateg'
                                    type="text"
                                    placeholder="Category"
                                    value={category}
                                    onChange={handleSelectChange}
                                />
                            </h3>
                        </div>
                        <form className='boxfilterseach'>
                            <select className="categoryFilter" value={maxPrice} onChange={handleMaxChange}>
                                <option className="listOption" value="">Over price</option>
                                <option className="listOption" value="10">$10</option>
                                <option className="listOption" value="20">$20</option>
                                <option className="listOption" value="30">$30</option>
                            </select>
                            <select className="categoryFilter" value={minPrice} onChange={handleMinChange}>
                                <option className="listOption" value="">lower price</option>
                                <option className="listOption" value="10">$10</option>
                                <option className="listOption" value="20">$20</option>
                                <option className="listOption" value="30">$30</option>
                            </select>
                        </form>
                    </div>
                    <div className='contentImageProducts'>
                        {displayedProducts.map((product, index) => (
                            <div key={index}>
                                <div className='group_itemBox' onClick={() => handleProduct(product.productID)}>
                                    <div className='img'>
                                        <img src={product.images[0]} alt='img' />
                                    </div>
                                    <div className="txtOFproduct">
                                        <h4>
                                            <input
                                                type="text"
                                                value={product.productName}
                                                onChange={(e) => handleInputChange(e, index, "name")}
                                            />
                                        </h4>
                                        <p>
                                            <input
                                                className='priceProduct'
                                                type="text"
                                                value={product.price}
                                                onChange={(e) => handleInputChange(e, index, "price")}
                                            />
                                        </p>
                                        <p className='txtP_width'>
                                            <input
                                                type="text"
                                                value={product.description}
                                                onChange={(e) => handleInputChange(e, index, "description")}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='btn_more'>
                    <button className="loadmore_btn_more" onClick={handleViewMore}>
                        View More
                    </button>
                </div>
            </div>
            <Menu />
        </>
    )
}

export default Categories