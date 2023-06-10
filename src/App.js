import React from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Accounts from "./components/pages/Accounts";
import Details from "./components/pages/Details";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import Register from "./components/pages/Register";
import Chat from "./components/chat/Chat";
import CreatePost from "./components/pages/CreatePost";
import Manage from "./components/pages/Manage";
import Search from "./components/pages/Search";
import Payment from "./components/pages/Payment";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/detail/:id" element={<Details />} />
          <Route path="/search/detail/:id" element={<Details />} />
          <Route path="/search" element={<Search />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
