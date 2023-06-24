import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../../store'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api'
import * as Yup from 'yup'
import { message } from 'antd'
import Navbar from '../common/Navbar'
import styles from '../pages/Register.module.css'
import logoToadTrade from '../../images/toadtrade-logo2.png'
import Footer from './Footer'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
  const [image, setImage] = useState('')
  const imageInputRef = useRef(null)
  const baseUrl = 'https://6476f6b89233e82dd53a99bf.mockapi.io/user'
  const [state, dispatch] = useContext(StoreContext)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  const [usernameError, setUsernameError] = useState('')
  const submitImage = () => {
    if (!image) return
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'toadtrade')
    data.append('cloud_name', 'dilykkog3')

    fetch('https://api.cloudinary.com/v1_1/dilykkog3/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        register.setFieldValue('img', data.secure_url) // Set the image URL in the formik values
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const register = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
      img: '',
      phonenumber: 0,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Tên đăng nhập phải tối thiểu 5 ký tự')
        .max(25, 'Tên đăng nhập phải dưới 25 ký tự')
        .required('Không được để trống ô này'),
      password: Yup.string()
        .min(5, 'Mật khẩu phải tối thiểu 5 ký tự')
        .max(25, 'Mật khẩu phải dưới 25 ký tự')
        .required('Không được để trống ô này'),
      name: Yup.string()
        .min(5, 'Tên phải tối thiểu 5 ký tự')
        .max(25, 'Tên phải dưới 25 ký tự')
        .required('Không được để trống ô này'),
      img: Yup.string().required('Bạn phải tải ảnh lên'),
      phonenumber: Yup.string()
        .required()
        .matches(phoneRegExp, 'Số điện thoại này không tồn tại'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitImage()
        const response = await fetch(`${baseUrl}?username=${values.username}`)
        const data = await response.json()
        if (data.length > 0) {
          setUsernameError(
            'tên đăng nhập này đã được sử dụng, vui lòng nhập tên đăng nhập khác!'
          )
          return
        }
        resetForm()
        imageInputRef.current.value = ''

        const updatedValues = {
          ...values,
          count: 0,
          status: 'user',
        }
        const registerResponse = await fetch(baseUrl, {
          method: 'POST',
          body: JSON.stringify(updatedValues),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        })

        if (!registerResponse.ok) {
          throw new Error(`HTTP Status: ${registerResponse.status}`)
        } else {
          toast.success('Đăng ký thành công!')
        }

        resetForm()
      } catch (error) {
        console.log(error.message)
      }
    },
  })

  return (
    <>
      {contextHolder}
      <Navbar />
      <div
        className={styles.center}
        // onKeyPress={(e) => (e.key === "Enter" ? onRegister : {})}
      >
        <img
          src={logoToadTrade}
          alt="ToadTrade"
          className={styles.logoToadTrade}
        />

        <form onSubmit={register.handleSubmit} onChange={submitImage}>
          {/* UserName */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="username"
              value={register.values.username}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Tên đăng nhập</label>
            {register.errors.username && register.touched.username && (
              <p style={{ color: 'red' }}>{register.errors.username}</p>
            )}
            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
          </div>

          {/* Password */}
          <div className={styles.txtField}>
            <input
              type="password"
              name="password"
              value={register.values.password}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Mật khẩu</label>
            {register.errors.password && register.touched.password && (
              <p style={{ color: 'red' }}>{register.errors.password}</p>
            )}
          </div>

          {/* Name */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="name"
              value={register.values.name}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Họ và Tên</label>
            {register.errors.name && register.touched.name && (
              <p style={{ color: 'red' }}>{register.errors.name}</p>
            )}
          </div>

          <div className={styles.txtField}>
            <div className={styles.txtField} style={{ border: 0 }}>
              <label>Ảnh đại diện</label>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              name="img"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.input}
              style={{ marginTop: '20px' }}
            />
          </div>

          {/* Year of Birth */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="phonenumber"
              maxLength={10}
              pattern="[0-9]*"
              // placeholder="Type your year of birth"
              value={register.values.phonenumber}
              onChange={register.handleChange}
              required
            />
            <span></span>
            <label>Số điện thoại</label>
            {register.errors.phonenumber && register.touched.phonenumber && (
              <p style={{ color: 'red' }}>{register.errors.phonenumber}</p>
            )}
          </div>

          {/* Register Button */}
          <button type="submit" className={styles.register}>
            Đăng ký
          </button>

          {/* Link To Login */}
          <div className={styles.loginLink}>
            <span>Bạn đã có tài khoản?</span>
            <Link to="/login" className={styles.login}>
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Register
