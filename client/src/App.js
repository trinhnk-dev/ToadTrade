import React, { useContext } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Accounts from "./components/pages/Accounts";
import Details from "./components/pages/Details";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreContext } from "./store";
import Users from "./components/users";
import Register from "./components/pages/Register";
import Chat from "./components/chat/Chat";
import CreatePost from "./components/pages/CreatePost";

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
            <Route path="/home/detail/:id" element={<Details />} />
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
            <Route path="/home/detail/:id" element={<Details />} />
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
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/accounts"
              element={<Accounts id={state.profile.id} />}
            />
            <Route path="/home/detail/:id" element={<Details />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
