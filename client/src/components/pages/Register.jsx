import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api";
import * as Yup from "yup";
import { message } from "antd";
import Navbar from "../common/Navbar";
import styles from "../pages/Register.module.css";
import logoToadTrade from "../../images/toadtrade-logo.png";
import Footer from "./Footer";
import { useFormik } from "formik";

function Register() {
  const baseUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";
  const [state, dispatch] = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const [usernameError, setUsernameError] = useState("");
  const register = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      phonenumber: 0,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Tên đăng nhập phải tối thiểu 5 ký tự")
        .max(25, "Tên đăng nhập phải dưới 25 ký tự")
        .required("Không được để trống ô này"),
      password: Yup.string()
        .min(5, "Mật khẩu phải tối thiểu 5 ký tự")
        .max(25, "Mật khẩu phải dưới 25 ký tự")
        .required("Không được để trống ô này"),
      name: Yup.string()
        .min(5, "Tên phải tối thiểu 5 ký tự")
        .max(25, "Tên phải dưới 25 ký tự")
        .required("Không được để trống ô này"),
      phonenumber: Yup.string()
        .required()
        .matches(phoneRegExp, "Số điện thoại này không tồn tại"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Check if the username already exists
        const response = await fetch(`${baseUrl}?username=${values.username}`);
        const data = await response.json();
        if (data.length > 0) {
          setUsernameError(
            "tên đăng nhập này đã được sử dụng, vui lòng nhập tên đăng nhập khác!"
          );
          return;
        }

        // Proceed with registration if the username is unique
        const registerResponse = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });

        if (!registerResponse.ok) {
          throw new Error(`HTTP Status: ${registerResponse.status}`);
        }

        resetForm();
        // Display success message or navigate to another page
      } catch (error) {
        console.log(error.message);
        // Display error message
      }
    },
  });

  // useEffect(() => {
  //   // setMessage(state.data);
  //   if (state.accessToken) {
  //     navigate("/");
  //   } else {
  //     setValues({ username: "", password: "", name: "", phone: "" });
  //     navigate("/register");
  //   }
  // }, [state, navigate]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Kiểm tra độ dài giá trị nhập vào
  //   if (name === "phone" && value.length > 10) {
  //     return;
  //   }
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onRegister = async (e) => {
  //   e.preventDefault();
  //   const result = await register({ values });
  //   console.log(result);
  //   if (result.status === 200) {
  //     await info("success", result.message);
  //     setTimeout(() => navigate("/login"), 1000);
  //   } else {
  //     info("error", result.message);
  //   }
  // };

  // const info = (status, msg) => {
  //   messageApi.open({
  //     type: status,
  //     content: msg,
  //   });
  // };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div
        className={styles.center}
        // onKeyPress={(e) => (e.key === "Enter" ? onRegister : {})}
      >
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />

        <form onSubmit={register.handleSubmit}>
          {/* UserName */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="username"
              value={register.values.username}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Tên đăng nhập</label>
            {register.errors.username && register.touched.username && (
              <p style={{ color: "red" }}>{register.errors.username}</p>
            )}
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>

          {/* Password */}
          <div className={styles.txtField}>
            <input
              type="password"
              name="password"
              value={register.values.password}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Mật khẩu</label>
            {register.errors.password && register.touched.password && (
              <p style={{ color: "red" }}>{register.errors.password}</p>
            )}
          </div>

          {/* Name */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="name"
              value={register.values.name}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Họ và Tên</label>
            {register.errors.name && register.touched.name && (
              <p style={{ color: "red" }}>{register.errors.name}</p>
            )}
          </div>

          {/* Year of Birth */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="phonenumber"
              maxLength={10}
              pattern="[0-9]*"
              // placeholder="Type your year of birth"
              value={register.values.phonenumber}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Số điện thoại</label>
            {register.errors.phonenumber && register.touched.phonenumber && (
              <p style={{ color: "red" }}>{register.errors.phonenumber}</p>
            )}
          </div>

          {/* Register Button */}
          <button type="submit" className={styles.register}>
            Đăng ký
          </button>

          {/* Link To Login */}
          <div className={styles.loginLink}>
            <span>Bạn đã có tài khoản?</span>
            <Link to="/login" className={styles.login}>
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
