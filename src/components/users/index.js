import React, { useContext, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { deleteUser, downUser, getAllUsers, raiseUser } from "../../api";
import { StoreContext, actions } from "../../store";

function Users() {
  const [state, dispatch] = useContext(StoreContext);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getAllUsers({ token: state.accessToken });
      setUsersList(response);
    }
    fetchMyAPI();
  }, [refresh]);
  const handleDown = async (id, token) => {
    setRefresh(true);
    const confirm = window.confirm("Are you sure to Down the User Role?");
    if (confirm) {
      const result = await downUser({ id, token });
      setMessage(result.message);
      setRefresh(false);
    }
  };

  const handleRaise = async (id, token) => {
    setRefresh(true);
    const confirm = window.confirm("Are you sure to Up the User Role?");
    if (confirm) {
      const result = await raiseUser({ id, token });
      setMessage(result.message);
      setRefresh(false);
    }
  };

  const handleDelete = async (id, token) => {
    setRefresh(true);
    const confirm = window.confirm("Are you sure to down the User Role?");
    if (confirm) {
      const result = await deleteUser({ id, token });
      setMessage(result.message);
      setRefresh(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row align-items-center mt-3">
          <div className="col-md-6">
            <div className="mb-3">
              <h5 className="card-title">
                List Users
                <span className="text-muted fw-normal ms-2">
                  ({usersList.length})
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div className="table-responsive">
                <table className="table project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr>
                      <th scope="col" className="ps-4" style={{ width: 50 }}>
                        <div className="form-check font-size-16">
                          <label
                            className="form-check-label"
                            htmlFor="contacusercheck"
                          ></label>
                        </div>
                      </th>
                      <th scope="col">UserName</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList !== [] ? (
                      usersList.map((item, index) => (
                        <tr key={index}>
                          <th scope="row" className="ps-4">
                            <div className="form-check font-size-16">
                              <label
                                className="form-check-label"
                                htmlFor="contacusercheck1"
                              ></label>
                            </div>
                          </th>
                          <td>{item.username}</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          {item.isAdmin ? (
                            <td>
                              <span className="badge badge-soft-success mb-0">
                                Admin
                              </span>
                            </td>
                          ) : (
                            <td>
                              <span className="badge badge-soft-danger mb-0">
                                User
                              </span>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
