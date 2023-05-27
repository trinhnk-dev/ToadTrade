import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api";
import { message } from "antd";
import Navbar from "../common/Navbar";
import styles from "../pages/Register.module.css";
import logoToadTrade from "../../images/toadtrade-logo.png";
import Footer from "./Footer";

function Register() {
  const [state, dispatch] = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    // setMessage(state.data);
    if (state.accessToken) {
      navigate("/");
    } else {
      setValues({ username: "", password: "", name: "", phone: "" });
      navigate("/register");
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra độ dài giá trị nhập vào
    if (name === "phone" && value.length > 10) {
      return;
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const result = await register({ values });
    console.log(result);
    if (result.status === 200) {
      await info("success", result.message);
      setTimeout(() => navigate("/login"), 1000);
    } else {
      info("error", result.message);
    }
  };

  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div
        className={styles.center}
        onKeyPress={(e) => (e.key === "Enter" ? onRegister : {})}
      >
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />

        <form onSubmit={onRegister}>
          {/* UserName */}
          <div className={styles.txtField}>
            <input
              type="text"
              id="inputUserName"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
            <span></span>
            <label htmlFor="inputUserName">Tên đăng nhập</label>
          </div>

          {/* Password */}
          <div className={styles.txtField}>
            <input
              type="password"
              id="inputPassword"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
            <span></span>
            <label htmlFor="inputPassword">Mật khẩu</label>
          </div>

          {/* Name */}
          <div className={styles.txtField}>
            <input
              type="text"
              id="inputName"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
            <span></span>
            <label htmlFor="inputName">Họ và Tên</label>
          </div>

          {/* Year of Birth */}
          <div className={styles.txtField}>
            <input
              type="number"
              id="inputphone"
              name="phone"
              maxLength={10}
              // placeholder="Type your year of birth"
              value={values.phone}
              onChange={handleChange}
              required
            />
            <span></span>
            <label htmlFor="inputphone">Số điện thoại</label>
          </div>

          {/* Register Button */}
          <button type="submit" id="liveToastBtn" className={styles.register}>
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
