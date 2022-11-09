import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { clientSocket } from "../../../socket";
import Other_profile_picture from "../other_profile_picture/index.jsx";

const formatDate = (date) => {
    return new Date(date).toLocaleTimeString("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function Chat() {
    const messages = useSelector((state) => state.messages.slice(0).reverse());
    // const [reversedMessages, setReversedMessages] = useState([]);
    const [message, setMessage] = useState("");
    const listRef = useRef(null);
    const containerRef = useRef(null);

    // useEffect(() => {
    //     setReversedMessages(messages.slice(0).reverse());
    // }, [messages]);

    useEffect(() => {
        containerRef.current.scrollTop = listRef.current.offsetHeight;
    }, [messages]);

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
            <div className="previous-messages-container" ref={containerRef}>
                <ul ref={listRef}>
                    {messages.map((msg) => {
                        const {
                            id,
                            message,
                            first_name,
                            last_name,
                            profile_picture_url,
                            created_at,
                        } = msg;

                        return (
                            <div className="flex-rows" key={id}>
                                <Other_profile_picture
                                    url={profile_picture_url}
                                />
                                <li className="message-container">
                                    <h5>
                                        {first_name} {last_name}
                                    </h5>
                                    <p className="message-text">{message}</p>
                                    <p className="smaller">
                                        {formatDate(created_at)}
                                    </p>
                                </li>
                            </div>
                        );
                    })}
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
