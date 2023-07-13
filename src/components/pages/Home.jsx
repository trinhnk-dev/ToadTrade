import React, { useContext, useEffect, useState } from "react";
import { logOut } from "../../store/Actions";
import Navbar from "../common/Navbar";
import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import carouselS1 from "../../images/carousel-sm-1.png";
import carouselS2 from "../../images/carousel-sm-2.png";
import { carouselList } from "../../data";
import { subBannerList } from "../../data";

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

  const [APIData, setAPIData] = useState([]);
  const baseURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";
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
        {/* Carousel */}
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

        {/* subBanner */}
        <div className={styles.container}>
          <div className={styles.subBanner}>
            {subBannerList.map((item) => {
              const { id, img, name, href } = item;
              return (
                <div className={styles.subBannerItem} key={id}>
                  <div className={styles.subBannerImg}>
                    <img src={img} alt="" />
                  </div>
                  <a href={href}>{name}</a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stationery */}
        <div className={styles.container} id="stationery">
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồ dùng học tập</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((stationery) => {
                if (stationery.type === "stationery" &&
                stationery.statusPost === 'isPosted') {
                  return (
                    <div className={styles.productItem} key={stationery.id}>
                      <div className={styles.productImage}>
                        <Link to={"detail/" + stationery.id}>
                          <img src={stationery.img} alt="" />
                        </Link>
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
                }
              })}
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className={styles.container} id="tech">
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồ công nghệ</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((tech) => {
                if (tech.type === "tech" &&
                tech.statusPost === 'isPosted') {
                  return (
                    <div className={styles.productItem} key={tech.id}>
                      <div className={styles.productImage}>
                        <Link to={"detail/" + tech.id}>
                          <img src={tech.img} alt="" />
                        </Link>
                      </div>
                      <div className={styles.productText}>
                        <h4 className={styles.ellipsis}>{tech.name}</h4>
                        <h6>{tech.price} VNĐ</h6>
                        <div className={styles.infoFooter}>
                          <span>Độ mới: {tech.status}%</span>
                          <p>{tech.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Book */}
        <div className={styles.container} id="book">
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Sách và giáo trình</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((book) => {
                if (book.type === "book" &&
                book.statusPost === 'isPosted') {
                  return (
                    <div className={styles.productItem} key={book.id}>
                      <div className={styles.productImage}>
                        <Link to={"detail/" + book.id}>
                          <img src={book.img} alt="" />
                        </Link>
                      </div>
                      <div className={styles.productText}>
                        <h4 className={styles.ellipsis}>{book.name}</h4>
                        <h6>{book.price} VNĐ</h6>
                        <div className={styles.infoFooter}>
                          <span>Độ mới: {book.status}%</span>
                          <p>{book.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Uniform */}
        <div className={styles.container} id="uniform">
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Đồng phục</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((uniform) => {
                if (uniform.type === "uniform" &&
                  uniform.statusPost === 'isPosted') {
                  return (
                    <div className={styles.productItem} key={uniform.id}>
                      <div className={styles.productImage}>
                        <Link to={"detail/" + uniform.id}>
                          <img src={uniform.img} alt="" />
                        </Link>
                      </div>
                      <div className={styles.productText}>
                        <h4 className={styles.ellipsis}>{uniform.name}</h4>
                        <h6>{uniform.price} VNĐ</h6>
                        <div className={styles.infoFooter}>
                          <span>Độ mới: {uniform.status}%</span>
                          <p>{uniform.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
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
