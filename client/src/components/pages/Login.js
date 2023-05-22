import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, loginwithGoogle } from "../../api";
import { StoreContext, actions } from "../../store";
import { message } from "antd";
import Navbar from "../common/Navbar";

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
        style={{
          height: "100vh",
        }}
        onKeyPress={(e) => (e.key === "Enter" ? onLogin : {})}
      >
        <div className="container" style={{ height: "100%" }}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <form className="form-control w-50 m-5 py-4 px-5">
              <div className="mb-3">
                <label htmlFor="UserName" className="form-label">
                  User Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="UserName"
                  name="UserName"
                  placeholder="e.g admin"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="imputPassword"
                  name="password"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3 text-danger fw-bold text-center">
                <span>{errorMessage}</span>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
              <div className="justify-content-center d-flex mt-4">
                <span>Don't have account?&ensp;</span>
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
