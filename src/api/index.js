import axios from 'axios'
export const baseURL = 'http://localhost:5000'

// Authentication - Authorization
export const login = async (req, res, next) => {
  try {
    const { data: result } = await axios.post(`${baseURL}/login`, req)
    sessionStorage.setItem('data', JSON.stringify(result))
    return Promise.resolve(JSON.stringify(result))
  } catch (e) {
    return Promise.reject(e)
  }
}
export const loginwithGoogle = async (req, res, next) => {
  try {
    const { data: result } = await axios.get(
      `${baseURL}/api/auth/login/google`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':
            'http://localhost:5000/api/auth/login/google',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers':
            'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Credentials': true,
        },
      }
    )
    sessionStorage.setItem('data', JSON.stringify(result))
    return Promise.resolve(JSON.stringify(result))
  } catch (e) {
    return Promise.reject(e)
  }
}

export const register = async (req, res, next) => {
  try {
    const { data: result } = await axios.post(
      `${baseURL}/users/register`,
      req.values
    )
    return result
  } catch (e) {
    return e.response.data
  }
}

//USERS
export const getAllUsers = async (req, res) => {
  try {
    const { data: result } = await axios.get(`${baseURL}/users/all`, {
      headers: {
        access_token: req.token,
      },
    })
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

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
    )
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

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
    )
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { data: result } = await axios.delete(`${baseURL}/users/${req.id}`, {
      headers: {
        access_token: req.token,
      },
    })
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { data: result } = await axios.get(`${baseURL}/users/me/${req.id}`)
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

export const editProfile = async (req, res) => {
  try {
    const { data: result } = await axios.put(
      `${baseURL}/users/edit/${req.id}`,
      req.values
    )
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}
