import styles from "../pages/Footer.module.css";
import footerLogo from "../../images/toadtrade-logo.png";
import { Link } from "react-router-dom";

function Footer() {
  const handleClick = () => {
    window.open('https://www.facebook.com/Toadtrade', '_blank');
  };
  return (
    <body>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* Logo */}
            <div
              className={styles.col}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={footerLogo} alt="" />
              <h2>ToadTrade</h2>
            </div>

            {/* Company */}
            <div className={styles.col}>
              <h4>ToadTrade</h4>
              <ul>
                <li>
                  <a href="https://www.facebook.com/Toadtrade" target="_blank" rel="noopener noreferrer">Về chúng tôi</a>
                  <a href="https://www.facebook.com/Toadtrade" target="_blank" rel="noopener noreferrer">Dịch vụ</a>
                  <a href="https://www.facebook.com/Toadtrade" target="_blank" rel="noopener noreferrer">Lịch sử hình thành</a>
                </li>
              </ul>
            </div>

            {/* Get Help */}
            <div className={styles.col}>
              <h4>Truy cập</h4>
              <ul>
                <li>
                  <Link to="/createPost">Đăng tin</Link>
                  <Link to="/manage">Quản lý tin</Link>
                  <Link to="/search">Tìm kiếm</Link>
                  <Link to="/chat">Chat</Link>
                </li>
              </ul>
            </div>

            {/* Online Shop */}
            <div className={styles.col}>
              <h4>Danh mục</h4>
              <ul>
                <li>
                  <Link to="/">Dụng cụ học tập</Link>
                  <Link to="/">Đồ điện tử</Link>
                  <Link to="/">Giáo Trình</Link>
                  <Link to="/">Đồng phục</Link>
                </li>
              </ul>
            </div>

            {/* Follow us */}
            <div className={styles.col}>
              <h4>Theo dõi</h4>
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/Toadtrade" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/toadtrade_vn/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.footerCoppyRight}>
        <div className={styles.container}>
          <div className={styles.rowCoppyRight}>
            <div className={styles.footerLeft}>
              <p>
                Copyright © 2023
                <Link to="/" className={styles.coppyRightToadTrade}>
                  ToadTrade
                </Link>
                . All rights reserved
              </p>
            </div>
            <div className={styles.footerRight}>
              <a href="https://www.facebook.com/Toadtrade" className={styles.facebook} target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/toadtrade_vn/" className={styles.tiktok} target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
export default Footer;
