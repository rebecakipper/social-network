import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FriendButton from "../FriendButton/index.jsx";

export default function OtherProfile(otherID) {
    const [user, setUser] = useState({});
    let { id } = useParams();
    const history = useHistory();

    const path = "/showUser/" + (id || otherID);

    useEffect(() => {
        fetch(path)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.self) {
                    return history.push("/");
                } else if (resp.noUser) {
                    return history.replace("/");
                }
                setUser(resp);
            });
    }, []);

    return (
        <>
            <div className="big-profile-container">
                <div className="profile-container">
                    <img
                        className="profile-image-big"
                        src={user.profile_picture_url || "/pizzacat.png"}
                        alt="/pizzacat.png"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/pizzacat.png";
                        }}
                    />
                    <div className="bio">
                        <h2>
                            {user.first_name} {user.last_name}
                        </h2>
                        <p>{user.bio || "No Bio yet"}</p>
                    </div>
                </div>
                <FriendButton />
            </div>
        </>
    );
}
