import types from "../types";

const initialState = {
  loading: true,
  users: [],
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.user.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.user.SET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.user.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.user.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.user.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
