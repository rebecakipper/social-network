import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { useHistory } from "react-router-dom";

export default function FriendButton() {
    const { id } = useParams();
    const [friendshipStatus, setFriendshipStatus] = useState({});

    const sendRequest = () => {
        const path = "/friendship/" + friendshipStatus.buttonAction + "/" + id;
        console.log(path);

        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp);
                return setFriendshipStatus(resp);
            });
    };

    useEffect(() => {
        //on mount
        const path = "/friendship/" + id;
        fetch(path)
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp);
                setFriendshipStatus(resp);
            });
    }, []);

    return (
        <button className="addFriendButton" onClick={sendRequest}>
            {friendshipStatus.buttonText}
        </button>
    );
}
