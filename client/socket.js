import { io } from "socket.io-client";
import {
    chatMessageReceived,
    chatMessagesReceived,
} from "./src/redux/reducers/messagesReducer";

export let clientSocket;

export const initSocket = (store) => {
    if (!clientSocket) {
        clientSocket = io.connect();

        clientSocket.on("chatMessages", (data) => {
            console.log({ data });
            store.dispatch(chatMessagesReceived(data));
        });

        clientSocket.on("chatMessage", (data) =>
            store.dispatch(chatMessageReceived(data))
        );
    }
};
