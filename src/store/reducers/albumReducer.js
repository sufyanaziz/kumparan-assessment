import types from "../types";

const initialState = {
  loading: true,
  albums: [],
  photos: null,
  error: null,
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.album.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.album.SET_ALBUMS:
      return {
        ...state,
        loading: false,
        albums: action.payload,
        error: null,
      };
    case types.album.SET_PHOTOS:
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: null,
      };
    case types.album.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.album.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.album.CLEAR_PHOTOS:
      return {
        ...state,
        photos: null,
      };
    default:
      return state;
  }
};

export default albumReducer;
