import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../adminMenu/AdminMenu";
import "./addProduct.css";
import axios from "axios";

// For alert message => 1
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddProduct = () => {
  const { id } = useParams();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "", // mainImage
    gallery: [], // images
    colors: [],
    currentColor: "", // Track the currently entered color
    is_popular: false,
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getProduct/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setProduct((prevProduct) => ({
            ...prevProduct,
            name: result.Result[0].name,
            description: result.Result[0].description,
            price: result.Result[0].price,
            category: result.Result[0].category,
            is_popular: result.Result[0].is_popular,
            image: result.Result[0].image,
            gallery: result.Result[0].gallery,
            colors: result.Result[0].colors,
          }));
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  console.log("name", product.name);
  console.log("description", product.description);
  console.log("price", product.price);
  console.log("category", product.category);
  console.log("is_popular", product.is_popular ? 1 : 0);
  console.log("image", product.image);
  console.log("gallery", product.gallery);
  console.log("colors", product.colors);

  const onImageDrop = (acceptedFiles) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: acceptedFiles[0],
    }));
  };

  const onGalleryDrop = (acceptedFiles) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      gallery: [...prevProduct.gallery, ...acceptedFiles],
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
      const updatedGallery = [...prevProduct.gallery];
      updatedGallery.splice(index, 1);
      return {
        ...prevProduct,
        gallery: updatedGallery,
      };
    });
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      onDrop: onImageDrop,
      maxFiles: 1,
    });

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
  } = useDropzone({
    onDrop: onGalleryDrop,
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
      is_popular: checked,
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
      formData.append("category", product.category);
      formData.append("is_popular", product.is_popular ? 1 : 0);

      // Append image
      formData.append("image", product.image);

      // Append gallery
      product.gallery.forEach((image, index) => {
        formData.append(`gallery`, image);
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
        console.log(response.data.Status);
        navigate("/product/add");
      } else {
        console.log(response.data.Status);
        navigate("/product/add");
      }

      // console.log(response.data.Status);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log("name", product.name);
    console.log("description", product.description);
    console.log("price", product.price);
    console.log("category", product.category);
    console.log("is_popular", product.is_popular ? 1 : 0);
    console.log("image", product.image);
    // console.log("gallery", JSON.stringify(product.gallery));
    product.gallery.forEach((image, index) => {
      console.log(`gallery`, image);
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
            <h2>Edit Product</h2>
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
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={product.category}
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
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="is_popular">
                <label htmlFor="is_popular">Popular product</label>
                <input
                  type="checkbox"
                  id="is_popular"
                  name="is_popular"
                  checked={product.is_popular}
                  onChange={handleCheckboxChange}
                />
                {/* Hidden input for "is_popular" attribute */}
                <input
                  type="hidden"
                  name="is_popular"
                  value={product.is_popular ? 1 : 0}
                />
              </div>

              {/* Add Color Box */}
              <div className="colorBox_chContainer">
                <h1>Color:</h1>
                <div className="addcolor_container">
                  {/* {product.colors.map((color, index) => (
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
                  ))} */}

                  {/* New one */}
                  {/* {JSON.stringify(product.colors)
                    ? JSON.parse(product.colors).map((e, index) => (
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
                          ></span>
                        </div>
                      ))
                    : null} */}
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
                <h3>Gallery</h3>
                <div className="gallery-box">
                  <input {...getGalleryInputProps()} />
                  {/* Old one */}
                  {/* {product.gallery.map((image, index) => (
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
                  ))} */}

                  {/* New one */}
                  {/* {JSON.stringify(product.gallery)
                    ? JSON.parse(product.gallery).map((image, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <img
                            src={
                              import.meta.env.VITE_API +
                              "/uploads/images/" +
                              image
                            }
                            alt={`Image ${index + 1}`}
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    : null} */}

                  {product.gallery && product.gallery.length > 0 ? (
                    <div {...getGalleryRootProps()} className="add-more">
                      +
                    </div>
                  ) : (
                    <div {...getGalleryRootProps()} className="add-gallery">
                      Choose gallery
                    </div>
                  )}
                </div>
              </div>
              <div className="box_description">
                <h3>Description image</h3>

                <div className="image">
                  <label>
                    <div {...getImageRootProps()}>
                      {product.image && (
                        <img
                          src={
                            import.meta.env.VITE_API +
                            "/uploads/images/" +
                            product.image
                          }
                          alt="Main Preview"
                        />
                      )}
                      <p>Choose image</p>
                    </div>
                  </label>
                  <input {...getImageInputProps()} />
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
