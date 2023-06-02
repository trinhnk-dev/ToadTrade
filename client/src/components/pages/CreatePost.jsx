import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "../pages/CreatePost.module.css";

function CreatePost() {
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const imageInputRef = useRef(null);
  const baseUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";
  const submitImage = () => {
    if (!image) return;
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
        .min(5, "Tên phải ít nhất 5 ký tự")
        .max(25, "Tên chứa tối đa 25 ký tự")
        .required("Vui lòng không để trống ô này"),

      // Price
      price: Yup.number()
        .integer()
        .required("Vui lòng không để trống ô này"),

      // img
      img: Yup.string().required("Bạn phải tải ảnh lên"),

      // Status
      status: Yup.number()
        .integer()
        .required("Vui lòng không để trống ô này"),

      // Address
      address: Yup.string().required("Vui lòng không để trống ô này"),

      // Description
      description: Yup.string()
        .min(8, "Mật khẩu phải ít nhất 8 ký tự")
        .required("Vui lòng không để trống ô này"),

      // Type
      // type: Yup.string().required('Must choose'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsCreating(true);
      try {
        await submitImage();
        const response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        setOpen(true);
        resetForm();
        imageInputRef.current.value = ""; // Clear the input field
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsCreating(false);
      }
    },
  });

  //   Return
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        {" "}
        <div className={styles.title}>Tạo bài đăng</div>
        <div className={styles.form}>
          <form onSubmit={formik.handleSubmit} onChange={submitImage}>
            {/* Name */}
            <div className={styles.inputField}>
              <label>Tên sản phẩm</label>
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
              <label>Giá</label>
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
              <label>Hình ảnh</label>
              <input
                ref={imageInputRef}
                type="file"
                name="img"
                onChange={(e) => setImage(e.target.files[0])}
                className={styles.input}
              />
            </div>

            {/* Status */}
            <div className={styles.inputField}>
              <label>Tình trạng (%) </label>
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
              <label>Địa chỉ</label>
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
              <label>Mô tả</label>
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
              <label>Loại sản phẩm</label>

              {/* Stationery Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "stationery"}
                onChange={() => formik.setFieldValue("type", "stationery")}
              />
              <label>Họa cụ</label>

              {/* Tech Type */}
              <input
                type="radio"
                checked={formik.values.type === "tech"}
                name="type"
                onChange={() => formik.setFieldValue("type", "tech")}
              />
              <label>Đồ công nghệ</label>

              {/* Book Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "book"}
                onChange={() => formik.setFieldValue("type", "book")}
              />
              <label>Giáo trình</label>

              {/* Uniform Type */}
              <input
                type="radio"
                name="type"
                checked={formik.values.type === "uniform"}
                onChange={() => formik.setFieldValue("type", "uniform")}
              />
              <label>Đồng phục</label>

              {formik.errors.type && formik.touched.type && (
                <p>{formik.errors.type}</p>
              )}
            </div>

            {/* Create Button */}
            <div className={styles.inputField}>
              <button
                type="submit"
                className={styles.btn}
                disabled={isCreating}
              >
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default CreatePost;
