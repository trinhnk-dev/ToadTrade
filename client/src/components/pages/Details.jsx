import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const baseURL =
    "https://64135ff3c469cff60d61bf08.mockapi.io/toad/v1/DetailPost";

  useEffect(() => {
    getDetailPosts();
  }, []);

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

  return (
    <>
      <div className={styles.stationery}>
        <div className={styles.details}>
          <div className={styles.bigImg}>
            <img src={product.img} alt="" />
          </div>

          <div className={styles.box}>
            <div className={styles.row}>
              <h2>{product.name}</h2>
            </div>
            <p>{product.description}</p>
            {/* <p>{product.time}</p> */}
            <div className={styles.contact}>{product.price}</div>
            <button className={styles.cart}>0989 013 930</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
