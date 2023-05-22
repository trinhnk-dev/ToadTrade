import axios from "axios";
export const baseURL = "http://localhost:5000";

// Authentication - Authorization
export const login = async (req, res, next) => {
  try {
    const { data: result } = await axios.post(`${baseURL}/login`, req);
    sessionStorage.setItem("data", JSON.stringify(result));
    return Promise.resolve(JSON.stringify(result));
  } catch (e) {
    return Promise.reject(e);
  }
};
export const loginwithGoogle = async (req, res, next) => {
  try {
    const { data: result } = await axios.get(
      `${baseURL}/api/auth/login/google`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            "http://localhost:5000/api/auth/login/google",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    sessionStorage.setItem("data", JSON.stringify(result));
    return Promise.resolve(JSON.stringify(result));
  } catch (e) {
    return Promise.reject(e);
  }
};

export const register = async (req, res, next) => {
  try {
    const { data: result } = await axios.post(
      `${baseURL}/users/register`,
      req.values
    );
    return result;
  } catch (e) {
    return e.response.data;
  }
};

//PLAYERS
export const getPlayers = async () => {
  try {
    const { data: result } = await axios.get(`${baseURL}/players/`);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPlayerByID = async (id) => {
  try {
    const { data: result } = await axios.get(`${baseURL}/players/${id}`);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addPlayer = async (req, res) => {
  try {
    const { data: result } = await axios.post(
      `${baseURL}/players/add`,
      req.values,
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const editPlayer = async (req, res) => {
  try {
    const { data: result } = await axios.put(
      `${baseURL}/players/${req.id}`,
      req.values,
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deletePlayerByID = async (req, res) => {
  try {
    const { data: result } = await axios.delete(
      `${baseURL}/players/${req.id}`,
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

//USERS
export const getAllUsers = async (req, res) => {
  try {
    const { data: result } = await axios.get(`${baseURL}/users/all`, {
      headers: {
        access_token: req.token,
      },
    });
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const raiseUser = async (req, res) => {
  try {
    const { data: result } = await axios.put(
      `${baseURL}/users/up/${req.id}`,
      {},
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const downUser = async (req, res) => {
  try {
    const { data: result } = await axios.put(
      `${baseURL}/users/down/${req.id}`,
      {},
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { data: result } = await axios.delete(`${baseURL}/users/${req.id}`, {
      headers: {
        access_token: req.token,
      },
    });
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { data: result } = await axios.get(`${baseURL}/users/me/${req.id}`);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const editProfile = async (req, res) => {
  try {
    const { data: result } = await axios.put(
      `${baseURL}/users/edit/${req.id}`,
      req.values
    );
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

//NATIONS

export const getNations = async () => {
  try {
    const { data: result } = await axios.get(`${baseURL}/nations/`);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addNation = async (req, res) => {
  try {
    const { data: result } = await axios.post(
      `${baseURL}/nations/add`,
      req.values,
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteNation = async (req, res) => {
  try {
    const { data: result } = await axios.delete(
      `${baseURL}/nations/${req.id}`,
      {
        headers: {
          access_token: req.token,
        },
      }
    );
    console.log(result);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};
