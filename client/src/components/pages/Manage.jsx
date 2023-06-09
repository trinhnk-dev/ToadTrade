import React from "react";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import styles from "./Manage.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Manage = () => {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [managePost, setManagePost] = useState([]);
  const postURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/post";
  const userURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userLogin"));
    if (user) {
      setProfile(user);
    }
    getManagePost();
  }, []);

  function getManagePost() {
    fetch(postURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setManagePost(data);
      })
      .catch((error) => console.log(error.message));
  }

  // Confirm to delete
  function confirmDelete(id) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePost(id),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function deletePost(id) {
    console.log(id);
    fetch(postURL + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        getManagePost();
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Success");
      })
      .catch((error) => console.log(error.message));
  }

  const columns = [
    { label: "Tiêu đề" },
    { label: "Giá" },
    { label: "Hình ảnh" },
    { label: "Độ mới" },
    { label: "Địa chỉ" },
    { label: "Mô tả" },
    { label: "Thể loại" },
    { label: "Cập nhật" },
    { label: "Xoá" },
  ];

  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productTitle}>
              <h3>Quản lý tin của {profile.name}</h3>
            </div>
            {/* {managePost.map((manage) => {
              if (manage.owner === profile.username) {
                return (
                  <div className={styles.productItem} key={manage.id}>
                    <div className={styles.productImage}>
                      <Link to={'detail/' + manage.id}>
                        <img src={manage.img} alt="" />
                      </Link>
                    </div>
                    <div className={styles.productText}>
                      <h4 className={styles.ellipsis}>{manage.name}</h4>
                      <h6>{manage.price} VNĐ</h6>
                      <div className={styles.infoFooter}>
                        <span>Độ mới: {manage.status}%</span>
                        <p>{manage.address}</p>
                      </div>
                      <button
                        color="red"
                        onClick={() => confirmDelete(manage.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              }
              // else {
              //   return (
              //     <div>
              //       <h3>Chưa có tin nào</h3>
              //     </div>
              //   )
              // }
            })} */}
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((col) => {
                    return <th>{col.label}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {managePost.map((manage) => {
                  if (manage.owner === profile.username) {
                    return (
                      <tr>
                        <td>{manage.name}</td>
                        <td>{manage.price}</td>
                        <td>
                          <img
                            src={manage.img}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{manage.status}</td>
                        <td>{manage.address}</td>
                        <td>{manage.description}</td>
                        {manage.type === "stationery" && <td>Họa cụ</td>}
                        {manage.type === "book" && <td>Giáo Trình</td>}
                        {manage.type === "tech" && <td>Công nghệ</td>}
                        {manage.type === "uniform" && <td>Đồng phục</td>}

                        <td>
                          <button className="btn">
                            <FontAwesomeIcon icon={faPencil} color="#ffcf02" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => confirmDelete(manage.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Manage;
