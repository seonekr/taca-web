import './categories.css';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import { FaSearch } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom';
import acer from '../../../img/acer.png'
import { useState } from 'react';

const Categories = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', description: 'This is product 1', price: 10, category: "clothes", images: [acer] },
        { id: 2, name: 'Product 2', description: 'This is product 2', price: 20, category: "clothes", images: [acer] },
        { id: 3, name: 'Product 3', description: 'This is product 3', price: 30, category: "clothes", images: [acer] },
        { id: 3, name: 'Product 3', description: 'This is product 3', price: 30, category: "clothes", images: [acer] },
        { id: 4, name: 'Product 4', description: 'This is product 4', price: 40, category: "electronich device", images: [acer] },
        { id: 5, name: 'Product 5', description: 'This is product 5', price: 50, category: "electronich device", images: [acer] },
        { id: 6, name: 'Product 6', description: 'This is product 6', price: 60, category: "cosmetics", images: [acer] },
        { id: 7, name: 'Product 7', description: 'This is product 7', price: 70, category: "cosmetics", images: [acer] },
        { id: 8, name: 'Product 8', description: 'This is product 8', price: 80, category: "cosmetics", images: [acer] },
    ]);


    const location = useLocation();
    const { categorys } = location.state;


    const [category, setCategory] = useState(categorys);

    // Filter products based on search term and price range
    const filteredProducts = products.filter((product) => {
        const cateMatch = category !== "" ? product.category === category : true;
        return cateMatch;
    });


    // Handle inputChange
    const handleInputChange = (e, index, field) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = e.target.value;
        setProducts(updatedProducts);
    }

    const handleSelectChange = (e) => {
        setCategory(e.target.value); // Please change this to category
    };

    return (
        <div className='categoryBox_container'>
            <Header />
            <div className='searchBycate'>
                <input
                    className='txtheadcateg'
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={handleSelectChange}
                />
            </div>
            <div className='box_container_home'>

                {filteredProducts.map((product, index) => (
                    <form key={index}>
                        <div className='box_container_img' >
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
            <Menu />
        </div>
    )
}

export default Categories