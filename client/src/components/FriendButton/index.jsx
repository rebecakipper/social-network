import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function FriendButton() {
    const [buttonText, setButtonText] = useState("");

    //const path = "/showUser/" + id;
    const handleClick = (userInput) => {
        return setButtonText(userInput);
    };

    useEffect(() => {
        // fetch(path)
        //     .then((response) => response.json())
        //     .then((resp) => {
        //         if (resp.self) {
        //             return history.push("/");
        //         } else if (resp.noUser) {
        //             return history.replace("/");
        //         }
        //         setUser(resp);
        //     });
        setButtonText("Make friend request");
    }, []);

    useEffect(() => {
        // fetch(path)
        //     .then((response) => response.json())
        //     .then((resp) => {
        //         if (resp.self) {
        //             return history.push("/");
        //         } else if (resp.noUser) {
        //             return history.replace("/");
        //         }
        //         setUser(resp);
        //     });
        setButtonText("Make friend request");
    }, []);

    return (
        <button className="addFriendButton" onClick={sendRequest}>
            {buttonText}
        </button>
    );
}
