import types from "../types";

const initialState = {
  loading: true,
  post: [],
  posts: [],
  comments: null,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.post.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.post.SET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
      };
    case types.post.ADD_POST:
      return {
        ...state,
        loading: false,
        post: [action.payload, ...state.post],
        error: null,
      };
    case types.post.UPDATE_POST:
      const index = state.post.findIndex(
        value => value.id === action.payload.id
      );
      state.post[index] = action.payload;
      return {
        ...state,
        loading: false,
      };
    case types.post.DELETE_POST:
      const filteredPost = state.post.filter(
        value => value.id !== action.payload
      );
      state.post = filteredPost;
      return {
        ...state,
        loading: false,
      };
    case types.post.SET_COMMENT:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      };
    case types.post.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case types.post.EDIT_COMMENT:
      const idx = state.comments.findIndex(val => val.id === action.payload.id);
      state.comments[idx] = action.payload;
      return {
        ...state,
      };
    case types.post.DELETE_COMMENT:
      const filteredComment = state.comments.filter(
        val => val.id !== action.payload
      );
      state.comments = filteredComment;
      return {
        ...state,
      };
    case types.post.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.post.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.post.CLEAR_COMMENTS:
      return {
        ...state,
        comments: null,
      };
    default:
      return state;
  }
};

export default postReducer;
