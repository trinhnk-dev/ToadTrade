import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, loginwithGoogle } from "../../api";
import { StoreContext, actions } from "../../store";
import { message } from "antd";
import Navbar from "../common/Navbar";
import styles from "../pages/Login.module.css";
import logoToadTrade from "../../images/toadtrade-logo.png";
import Footer from "./Footer";

function Login() {
  const [state, dispatch] = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(state.data);
    if (state.accessToken) {
      navigate("/");
    } else {
      setPassword("");
      setUserName("");
      navigate("/login");
    }
  }, [state, navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      return setErrorMessage("Not empty username or password allowed");
    }
    try {
      const result = await login({ username, password });
      dispatch(actions.setState(JSON.parse(result)));
    } catch (e) {
      dispatch(actions.setState(e.response));
    }
  };

  const onLoginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await loginwithGoogle({ username, password });
      dispatch(actions.setState(JSON.parse(result)));
    } catch (e) {
      dispatch(actions.setState(e.response));
    }
  };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div
        className={styles.center}
        onKeyPress={(e) => (e.key === "Enter" ? onLogin : {})}
      >
        {/* <h1>Login</h1> */}
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />
        <form>
          {/* UserName */}
          <div className={styles.txtField}>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <span></span>
            <label htmlFor="UserName">Tên đăng nhập</label>
          </div>

          {/* Password */}
          <div className={styles.txtField}>
            <input
              type="password"
              id="inputPassword"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label htmlFor="inputPassword">Mật khẩu</label>
          </div>

          {/* Error Message */}
          <div className={styles.errorMessage}>
            <h6>{errorMessage}</h6>
          </div>

          {/* Login Button */}
          <button type="submit" onClick={onLogin} className={styles.login}>
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
