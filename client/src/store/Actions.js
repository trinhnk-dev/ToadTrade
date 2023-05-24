import { LOG_OUT, SET_DATA } from "./Constants";

export const setState = (state) => ({
  type: SET_DATA,
  state,
});

export const logOut = () => ({
  type: LOG_OUT,
});
