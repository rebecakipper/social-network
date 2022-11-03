import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import * as immutableState from "redux-immutable-state-invariant";

export const store = createStore(
    reducer,
    applyMiddleware(immutableState.default())
);
