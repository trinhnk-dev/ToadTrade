import React from "react";
import styles from "./Payment.module.css";
import momoImage from "../../images/momo-payment.jpg";
import Navbar from "../common/Navbar";
import Footer from "./Footer";

const Payment = () => {
  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container}>
          <h1
            style={{
              textAlign: "center",
              padding: "20px 0px",
              marginBottom: "50px",
            }}
          >
            Thanh toán
          </h1>
          <div className={styles.paymentContent}>
            <div className={styles.paymentItem}>
              <div className={styles.inforBill}>
                <div className={styles.inforBillContent}>
                  <h5>Gói</h5>
                  <h5>Giá</h5>
                </div>
                <div className={styles.inforBillContent}>
                  <p>Đăng tin 1 lần</p>
                  <p>5.000VNĐ</p>
                </div>

                <div className={styles.inforBillContent}>
                  <p>Giảm giá</p>
                  <p>-0</p>
                </div>
                <div className={styles.inforBillContent}>
                  <h5>Tổng cộng</h5>
                  <h5 style={{ color: "#e63946" }}>5.000VNĐ</h5>
                </div>
              </div>
              <h5 style={{ marginBottom: "15px" }}>
                Bạn vui lòng chụp màn hình bill chuyển tiền và ấn vào icon chat
                với nhân viên chăm sóc khách hàng ở góc dưới phải màn hình
              </h5>
              <h6>
                <span style={{ color: "red" }}>* </span>
                Nội dung chuyển khoản vui lòng ghi username của bạn để chúng tôi
                ghi nhận!
              </h6>
            </div>
            <div className={styles.paymentImage}>
              <h3 style={{ marginLeft: "15px" }}>Bạn vui lòng quét mã ở đây</h3>
              <img src={momoImage} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;