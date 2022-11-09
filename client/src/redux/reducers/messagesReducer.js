export const CHAT_MESSAGES_RECEIVED = "/messages/receivedMany";
export const CHAT_MESSAGE_RECEIVED = "/messages/receivedOne";

export default function messagesReducer(messages = [], action) {
    switch (action.type) {
        case CHAT_MESSAGES_RECEIVED:
            return action.payload.messages;
        case CHAT_MESSAGE_RECEIVED:
            // add the new message to the old array
            return [action.payload.message, ...messages];
        default:
            return messages;
    }
}

export function chatMessagesReceived(messages) {
    return {
        type: CHAT_MESSAGES_RECEIVED,
        payload: { messages },
    };
}

export function chatMessageReceived(message) {
    return {
        type: CHAT_MESSAGE_RECEIVED,
        payload: { message },
    };
}
