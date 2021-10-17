// post types
const POST_TYPES = {
  LOADING: "LOADING",
  SET_POST: "SET_POST",
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
  UPDATE_POST: "UPDATE_POST",
  DELETE_POST: "DELETE_POST",
  SET_COMMENT: "SET_COMMENT",
  ADD_COMMENT: "ADD_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_COMMENTS: "CLEAR_COMMENTS",
};
// user types
const USER_TYPES = {
  LOADING: "LOADING",
  SET_USERS: "SET_USERS",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};
// albums types
const ALBUM_TYPES = {
  LOADING: "LOADING",
  SET_ALBUMS: "SET_ALBUMS",
  SET_PHOTOS: "SET_PHOTOS",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_PHOTOS: "CLEAR_PHOTOS",
};
// combine types
const types = {
  post: POST_TYPES,
  user: USER_TYPES,
  album: ALBUM_TYPES,
};

export default types;
