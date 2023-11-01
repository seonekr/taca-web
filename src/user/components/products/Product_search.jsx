import React from 'react'
import './product_search.css'
import { Link } from 'react-router-dom';
import acer from '../../../img/acer.png'
import Header from '../header/Header';
import Menu from '../menu/Menu';
import { FaSearch } from "react-icons/fa"
import { useState } from 'react';

const Product_search = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', description: 'This is product 1', price: 10, images: [acer] },
        { id: 2, name: 'Product 2', description: 'This is product 2', price: 20, images: [acer] },
        { id: 3, name: 'Product 3', description: 'This is product 3', price: 30, images: [acer] },
        { id: 4, name: 'Product 4', description: 'This is product 4', price: 20, images: [acer] },
        
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [price, setPrice] = useState("");
    const [priceFilter, setPriceFilter] = useState("");

    // Filter products based on search term and price range
    const filteredProducts = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const minPriceMatch = minPrice !== "" ? product.price <= minPrice : true;
        const maxPriceMatch = maxPrice !== "" ? product.price >= maxPrice : true;
        const priceMatch = priceFilter !== "" ? product.price === parseInt(priceFilter) : true;
        return nameMatch && minPriceMatch && maxPriceMatch && priceMatch;
    });

    // Handle filter by category
    const handleFilter = (price) => {
        setPriceFilter(price); // Please change this to category
    };

    // Handle inputChange
    const handleInputChange = (e, index, field) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = e.target.value;
        setProducts(updatedProducts);
    }

    // Handle select by category
    const handleSelectChange = (e) => {
        setPrice(e.target.value); // Please change this to category
        handleFilter(e.target.value); // Please change this to category
    };

    return (
        <>
            <Header />
            <div className='container_home'>
                <div className="content_Box">
                    <div className='container_head_search'>
                        <div className='input_wrapper'>
                            <FaSearch id="search-icon" />
                            <input
                                type="text"
                                placeholder="Search products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="content_itemBox">
                        <div className='container_product'>
                            <h3>Product</h3>
                            <form className="category_form" >
                                <select className="categoryFilter" value={price} onChange={handleSelectChange}>
                                    <option className="listOption" value="">Categories</option>
                                    <option className="listOption" value="10">Cate1</option>
                                    <option className="listOption" value="20">Cate2</option>
                                    <option className="listOption" value="30">Cate3</option>
                                </select>
                            </form>
                        </div>
                        <div className='product-area'>
                            {filteredProducts.map((product, index) => (
                                <form key={index}>
                                    <div  className='box-product' >
                                        <Link to="/product_search/productdetails">
                                            <img src={product.images[0]} alt='img' />
                                        </Link>
                                        <div className="txtOFproduct">
                                            <h4>
                                                <input
                                                    type="text"
                                                    value={product.name}
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
                                </form>
                            ))}
                        </div>
                    </div>
                    <div className='btn_more'>
                        <button className="loadmore_btn_more">
                            View More
                        </button>
                    </div>
                </div>

            </div>
            <Menu />
        </>
    )
}

export default Product_search