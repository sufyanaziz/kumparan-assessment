import types from "../types";
import axios from "../../lib/axios";

export const getUsers = () => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.get("/users");
    if (response.data) {
      dispatch({ type: types.user.SET_USERS, payload: response.data });
      dispatch({ type: types.user.CLEAR_ERROR });
    } else {
      dispatch({
        type: types.user.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.user.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const getUser = id => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.get(`/users/${id}`);
    if (response.data) {
      dispatch({ type: types.user.SET_USER, payload: response.data });
      dispatch({ type: types.user.CLEAR_ERROR });
    } else {
      dispatch({
        type: types.user.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.user.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};
