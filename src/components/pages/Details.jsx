import React, { useContext, useEffect, useState } from 'react'
import styles from './Details.module.css'
import { Link, useParams } from 'react-router-dom'
import { Image } from 'antd'
import Navbar from '../common/Navbar'
import Footer from './Footer'

function Details() {
  const { id } = useParams()

  const [product, setProduct] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(id)

  const baseURL = 'https://6476f6b89233e82dd53a99bf.mockapi.io/post'
  const userURL = 'https://6476f6b89233e82dd53a99bf.mockapi.io/user'

  const [phoneNumber, setPhoneNumber] = useState([])
  const [APIData, setAPIData] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        await getDetailPosts()
        await getPosts()
        await getUsers()
        // comparePostAndUser()
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    comparePostAndUser()
  }, [users, product])

  const handleProductClick = (productId) => {
    setSelectedProductId(productId)
  }

  const handleContactClick = () => {
    // Số điện thoại cần kết nối với Zalo
    const zaloLink = `https://zalo.me/${phoneNumber}`
    window.open(zaloLink, '_blank')
  }

  async function getDetailPosts() {
    try {
      const response = await fetch(baseURL + '/' + id)
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`)
      }
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getPosts() {
    try {
      const response = await fetch(baseURL)

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`)
      }
      const data = await response.json()

      setAPIData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getUsers() {
    try {
      const response = await fetch(userURL)

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const comparePostAndUser = async () => {
    const userWithMatchingUsername = await users.find(
      (user) => user.username === product.owner
    )
    if (userWithMatchingUsername) {
      setPhoneNumber(userWithMatchingUsername.phonenumber)
    }
  }
  console.log(phoneNumber)

  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.stationery}>
            <div className={styles.details}>
              <div className={styles.bigImg}>
                <Image src={product.img} />
              </div>

              <div className={styles.box}>
                <div className={styles.boxContent}>
                  <h2>{product.name}</h2>
                </div>
                <p>Mô tả: {product.description}</p>
                {/* <p>{product.time}</p> */}
                <div className={styles.price}>
                  <h6>Giá: {product.price} VNĐ</h6>
                </div>

                <div className={styles.contact}>
                  <div className={styles.clickToChat}>
                    <p style={{ fontWeight: 600 }}>Liên hệ: {phoneNumber}</p>
                  </div>
                  <div>
                    <p>Hoặc</p>
                  </div>
                  <div className={styles.clickToContact}>
                    <button
                      className={styles.chatZalo}
                      onClick={handleContactClick}
                    >
                      <p
                        style={{ fontWeight: 600, textDecoration: 'underline' }}
                      >
                        Nhắn tin Zalo
                      </p>
                    </button>
                  </div>
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
                      <Link to={'detail/' + stationery.id}>
                        <img src={stationery.img} alt="" />
                      </Link>
                    </div>
                    <div className={styles.productText}>
                      <h4 className={styles.ellipsis}>{stationery.name}</h4>
                      {stationery.type === 'stationery' && (
                        <h6>{stationery.price} VNĐ</h6>
                      )}
                      {stationery.type === 'book' && (
                        <h6>{stationery.price} VNĐ</h6>
                      )}
                      {stationery.type === 'tech' && (
                        <h6>{stationery.price} VNĐ</h6>
                      )}
                      {stationery.type === 'uniform' && (
                        <h6>{stationery.price} VNĐ</h6>
                      )}

                      <div className={styles.infoFooter}>
                        <span>Độ mới: {stationery.status}%</span>
                        <p>{stationery.address}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Details
