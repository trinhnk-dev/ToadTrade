import React, { useContext, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { StoreContext } from "../../store";
import { addNation, deleteNation, getNations } from "../../api";
import { message } from "antd";

function Posts() {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getNations();
      setPosts(response);
    }
    fetchMyAPI();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRefresh(true);
    const response = await addNation({
      values,
      token: state.accessToken,
    });
    if (response.status === 200) {
      info("success", response.message);
      setRefresh(false);
    } else {
      info("error", response.message);
      setRefresh(false);
    }
  };
  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    setRefresh(true);
    const confirm = window.confirm("Are you sure you want to delete ?");
    if (confirm) {
      const response = await deleteNation({
        id: id,
        token: state.accessToken,
      });
      console.log(response);
      if (response.status === 200) {
        info("success", response.message);
        setRefresh(false);
      } else {
        info("error", response.message);
        setRefresh(false);
      }
    }
    return;
  };
  return (
    <>
      {contextHolder}
      <Navbar styleNav="frontWeight:600px" />
      {state.profile.isAdmin ? (
        <>
          <div
            className="position-relative mt-3 container"
            style={{ zIndex: 1 }}
          >
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#addNation"
            >
              <i className="bi bi-plus-lg"></i>
              <span>New Nation</span>
            </button>
          </div>
          <div
            className="modal fade"
            id="addNation"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nameNation" className="col-form-label">
                        Name Nation:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameNation"
                        name="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descNation" className="col-form-label">
                        Description Nation:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="descNation"
                        name="description"
                        required
                        value={values.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-bs-dismiss={values ? "modal" : ""}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="container">
        <div className="row mt-5">
          {posts.status !== 201 ? (
            posts.map((item, index) => (
              <div key={index} className="col-3 mt-3">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={`https://cloudinary.fifa.com/api/v3/picture/flags-sq-4/${item.name.slice(
                      0,
                      3
                    )}`}
                    alt=""
                  />
                  <div className="card-body justify-content-between">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    {state.profile.isAdmin ? (
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => handleDelete(item._id)}
                      >
                        <i className="bi bi-trash3 text-danger mx-2"></i>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-sm-12 d-flex justify-content-center">
              <span>{posts.message}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
