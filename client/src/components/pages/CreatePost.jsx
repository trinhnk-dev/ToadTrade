import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "../pages/CreatePost.module.css";

function CreatePost() {
  const [image, setImage] = useState("");
  const baseUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";
  const submitImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "toadtrade");
    data.append("cloud_name", "dilykkog3");

    fetch("https://api.cloudinary.com/v1_1/dilykkog3/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        formik.setFieldValue("img", data.secure_url); // Set the image URL in the formik values
        formik.handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      img: "",
      status: 0,
      address: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      // Name
      name: Yup.string()
        .min(5, "Your name must be at least 5 characters!")
        .max(25, "Your name must be under 25 characters")
        .required("You must fill in this section"),

      // Price
      price: Yup.number()
        .integer()
        .required("You must fill in this section"),

      // img

      // Status
      status: Yup.number()
        .integer()
        .required("You must fill in this section"),

      // Address
      address: Yup.string().required("You must fill in this section"),

      // Description
      description: Yup.string()
        .min(8, "Your password must be at least 8 characters")
        .required("You must fill in this section"),

      // Type
      // type: Yup.string().required('Must choose'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
      resetForm();
    },
  });

  //   Return
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        {" "}
        <div className={styles.title}>Create Post</div>
        <div className={styles.form}>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className={styles.inputField}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={styles.input}
                placeholder="Nhập tên sản phẩm"
              />
              {formik.errors.name && formik.touched.name && (
                <p color="red">{formik.errors.name}</p>
              )}
            </div>

            {/* Price */}

            <div className={styles.inputField}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className={styles.input}
              />
              {formik.errors.price && formik.touched.price && (
                <p color="red">{formik.errors.price}</p>
              )}
            </div>

            {/* Image */}
            <div className={styles.inputField}>
              <label>Image</label>
              <input
                type="file"
                name="img"
                onChange={(e) => setImage(e.target.files[0])}
                className={styles.input}
                placeholder="Nhập url sản phẩm"
              />
              {formik.errors.img && formik.touched.img && (
                <p color="red">{formik.errors.img}</p>
              )}
            </div>

            {/* Status */}
            <div className={styles.inputField}>
              <label>Status (%) </label>
              <input
                type="number"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className={styles.input}
              />
              {formik.errors.status && formik.touched.status && (
                <p color="red">{formik.errors.status}</p>
              )}
            </div>

            {/* Address */}
            <div className={styles.inputField}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className={styles.input}
                placeholder="Nhập địa chỉ của bạn"
              />
              {formik.errors.address && formik.touched.address && (
                <p color="red">{formik.errors.address}</p>
              )}
            </div>

            {/* Description */}
            <div className={styles.inputField}>
              <label>Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={styles.textarea}
                placeholder="Mô tả sản phẩm"
              />
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
              )}
            </div>

            {/* Type */}
            <div className={styles.inputField}>
              <label>Type</label>

              {/* Stationery Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "stationery"}
                onChange={() => formik.setFieldValue("type", "stationery")}
              />
              <label>Stationery</label>

              {/* Tech Type */}
              <input
                type="radio"
                checked={formik.values.type === "tech"}
                name="type"
                onChange={() => formik.setFieldValue("type", "tech")}
              />
              <label>Technology</label>

              {/* Book Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "book"}
                onChange={() => formik.setFieldValue("type", "book")}
              />
              <label>Book</label>

              {/* Uniform Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "uniform"}
                onChange={() => formik.setFieldValue("type", "uniform")}
              />
              <label>Uniform</label>

              {formik.errors.type && formik.touched.type && (
                <p>{formik.errors.type}</p>
              )}
            </div>

            {/* Create Button */}
            <div className={styles.inputField} onClick={submitImage}>
              <input type="submit" value="Create" className={styles.btn} />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default CreatePost;
