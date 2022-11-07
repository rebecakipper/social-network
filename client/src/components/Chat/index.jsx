import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clientSocket } from "../../../socket";
import Other_profile_picture from "../other_profile_picture/index.jsx";

export default function Chat() {
    // const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages);
    const [message, setMessage] = useState("");
    console.log(messages);

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

    return (
        <div className="new-message">
            <div className="previous-messages-container">
                <ul>
                    {messages.map(
                        ({
                            id,
                            message,
                            first_name,
                            last_name,
                            profile_picture_url,
                        }) => {
                            return (
                                <div className="flex-rows">
                                    <Other_profile_picture
                                        url={profile_picture_url}
                                    />
                                    <li className="message-container" key={id}>
                                        <h5>
                                            {first_name} {last_name}
                                        </h5>
                                        <p>{message}</p>
                                    </li>
                                </div>
                            );
                        }
                    )}
                </ul>
            </div>
            <div className="textarea-container">
                <textarea
                    className="text-container"
                    name="message"
                    placeholder="Your message here"
                    onKeyDown={(e) => onChatKeyDown(e)}
                    onChange={(e) => onMessageChange(e)}
                    value={message}
                ></textarea>
                <button>Send</button>
            </div>
        </div>
    );
}
