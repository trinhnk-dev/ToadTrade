import React, { useContext, useEffect, useState } from 'react'
import styles from '../players/Details.module.css'

function Details({ id, disabled }) {
  const [APIData, setAPIData] = useState([])
  const baseURL = 'https://64135ff3c469cff60d61bf08.mockapi.io/toad/v1/products'
  useEffect(() => {
    getDetailPosts()
  }, [])

  function getDetailPosts() {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setAPIData(data)
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <>
      <div className={styles.stationery}>
        {APIData.map((detailPost) => (
          <div className={styles.details} key={detailPost.id}>
            <div className={styles.bigImg}>
              <img src={detailPost.img} alt="" />
            </div>

            <div className={styles.box}>
              <div className={styles.row}>
                <h2>{detailPost.name}</h2>
              </div>
              <p>{detailPost.description}</p>
              <p>{detailPost.time}</p>
              <div className={styles.contact}>{detailPost.price}</div>
              <button className={styles.cart}>0989 013 930</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Details
