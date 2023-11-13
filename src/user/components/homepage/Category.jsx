import "./category.css";
import womenfashion from "../../../img/womenfashion.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {

    const [categorys, setCategory] = useState('');
    const navigate = useNavigate();

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        navigate('/categories/', { state: { categorys: newCategory } });
    };

    return (
        <div className="category_container2">
            <div className="box-category">
                <button onClick={() => handleCategoryChange('clothes')}>
                    <img className="boxImage" src={womenfashion} alt="img" />
                    <p>Womwn's fashion</p>
                </button>
            </div>
            <div className="box-category">
                <button onClick={() => handleCategoryChange('electronich device')}>
                    <img className="boxImage" src={womenfashion} alt="img" />
                    <p>Electronich device</p>
                </button>
            </div>
            <div className="box-category">
                <button onClick={() => handleCategoryChange('cosmetics')}>
                    <img className="boxImage" src={womenfashion} alt="img" />
                    <p>Cosmetics</p>
                </button>
            </div>
        </div>
    )
}

export default Category;