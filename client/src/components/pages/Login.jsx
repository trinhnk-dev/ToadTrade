import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../common/Navbar";
import styles from "../pages/Login.module.css";
import logoToadTrade from "../../images/toadtrade-logo2.png";
import Footer from "./Footer";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const userNavigate = useNavigate();

  const baseUrl = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Không được để trống ô này"),
      password: Yup.string().required("Không được để trống ô này"),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(baseUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const user = data.find(
            (user) =>
              user.username === values.username &&
              user.password === values.password
          );
          if (user) {
            sessionStorage.setItem("userLogin", JSON.stringify(values));
            userNavigate("/");
          } else {
            alert("Invalid");
          }
        })
        .catch((error) => console.log(error.message));
      resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <div className={styles.center}>
        {/* <h1>Login</h1> */}
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />
        <form onSubmit={formik.handleSubmit}>
          {/* UserName */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              required
            />
            <span></span>
            <label>Tên đăng nhập</label>
          </div>

          {/* Password */}
          <div className={styles.txtField}>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
            />
            <span></span>
            <label>Mật khẩu</label>
          </div>

          {/* Login Button */}
          <button type="submit" className={styles.login}>
            Đăng nhập
          </button>

          {/* Link To Register */}
          <div className={styles.registerLink}>
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/register" className={styles.register}>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
