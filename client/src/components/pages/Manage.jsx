import React from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "./Manage.module.css";

const Manage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.manage}>
            <h3>Hiện chưa có tin để quản lý</h3>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Manage;
