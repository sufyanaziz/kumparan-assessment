import types from "../types";
import axios from "../../lib/axios";

export const getPostByUserId = userId => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.get(`/users/${userId}/posts`);
    if (response.data) {
      dispatch({ type: types.post.SET_POST, payload: response.data });
    } else {
      dispatch({
        type: types.post.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const getCommentByPostId = postId => async dispatch => {
  try {
    const response = await axios.get(`/posts/${postId}/comments`);
    if (response.data) {
      dispatch({ type: types.post.SET_COMMENT, payload: response.data });
    } else {
      dispatch({
        type: types.post.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const addPost = data => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.post(`/posts`, data);
    if (response.data) {
      dispatch({ type: types.post.ADD_POST, payload: response.data });
      window.alert("Data is added");
    } else {
      dispatch({
        type: types.post.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
    window.alert("Something went wrong with the server");
  }
};

export const updatePost = data => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.put(`/posts/${data.id}`, data);
    if (response.data) {
      dispatch({ type: types.post.UPDATE_POST, payload: response.data });
      window.alert("Data is updated");
    } else {
      dispatch({
        type: types.post.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
    window.alert("Something went wrong with the server");
  }
};

export const deletePost = postId => async dispatch => {
  dispatch({ type: types.post.LOADING });
  try {
    const response = await axios.delete(`/posts/${postId}`);
    if (response.data) {
      dispatch({ type: types.post.DELETE_POST, payload: postId });
      window.alert("Data is removed");
    } else {
      dispatch({
        type: types.post.SET_ERROR,
        payload: {
          message: "something went wrong",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
    window.alert("Something went wrong with the server");
  }
};

export const addComments = comment => dispatch => {
  if (comment) {
    dispatch({ type: types.post.ADD_COMMENT, payload: comment });
    window.alert("Comment is added");
  } else {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const editComments = comment => dispatch => {
  if (comment) {
    dispatch({ type: types.post.EDIT_COMMENT, payload: comment });
    window.alert("Comment is edited");
  } else {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const deleteComments = commentId => dispatch => {
  if (commentId) {
    dispatch({ type: types.post.DELETE_COMMENT, payload: commentId });
    window.alert("Comment is deleted");
  } else {
    dispatch({
      type: types.post.SET_ERROR,
      payload: {
        message: "something went wrong",
      },
    });
  }
};

export const clearComments = () => dispatch => {
  dispatch({ type: types.post.CLEAR_COMMENTS });
};
