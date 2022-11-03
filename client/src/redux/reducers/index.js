import { combineReducers } from "redux";

import { friendshipsReducer } from "./friendshipsReducer";

const rootReducer = combineReducers({
    friendships: friendshipsReducer,
});

export default rootReducer;
