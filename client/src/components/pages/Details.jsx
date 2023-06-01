import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import { stationeryList } from "../../data";

function Details() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(id);

  const baseURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";

  const [isContactClicked, setIsContactClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0989 013 930");
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    getDetailPosts();
  }, []);

  useEffect(() => {
    getDetailPosts();
  }, [selectedProductId]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleContactClick = () => {
    setIsContactClicked(!isContactClicked);
  };

  function getDetailPosts() {
    fetch(baseURL + "/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log(error.message));
  }

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
        <div className={styles.container}>
          <div className={styles.stationery}>
            <div className={styles.details}>
              <div className={styles.bigImg}>
                <img src={product.img} alt="" />
              </div>

              <div className={styles.box}>
                <div className={styles.boxContent}>
                  <h2>{product.name}</h2>
                </div>
                <p>Mô tả: {product.description}</p>
                {/* <p>{product.time}</p> */}
                <div className={styles.contact}>
                  <h6>Giá: {product.price} VNĐ</h6>
                </div>
                <div className={styles.clickToContact}>
                  <button className={styles.phone} onClick={handleContactClick}>
                    {isContactClicked ? phoneNumber : "Bấm để hiện số"}
                  </button>
                  <Link to="/chat" className={styles.chat}>
                    Ấn để chat với người bán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Các sản phẩm khác</h3>
            </div>
            <div className={styles.productContent}>
              {APIData.map((stationery) => {
                return (
                  <div
                    className={styles.productItem}
                    key={stationery.id}
                    onClick={() => handleProductClick(stationery.id)}
                  >
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
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Details;
