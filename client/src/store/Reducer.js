import { LOG_OUT, SET_DATA } from "./Constants";

const data = JSON.parse(sessionStorage.getItem("data"));

export const initialState = {
  profile: data ? data.profile : {},
  accessToken: data ? data.accessToken : null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.state,
      };

    case LOG_OUT:
      sessionStorage.clear();
      return {
        ...state,
        profile: {},
        accessToken: null,
      };
    default:
      return state;
  }
};
