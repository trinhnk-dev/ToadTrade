import React, { useContext } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Accounts from "./components/pages/Accounts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreContext } from "./store";
import Users from "./components/users";
import Register from "./components/pages/Register";

const history = createBrowserHistory();

function App() {
  const [state] = useContext(StoreContext);
  //Role Guests
  if (!state.accessToken) {
    return (
      <div className="App">
        <BrowserRouter history={history}>
          <Routes>
            <Route path="/*" element={<Navigate to="/home" />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  //Role Admin
  if (state.accessToken && state.profile.isAdmin) {
    return (
      <div className="App">
        <BrowserRouter history={history}>
          <Routes>
            <Route path="/*" element={<Navigate to="/home" />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />{" "}
            <Route
              path="/accounts"
              element={<Accounts id={state.profile.id} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  //Role User
  if (state.accessToken && !state.profile.isAdmin) {
    return (
      <div className="App">
        <BrowserRouter history={history}>
          <Routes>
            <Route path="/*" element={<Navigate to="/home" />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/accounts"
              element={<Accounts id={state.profile.id} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
