import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../store";
import { logOut } from "../../store/Actions";
import { Tooltip } from "antd";
import logoToadTrade from "../../images/toadtrade-logo.png";
import styles from "../common/Navbar.module.css";
// import Container from "react-bootstrap/Container";
import { navData, iconData } from "./NavData";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";

function Navbar() {
  const userNavigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState([]);
  const [state, dispatch] = useContext(StoreContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const headerHeight = 102;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset; // Vị trí cuộn hiện tại của trang
      const headerHeight = 102; // Chiều cao của header

      // Nếu vị trí cuộn lớn hơn chiều cao của header, thì đặt opacity thành 0.75, ngược lại đặt opacity thành 1
      if (currentScroll > headerHeight) {
        setNavbarOpacity(0.8);
      } else {
        setNavbarOpacity(1);
      }
    };

    // Thêm sự kiện cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Xóa sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textSearch = <span>Tìm kiếm</span>;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://6476f6b89233e82dd53a99bf.mockapi.io/post"
      );
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userLogin");
    setIsLoggedIn(false);
    userNavigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userLogin"));
    if (user) {
      setIsLoggedIn(true);
      setProfile(user);
    }
  }, []);

  const [user, setUser] = useState([]);
  const baseURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      <header className={styles.header} style={{ opacity: navbarOpacity }}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.navLogo}>
              <Link to="/" className={styles.navLink}>
                <div className={styles.imgLogo}>
                  <img src={logoToadTrade} alt="logo toad trade" />
                </div>

                <span style={{ fontWeight: "600" }}>ToadTrade</span>
              </Link>
            </div>
            <div className={styles.offCanvasButton}>
              <button onClick={handleShow}>
                <span class="navbar-toggler-icon">
                  <i class="fa-solid fa-bars"></i>
                </span>
              </button>
            </div>

            <div className={styles.navBar}>
              {navData.map((item) => {
                const { id, link, name, icon } = item;
                return (
                  <div className={styles.navItem} key={id}>
                    {isLoggedIn ? (
                      <div className={styles.navBarContent}>
                        <div className={styles.navText}>
                          <Link to={link} className={styles.navLink}>
                            <span
                              dangerouslySetInnerHTML={{ __html: icon }}
                            ></span>
                            <span className={styles.navName}>{name}</span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link to="/login" className={styles.navLink}>
                        {" "}
                        <span dangerouslySetInnerHTML={{ __html: icon }}></span>
                        <span className={styles.navName}>{name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}

              <Offcanvas
                show={show}
                onHide={handleClose}
                className={styles.offCanVas}
                style={{
                  background:
                    "linear-gradient(to bottom , #ffc501    , #fed843, #ffb101)",
                }}
                placement="end"
              >
                <Offcanvas.Header
                  closeButton
                  className={styles.offCanvasHeader}
                >
                  <Link to="/" className={styles.navLink}>
                    <div className={styles.imgLogo}>
                      <img src={logoToadTrade} alt="logo toad trade" />
                    </div>

                    <span
                      style={{
                        marginLeft: "10px",
                        fontWeight: "600",
                        fontSize: "24px",
                      }}
                    >
                      ToadTrade
                    </span>
                  </Link>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {/* <form className={styles.formSearch}>
                    <input
                      className={styles.formControl}
                      type="search"
                      aria-label="Search"
                      placeholder="Tìm kiếm..."
                    />
                  </form> */}
                  {navData.map((item) => {
                    const { id, name, link } = item;
                    return (
                      <div className={styles.navItem} key={id}>
                        {isLoggedIn ? (
                          <div className={styles.navBarContent}>
                            <div className={styles.navOffCanvas}>
                              <Link to={link} className={styles.navLink}>
                                <span className={styles.navName}>{name}</span>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <Link to="/login" className={styles.navLink}>
                            {" "}
                            <span className={styles.navName}>{name}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <Link
                    to="/search"
                    className={styles.navName}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      marginTop: "10px",
                    }}
                  >
                    Tìm kiếm
                  </Link>

                  {isLoggedIn ? (
                    <Dropdown className={styles.showName}>
                      <Dropdown.Toggle
                        id="dropdown-autoclose-true"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          boxShadow: "none",
                          color: "black",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className=" ml-3"
                          style={{ textTransform: "capitalize" }}
                        >
                          {user
                            .filter(
                              (user) =>
                                user.username === profile.username &&
                                user.password === profile.password
                            )
                            .map((user) => (
                              <span className={styles.navName} key={user.id}>
                                <div className={styles.avatarNav}>
                                  <img src={profile.img} alt="" />
                                </div>
                                {user.name}
                              </span>
                            ))}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Link to="/accounts" className={styles.signTo}>
                          <div className={styles.btnSign}>
                            <button type="button" className="btn d-block">
                              Edit Profile
                            </button>
                          </div>
                        </Link>
                        <div
                          className={styles.btnSignOut}
                          onClick={handleLogout}
                        >
                          <button type="button" className="btn d-block">
                            Log Out
                          </button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <div>
                      <Link to="/login" className={styles.signToCanvas}>
                        <div>
                          <button
                            type="button"
                            className={styles.btnSignCanvas}
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </Link>

                      <Link to="/register" className={styles.signToCanvas}>
                        <div>
                          <button
                            type="button"
                            className={styles.btnSignCanvas}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </Link>
                    </div>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <div className={styles.navIcons}>
              <div className={styles.navIcon}>
                <div style={{ color: "black" }}>
                  <Tooltip placement="bottom" title={textSearch}>
                    <Link to="/search">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </Link>
                  </Tooltip>
                </div>
              </div>

              <div className={styles.navIcon}>
                <div style={{ color: "black" }}>
                  <span>
                    <i class="fa-regular fa-bell"></i>
                  </span>
                </div>
              </div>
              <div className={styles.navIcon}>
                {isLoggedIn ? (
                  <Dropdown>
                    <div className={styles.showName}>
                      <Dropdown.Toggle
                        id="dropdown-autoclose-true"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          boxShadow: "none",
                          color: "black",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className=" ml-3"
                          style={{ textTransform: "capitalize" }}
                        >
                          {user
                            .filter(
                              (user) =>
                                user.username === profile.username &&
                                user.password === profile.password
                            )
                            .map((user) => (
                              <span className={styles.navName} key={user.id}>
                                <div className={styles.avatarNav}>
                                  <img src={profile.img} alt="" />
                                </div>
                                {user.name}
                              </span>
                            ))}
                        </span>
                      </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu>
                      <Link to="/accounts" className={styles.signTo}>
                        <div className={styles.btnSign}>
                          <button type="button" className="btn d-block">
                            Xem thông tin
                          </button>
                        </div>
                      </Link>
                      <div className={styles.btnSign} onClick={handleLogout}>
                        <button type="button" className="btn d-block">
                          Đăng xuất
                        </button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Dropdown
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Dropdown.Toggle
                      id="dropdown-autoclose-true"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "black",
                        padding: 0,
                      }}
                    >
                      <span>
                        <i className="fa-regular fa-user"></i>
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link to="/login" className={styles.signTo}>
                        <div className={styles.btnSign}>
                          <button type="button" className="btn d-block">
                            Đăng nhập
                          </button>
                        </div>
                      </Link>

                      <Link to="/register" className={styles.signTo}>
                        <div className={styles.btnSign}>
                          <button type="button" className="btn d-block">
                            Đăng ký
                          </button>
                        </div>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
