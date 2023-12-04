import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../adminMenu/AdminMenu";
import "./addProduct.css";
import axios from "axios";

// For alert message => 1
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddProduct = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    productType: "",
    description: "",
    price: "",
    mainImage: null,
    images: [],
    colors: [],
    currentColor: "", // Track the currently entered color
    popular: false,
  });

  const onMainImageDrop = (acceptedFiles) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      mainImage: acceptedFiles[0],
    }));
  };

  const onImagesDrop = (acceptedFiles) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...acceptedFiles],
    }));
  };

  const handleColorInputChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      currentColor: value,
    }));
  };

  const addColorInput = () => {
    if (product.currentColor.trim() !== "") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: [...prevProduct.colors, prevProduct.currentColor],
        currentColor: "", // Reset the current color after adding
      }));
    }
  };

  const removeColorInput = (index) => {
    if (product.colors.length > 1) {
      setProduct((prevProduct) => {
        const updatedColors = [...prevProduct.colors];
        updatedColors.splice(index, 1);
        return {
          ...prevProduct,
          colors: updatedColors,
        };
      });
    }
  };

  const removeImage = (index) => {
    setProduct((prevProduct) => {
      const updatedImages = [...prevProduct.images];
      updatedImages.splice(index, 1);
      return {
        ...prevProduct,
        images: updatedImages,
      };
    });
  };

  const {
    getRootProps: getMainImageRootProps,
    getInputProps: getMainImageInputProps,
  } = useDropzone({
    onDrop: onMainImageDrop,
    maxFiles: 1,
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
  } = useDropzone({
    onDrop: onImagesDrop,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      popular: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---> Post
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("productType", product.productType);
      formData.append("popular", product.popular ? 1 : 0);

      // Append main image
      if (product.mainImage) {
        formData.append("mainImage", product.mainImage);
      }

      // Append other images
      product.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Append colors
      formData.append("colors", JSON.stringify(product.colors));

      const response = await axios.post(
        import.meta.env.VITE_API + "/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.Status === "Success") {
        setSuccessMsg(response.data.Status);
        setErrorMsg("");
        navigate("/product/add");
      } else {
        console.log(response.data.Status)
        navigate("/product/add");
      }

      // console.log(response.data.Status);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log("name", product.name);
    console.log("description", product.description);
    console.log("price", product.price);
    console.log("productType", product.productType);
    console.log("popular", product.popular ? 1 : 0);
    if (product.mainImage) {
      console.log("mainImage", product.mainImage);
    }
    product.images.forEach((image, index) => {
      console.log(`images`, image);
    });
    console.log("colors", JSON.stringify(product.colors));
  };

  return (
    <>
      <AdminMenu />
      <section id="post">
        <div className="boxcontainerSpan_Box"></div>
        <div className="box_container_product">
          <div className="box_text">
            <h2>Add Product</h2>
          </div>
          <h3>{successMsg && successMsg}</h3>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="edit-product-form"
          >
            <div className="input-box">
              <div className="box">
                <label htmlFor="productName">Product name</label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="box">
                <label htmlFor="productType">Product type</label>
                <input
                  type="text"
                  id="productType"
                  name="productType"
                  value={product.productType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="box">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="box">
                  <label htmlFor="description">Details</label>
                  <textarea
                    id="description"
                    rows="5"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="popular">
                <label htmlFor="popular">Popular product</label>
                <input
                  type="checkbox"
                  id="popular"
                  name="popular"
                  checked={product.popular}
                  onChange={handleCheckboxChange}
                />
                {/* Hidden input for "popular" attribute */}
                <input
                  type="hidden"
                  name="popular"
                  value={product.popular ? 1 : 0}
                />
              </div>

              {/* Add Color Box */}
              <div className="colorBox_chContainer">
                <h1>Color:</h1>
                <div className="addcolor_container">
                  {product.colors.map((color, index) => (
                    <div className="Card_boxColor" key={index}>
                      <div
                        style={{
                          backgroundColor: color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      {color}
                      <span
                        className="spanCancelBox"
                        onClick={() => removeColorInput(index)}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>

                <div className="addcolorContent">
                  <input
                    className="inputBoxaddcolor"
                    type="text"
                    value={product.currentColor}
                    onChange={handleColorInputChange}
                    placeholder="Enter Color"
                  />
                  <div className="btn_addcolorbox" onClick={addColorInput}>
                    Add
                  </div>
                </div>
              </div>
              {/* End Add Color Box */}
            </div>

            <div className="input-img">
              <div className="gallery">
                <h3>Image gallery</h3>
                <div className="gallery-box">
                  <input {...getImagesInputProps()} />
                  {product.images.map((image, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                      <button type="button" onClick={() => removeImage(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  {product.images && product.images.length > 0 ? (
                    <div {...getImagesRootProps()} className="add-more">
                      +
                    </div>
                  ) : (
                    <div {...getImagesRootProps()} className="add-gallery">
                      Choose gallery
                    </div>
                  )}
                </div>
              </div>
              <div className="box_description">
                <h3>Description image</h3>

                <div className="image">
                  <label>
                    <div {...getMainImageRootProps()}>
                      {product.mainImage && (
                        <img
                          src={URL.createObjectURL(product.mainImage)}
                          alt="Main Preview"
                        />
                      )}
                      <p>Choose image</p>
                    </div>
                  </label>
                  <input {...getMainImageInputProps()} />
                </div>
              </div>
            </div>
            <div className="submit1">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
