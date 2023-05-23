import React, { useContext } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Accounts from "./components/pages/Accounts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Posts from "./components/posts";
import Players from "./components/players";
import DetailsPlayers from "./components/players/Details";
import { createBrowserHistory } from "history";
import { StoreContext } from "./store";
import AddPlayer from "./components/players/AddPlayer";
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
            <Route path="/posts" element={<Posts />} />
            <Route path="/upload" element={<AddPlayer />} />
            {/* <Route path="/players" element={<Players />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            {state.players.map((item, index) => (
              <Route
                key={index}
                path={`/players/${item._id}`}
                element={<DetailsPlayers id={item._id} disabled={true} />}
              />
            ))}
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
            <Route path="/posts" element={<Posts />} />
            <Route path="/upload" element={<AddPlayer />} />
            {/* <Route path="/players" element={<Players />} /> */}
            <Route path="/users" element={<Users />} />{" "}
            <Route
              path="/accounts"
              element={<Accounts id={state.profile.id} />}
            />
            {state.players.map((item, index) => (
              <Route
                key={index}
                path={`/players/${item._id}`}
                element={<DetailsPlayers id={item._id} />}
              />
            ))}
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
            <Route path="/posts" element={<Posts />} />
            <Route path="/upload" element={<AddPlayer />} />
            {/* <Route path="/players" element={<Players />} /> */}
            <Route
              path="/accounts"
              element={<Accounts id={state.profile.id} />}
            />
            {state.players.map((item, index) => (
              <Route
                key={index}
                path={`/players/${item._id}`}
                element={<DetailsPlayers id={item._id} disabled={true} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
