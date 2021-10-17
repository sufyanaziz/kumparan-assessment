import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import albumReducer from "./reducers/albumReducer";

const initialState = {};
const middleWare = [thunk];
// webDevTools just for dev --------
// const webDevtoolsExtension =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = combineReducers({
  users: userReducer,
  posts: postReducer,
  albums: albumReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleWare)
    // webDevtoolsExtension
  )
);

export default store;
