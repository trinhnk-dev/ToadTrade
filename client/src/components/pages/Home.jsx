import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../store/Actions";
import Navbar from "../common/Navbar";
import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import carouselL1 from "../../images/carousel-big-1.png";
import carouselL2 from "../../images/carousel-big-2.png";
import carouselL3 from "../../images/carousel-big-3.png";
import carouselL4 from "../../images/carousel-big-4.png";
import carouselS1 from "../../images/carousel-sm-1.png";
import carouselS2 from "../../images/carousel-sm-2.png";
import { stationeryList } from "../../data";
import { techDevice } from "../../data";
import { bookList } from "../../data";
import { uniformList } from "../../data";

import { useNavigate } from "react-router-dom";
import { StoreContext, actions } from "../../store";
import { deletePlayerByID, getPlayers } from "../../api";
import Footer from "./Footer";

function Home() {
  const [state, dispatch] = useContext(StoreContext);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const onLogout = async () => {
    await dispatch(logOut());
  };
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getPlayers();
      dispatch(actions.setPlayer(response));
      sessionStorage.setItem("players", JSON.stringify(response));
    }
    fetchMyAPI();
  }, []);

  const handleDelete = async (id, token) => {
    const confirm = window.confirm("Are you sure you want to delete ?");
    if (confirm) {
      await dispatch(deletePlayerByID({ id, token }));
    }
    return;
  };

  const handleNavigate = (id) => {
    return navigate(`/players/${id}`);
  };
  return (
    <>
      <Navbar />
      <div className={styles.wrapperBanner}>
        <div className={styles.container}>
          <div className={styles.carousel}>
            <div className={styles.carouselBig}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={carouselL1}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={carouselL2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={carouselL3}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={carouselL4}
                    alt="Fourth slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className={styles.carouselSmall}>
              <Link to="/">
                <div className={styles.carouselSTop}>
                  <img src={carouselS1} alt="" />
                </div>
              </Link>
              <Link to="/">
                <div className={styles.carouselSBottom}>
                  <img src={carouselS2} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Họa cụ & đồ dùng học tập</h3>
            </div>
            <div className={styles.productContent}>
              {stationeryList.map((item) => {
                const { id, name, price, img, time, address } = item;
                return (
                  <div className={styles.productItem} key={id}>
                    <div className={styles.productImage}>
                      <img src={img} alt="" />
                    </div>
                    <div className={styles.productText}>
                      <h4>{name}</h4>
                      <h6>{price}</h6>
                      <div className={styles.infoFooter}>
                        <span>{time}</span>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồ công nghệ</h3>
            </div>
            <div className={styles.productContent}>
              {techDevice.map((item) => {
                const { id, name, price, img, time, address } = item;
                return (
                  <div className={styles.productItem} key={id}>
                    <div className={styles.productImage}>
                      <img src={img} alt="" />
                    </div>
                    <div className={styles.productText}>
                      <h4>{name}</h4>
                      <h6>{price}</h6>
                      <div className={styles.infoFooter}>
                        <span>{time}</span>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Giáo Trình</h3>
            </div>
            <div className={styles.productContent}>
              {bookList.map((item) => {
                const { id, name, price, img, time, address } = item;
                return (
                  <div className={styles.productItem} key={id}>
                    <div className={styles.productImage}>
                      <img src={img} alt="" />
                    </div>
                    <div className={styles.productText}>
                      <h4>{name}</h4>
                      <h6>{price}</h6>
                      <div className={styles.infoFooter}>
                        <span>{time}</span>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồng phục</h3>
            </div>
            <div className={styles.productContent}>
              {uniformList.map((item) => {
                const { id, name, price, img, time, address } = item;
                return (
                  <div className={styles.productItem} key={id}>
                    <div className={styles.productImage}>
                      <img src={img} alt="" />
                    </div>
                    <div className={styles.productText}>
                      <h4>{name}</h4>
                      <h6>{price}</h6>
                      <div className={styles.infoFooter}>
                        <span>{time}</span>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="mt-3 p-2 d-flex justify-content-center">
          <div className="flex-nowrap input-group w-50 row">
            <label
              htmlFor="searchInput"
              className="col-sm-2 col-form-label text-end"
            >
              Search:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {state.players.map((data, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 border-0">
              <div
                onClick={(e) => handleNavigate(data._id)}
                key={index}
                className="profile-card text-center"
              >
                {data.image ? (
                  <img src={data.image} className="img card-img" alt="" />
                ) : (
                  <img
                    src="https://ae01.alicdn.com/kf/UT8PyDTXsFXXXagOFbXy/12-15CM-Football-Players-Reflective-Car-Decorative-Stickers-Decals-Classic-Car-Body-Cover-Scratches-Accessories-C4.jpg_Q90.jpg_.webp"
                    className="img card-img"
                    alt=""
                  />
                )}
                {state.profile.isAdmin ? (
                  <div className="profile-actions">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={(e) => handleDelete(data._id, state.accessToken)}
                    >
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                ) : null}
                <div className="profile-name">{data.name}</div>
                <div className="profile-overview">
                  <div className="profile-overview">
                    <div className="row text-center">
                      <div className="col-sm-4 align-items-center d-flex flex-column">
                        <h6>{data.club}</h6>
                        <p>Club</p>
                      </div>
                      <div className="col-sm-4 align-items-center d-flex flex-column">
                        <h6>{data.position}</h6>
                        <p>Position</p>
                      </div>
                      <div className="col-sm-4 align-items-center d-flex flex-column">
                        <h6>{data.goals}</h6>
                        <p>Goals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <Footer />
    </>
  );
}

export default Home;
