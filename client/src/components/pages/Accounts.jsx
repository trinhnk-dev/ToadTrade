import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { editProfile, getUserProfile } from "../../api";
import { message } from "antd";
import styles from "../pages/Account.module.css";
import logoToadTrade from "../../images/toadtrade-logo.png";
import Footer from "./Footer";
function Accounts({ id }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    username: "",
    phone: "",
    name: "",
  });

  useEffect(() => {
    async function fetchMyAPI(id) {
      const response = await getUserProfile({ id });
      setValues(response);
    }
    fetchMyAPI(id);
  }, [refresh]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Kiểm tra độ dài giá trị nhập vào
    if (name === "phone" && value.length > 10) {
      return;
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setRefresh(true);
    const result = await editProfile({ values, id });
    if (result.status === 200) {
      info("success", result.message);
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
      <div className={styles.center}>
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />
        <form onSubmit={(e) => handleSubmit(e, id)}>
          {/* Username */}
          <div className={styles.txtField}>
            <input
              type="text"
              value={values.username}
              name="username"
              disabled
            />
            <span></span>
          </div>

          {/* Name */}
          <div className={styles.txtField}>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              value={values.name}
            />
            <span></span>
            <label className="labels">Họ Tên</label>
          </div>

          {/* Year of Birth */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="phone"
              maxLength={10}
              pattern="[0-9]*"
              required
              onChange={handleChange}
              value={values.phone}
            />
            <span></span>
            <label className="labels">Số điện thoại</label>
          </div>

          {/* Save Button */}
          <button className={styles.save} type="submit">
            Lưu thông tin
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Accounts;
