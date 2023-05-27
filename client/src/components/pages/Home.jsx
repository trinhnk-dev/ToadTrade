import React, { useContext, useEffect, useState } from "react";
import { logOut } from "../../store/Actions";
import Navbar from "../common/Navbar";
import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
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
                      <button>
                        <Link
                          to={"detail/" + stationery.id}
                          style={{ textDecoration: "none", color: "#0078D2" }}
                        >
                          Detail
                        </Link>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
