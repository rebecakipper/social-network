import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clientSocket } from "../../../socket";

export default function Chat() {
    // const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages);
    const [message, setMessage] = useState("");

    const onChatKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            // no need to `fetch`! Just emit via the socket.
            clientSocket.emit("chatMessage", message);
            // clear the input field!
            setMessage("");
        }
    };

    const onMessageChange = (e) => {
        // update the message state (in this component only)
        setMessage(e.target.value);
    };

    // useEffect(() => {
    //     fetch("/chatStatus")
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             console.log(data);
    //             dispatch(chatMessagesReceived(data));
    //         });
    // }, []);
    // ...

    return (
        // ...
        <div className="new-message">
            <div className="-previous-messages-container">
                <ul>
                    {messages.map(({ id, message }) => {
                        return <li key={id}>{message}</li>;
                    })}
                </ul>
            </div>
            <textarea
                name="message"
                placeholder="Your message here"
                onKeyDown={(e) => onChatKeyDown(e)}
                onChange={(e) => onMessageChange(e)}
                value={message}
            ></textarea>
            {/* <button>Send</button> */}
        </div>
    );
}
