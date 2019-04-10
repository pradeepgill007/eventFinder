import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxPromise from "redux-promise";

import Artist from "./artist";

const reducers = combineReducers({
  artist: Artist
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
