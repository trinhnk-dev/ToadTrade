import {
  LOG_OUT,
  SET_DATA,
  SET_NATION,
  SET_PLAYER,
} from "./Constants";

export const setState = (state) => ({
  type: SET_DATA,
  state,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setPlayer = (state) => ({
  type: SET_PLAYER,
  state,
});

export const setNation = (state) => ({
  type: SET_NATION,
  state,
});
