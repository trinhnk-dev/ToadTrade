import styles from '../pages/Footer.module.css'
import footerLogo from '../../images/toadtrade-logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <body>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* Logo */}
            <div className={styles.col}>
              <img src={footerLogo} alt="" />
            </div>

            {/* Company */}
            <div className={styles.col}>
              <h4>ToadTrade</h4>
              <ul>
                <li>
                  <Link to="/">Về chúng tôi</Link>
                  <Link to="/">Dịch vụ</Link>
                  <Link to="/">Lịch sử hình thành</Link>
                </li>
              </ul>
            </div>

            {/* Get Help */}
            <div className={styles.col}>
              <h4>Truy cập</h4>
              <ul>
                <li>
                  <Link to="/">Đăng tin</Link>
                  <Link to="/">Quản lý tin</Link>
                  <Link to="/">Đơn hàng</Link>
                  <Link to="/">Chat</Link>
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
                <Link to="/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/">
                  <i className="fab fa-tiktok"></i>
                </Link>
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
              <Link to="facebook.com" className={styles.facebook}>
                <i class="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to="tiktok.com" className={styles.tiktok}>
                <i class="fa-brands fa-tiktok"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
export default Footer
