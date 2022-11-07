import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import { friendshipsReducer } from "./friendshipsReducer";

const rootReducer = combineReducers({
    friendships: friendshipsReducer,
    messages: messagesReducer,
});

export default rootReducer;
