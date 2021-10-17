import types from "../types";
import axios from "../../lib/axios";

export const getAlbumsByUserId = userId => async dispatch => {
  dispatch({ type: types.album.LOADING });
  try {
    const response = await axios.get(`/users/${userId}/albums`);
    if (response.data) {
      dispatch({ type: types.album.SET_ALBUMS, payload: response.data });
    } else {
      dispatch({
        type: types.album.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.album.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const getPhotoByAlbumId = albumId => async dispatch => {
  try {
    const response = await axios.get(`/albums/${albumId}/photos`);
    if (response.data) {
      dispatch({ type: types.album.SET_PHOTOS, payload: response.data });
    } else {
      dispatch({
        type: types.album.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.album.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const clearPhotos = () => dispatch => {
  dispatch({ type: types.album.CLEAR_PHOTOS });
};
