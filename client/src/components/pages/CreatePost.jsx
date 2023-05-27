import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "../pages/CreatePost.module.css";

function CreatePost() {
  const baseUrl =
    "https://64135ff3c469cff60d61bf08.mockapi.io/toad/v1/DetailPost";
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
      img: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),

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
                type="text"
                name="img"
                value={formik.values.img}
                onChange={formik.handleChange}
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

            <div className={styles.inputField}>
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
