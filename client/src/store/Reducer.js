import { LOG_OUT, SET_DATA, SET_NATION, SET_PLAYER } from "./Constants";

const data = JSON.parse(sessionStorage.getItem("data"));
const players = JSON.parse(sessionStorage.getItem("players"));
const nations = JSON.parse(sessionStorage.getItem("nations"));

export const initialState = {
  profile: data ? data.profile : {},
  accessToken: data ? data.accessToken : null,
  players: players ? players : [],
  nations: nations ? nations : [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.state,
      };
    case SET_PLAYER:
      return {
        ...state,
        players: [...action.state],
      };
    case SET_NATION:
      return {
        ...state,
        nations: [...action.state],
      };

    case LOG_OUT:
      sessionStorage.clear();
      return {
        ...state,
        profile: {},
        accessToken: null,
        player: [],
        nations: [],
      };
    default:
      return state;
  }
};
