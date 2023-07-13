import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "../pages/CreatePost.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import numeral from "numeral";

function CreatePost() {
  const userNavigate = useNavigate()
  const [image, setImage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const imageInputRef = useRef(null);
  const [profile, setProfile] = useState([]);
  const baseUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";
  const userUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";
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

  const handlePriceKeyPress = (event) => {
    const allowedChars = /[0-9.]/; // Chỉ cho phép nhập số và dấu phẩy
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault(); // Loại bỏ ký tự không hợp lệ
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userLogin"));
    if (user) {
      setProfile(user);
      formik.setFieldValue("owner", user.username);
    }
    console.log(profile);
  }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      owner: "",
      name: "",
      price: "",
      img: "",
      status: 0,
      address: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      owner: Yup.string(),
      // Name
      name: Yup.string()
        .min(5, "Tên phải ít nhất 5 ký tự")
        .max(25, "Tên chứa tối đa 25 ký tự")
        .required("Vui lòng không để trống ô này"),

      // Price
      price: Yup.string()
        .test("valid-price", "Vui lòng nhập giá hợp lệ", (value) => {
          if (!value) return false;
          const numericValue = numeral(
            value.replace(/,/g, "").replace(/\./g, "")
          ).value();
          return !isNaN(numericValue);
        })
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
      const updatedValues = {
        ...values,
        owner: profile.username,
        statusPost: profile.count >= 2 ? "isPending" : "isPosted",
      };

      try {
        await submitImage();
        const response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify(updatedValues),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        // console.log(updatedValues)
        await updateCount();
        toast.success("Thêm sản phẩm thành công!");
        setOpen(true);
        resetForm();
        imageInputRef.current.value = "";
        if (updatedValues.statusPost === 'isPending') {
          userNavigate('/payment')
        } // Clear the input field
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsCreating(false);
      }
    },
  });

  async function updateCount() {
    try {
      const response = await fetch(`${userUrl}/${profile.id}`);
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }

      const updatedProfile = await response.json();
      const updateProfile = { ...updatedProfile };
      updateProfile.count += 1;
      // console.log(updateProfile.count)

      const putResponse = await fetch(`${userUrl}/${updateProfile.id}`, {
        method: "PUT",
        body: JSON.stringify(updateProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(updateProfile)
      if (!putResponse.ok) {
        throw new Error(`HTTP Status: ${putResponse.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //   Return
  return (
    <div>
      <Navbar />

      <div className={styles.wrapper}>
        {" "}
        {/* <div className={styles.title}>Tạo bài đăng</div> */}
        <div className={styles.form}>
          <form onSubmit={formik.handleSubmit} onChange={submitImage}>
            {/* Get username */}
            {formik.values.owner === profile.username}

            <div className={styles.typeField}>
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
              <label>Công nghệ</label>

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

            {/* Name */}
            <div className={styles.boxInput}>
              <div className={styles.textInput}>
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
                  <label>Giá (VNĐ)</label>
                  <input
                    type="text"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onKeyPress={handlePriceKeyPress}
                    className={styles.input}
                    placeholder="Ví dụ: 200.000"
                  />
                  {formik.errors.price && formik.touched.price && (
                    <p color="red">{formik.errors.price}</p>
                  )}
                </div>
              </div>
              <div className={styles.imageInput}>
                <div className={styles.upLoadImg}>
                  <label>Hình ảnh</label>

                  <Upload
                    listType="picture-card"
                    beforeUpload={(file) => {
                      setImage(file); // Lưu file vào state
                      return false; // Ngăn việc tải lên tự động của Ant Design
                    }}
                    className={styles.upload}
                    style={{ margin: 0 }}
                  >
                    <p style={{ margin: 0 }}>Tải lên</p>
                  </Upload>
                </div>
              </div>
            </div>

            {/* Image */}

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
      {/* <Link to="/payment">
        <button
          className="btn btn-success"
          style={{ position: "absolute", top: "150px", left: "20px" }}
        >
          Thanh Toán
        </button>
      </Link> */}

      <Footer />
      <ToastContainer />
    </div>
  );
}
export default CreatePost;
