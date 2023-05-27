import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store";
import { logOut } from "../../store/Actions";
import logoToadTrade from "../../images/toadtrade-logo.png";
import styles from "../common/Navbar.module.css";
// import Container from "react-bootstrap/Container";
import { navData, iconData } from "./NavData";
import Dropdown from "react-bootstrap/Dropdown";

function Navbar() {
  const [state, dispatch] = useContext(StoreContext);

  const onLogout = async () => {
    await dispatch(logOut());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.navLogo}>
              <Link to="/" className={styles.navLink}>
                <div className={styles.imgLogo}>
                  <img src={logoToadTrade} alt="logo toad trade" />
                </div>

                <span style={{ marginLeft: "10px", fontWeight: "600" }}>
                  ToadTrade
                </span>
              </Link>
            </div>
            <div className={styles.navBar}>
              {navData.map((item) => {
                const { id, link, name, icon } = item;
                return (
                  <div className={styles.navItem} key={id}>
                    {state.accessToken ? (
                      <Link to={link} className={styles.navLink}>
                        <span dangerouslySetInnerHTML={{ __html: icon }}></span>
                        <span className={styles.navName}>{name}</span>
                      </Link>
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
            </div>
            <div className={styles.navIcons}>
              <div className={styles.navIcon}>
                <div style={{ color: "white" }}>
                  <span>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
              <div className={styles.navIcon}>
                <div style={{ color: "white" }}>
                  <span>
                    <i class="fa-regular fa-bell"></i>
                  </span>
                </div>
              </div>
              <div className={styles.navIcon}>
                {state.accessToken ? (
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
                        color: "white",
                        padding: 0,
                      }}
                    >
                      <span
                        className=" ml-3"
                        style={{ textTransform: "capitalize" }}
                      >
                        {state.profile.name}
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
                      <div className={styles.btnSign} onClick={onLogout}>
                        <button type="button" className="btn d-block">
                          Log Out
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
                        color: "white",
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
                            Log In
                          </button>
                        </div>
                      </Link>

                      <Link to="/register" className={styles.signTo}>
                        <div className={styles.btnSign}>
                          <button type="button" className="btn d-block">
                            Register
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
