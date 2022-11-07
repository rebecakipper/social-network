//import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import FriendButtonFriendsdPage from "../FriendButtonFriendsPage/index.jsx";

export default function OtherProfileFriendsPage({ userObj }) {
    return (
        <>
            <img
                className="profile-image-small"
                src={userObj.profile_picture_url || "/pizzacat.png"}
                alt="/pizzacat.png"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/pizzacat.png";
                }}
            />
            <h5>
                {userObj.first_name} {userObj.last_name}
            </h5>
            <FriendButtonFriendsdPage id={userObj.id} />
        </>
    );
}
