import { useState, useEffect } from "react";

//import { useHistory } from "react-router-dom";

export default function FriendButtonFriendsPage({ id }) {
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
                // FIXME: here I do not know how the response looks like and how the state looks like
                // better only get a status from BE and do the mapping on the FE
                // button action and button text is a FE responsibility not a BE

                setFriendshipStatus(resp);
            });
    }, []); //FIXME: here there is a missing dependency, id ...

    return (
        <button className="addFriendButton" onClick={sendRequest}>
            {friendshipStatus.buttonText}
        </button>
    );
}
