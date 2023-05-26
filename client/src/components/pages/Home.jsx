import React, { useContext, useEffect, useState } from "react";
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
import { carouselList } from "../../data";
import { subBannerList } from "../../data";
import { stationeryList } from "../../data";
import { techDevice } from "../../data";
import { bookList } from "../../data";
import { uniformList } from "../../data";

import { Link, useNavigate } from "react-router-dom";
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

  const handleNavigate = (id) => {
    return navigate(`/players/${id}`);
  };

  const [APIData, setAPIData] = useState([]);
  const baseURL =
    "https://64135ff3c469cff60d61bf08.mockapi.io/toad/v1/DetailPost";
  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container} style={{ marginBottom: "0" }}>
          <div className={styles.carousel}>
            <div className={styles.carouselBig}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {carouselList.map((item) => {
                  const { id, img } = item;
                  return (
                    <Carousel.Item key={id}>
                      <img className="d-block w-100" src={img} alt="" />
                    </Carousel.Item>
                  );
                })}
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
          <div className={styles.subBanner}>
            {subBannerList.map((item) => {
              const { id, img, name } = item;
              return (
                <div className={styles.subBannerItem} key={id}>
                  <div className={styles.subBannerImg}>
                    <img src={img} alt="" />
                  </div>
                  <Link to="/">{name}</Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stationery */}
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Những sản phẩm đang bán</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((stationery) => {
                return (
                  <div className={styles.productItem} key={stationery.id}>
                    <div className={styles.productImage}>
                      <img src={stationery.img} alt="" />
                    </div>
                    <div className={styles.productText}>
                      <h4 className={styles.ellipsis}>{stationery.name}</h4>
                      <h6>{stationery.price} VNĐ</h6>
                      <div className={styles.infoFooter}>
                        <span>Độ mới: {stationery.status}%</span>
                        <p>{stationery.address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech */}
        {/* <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồ công nghệ</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((tech) => {
                if (tech.type === "tech") {
                  return (
                    <div className={styles.productItem} key={tech.id}>
                      <div className={styles.productImage}>
                        <img src={tech.img} alt="" />
                      </div>
                      <div className={styles.productText}>
                        <h4>{tech.name}</h4>
                        <h6>{tech.price}</h6>
                        <div className={styles.infoFooter}>
                          <span>{tech.time}</span>
                          <p>{tech.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div> */}

        {/* Book */}
        {/* <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Giáo Trình</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((book) => {
                if (book.type === "book") {
                  return (
                    <div className={styles.productItem} key={book.id}>
                      <div className={styles.productImage}>
                        <img src={book.img} alt="" />
                      </div>
                      <div className={styles.productText}>
                        <h4>{book.name}</h4>
                        <h6>{book.price}</h6>
                        <div className={styles.infoFooter}>
                          <span>{book.time}</span>
                          <p>{book.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div> */}

        {/* Uniform */}
        {/* <div
          className={styles.container}
          style={{ marginBottom: 0, paddingBottom: "80px" }}
        >
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồng phục</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((uniform) => {
                if (uniform.type === "uniform") {
                  return (
                    <div className={styles.productItem} key={uniform.id}>
                      <div className={styles.productImage}>
                        <img src={uniform.img} alt="" />
                      </div>
                      <div className={styles.productText}>
                        <h4>{uniform.name}</h4>
                        <h6>{uniform.price}</h6>
                        <div className={styles.infoFooter}>
                          <span>{uniform.time}</span>
                          <p>{uniform.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div> */}
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
