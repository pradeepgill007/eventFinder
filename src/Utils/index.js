import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxPromise from "redux-promise";
import Artist from "../reducers/artist";

const reducers = combineReducers({
  artist: Artist
});

export const testStore = (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  return createStoreWithMiddleware(reducers, initialState);
};
