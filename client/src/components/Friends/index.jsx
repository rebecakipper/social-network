import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { friendshipsFetch } from "../../redux/actionCreators/friendshipsActions";

export default function Friends() {
    const dispatch = useDispatch();
    const friendships = useSelector((state) => {
        return state.friendships;
    });
    const [friends, setFriends] = useState([]);
    const [wannabes, setWannabes] = useState([]);

    const friendSorter = (friendsAndWannabesList) => {
        let friendsArr = [];
        let wannabesArr = [];
        friendsAndWannabesList.map((friend) => {
            friend.accepted
                ? friendsArr.push(friend)
                : wannabesArr.push(friend);
        });
        setFriends(friendsArr);
        setWannabes(wannabesArr);
        return;
    };

    useEffect(() => {
        fetch("/friendships") //TODO:use the BE endpoint URL
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                dispatch(friendshipsFetch(data));
            });
    }, []);

    useEffect(() => {
        return friendSorter(friendships);
    }, [friendships]);

    return (
        <>
            <h1>these are friends:</h1>
            <div className="friendOrWannabe-BIGdiv">
                {friends.map((friend) => {
                    return (
                        <div
                            className="friendOrWannabe-div friend"
                            key={friend.id}
                        >
                            <img
                                className="profile-image-small"
                                src={
                                    friend.profile_picture_url ||
                                    "/pizzacat.png"
                                }
                                alt="/pizzacat.png"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/pizzacat.png";
                                }}
                            />
                            <h5>
                                {friend.first_name} {friend.last_name}
                            </h5>
                            {friend.accepted ? <h4>🫂</h4> : <h4> 👤</h4>}
                        </div>
                    );
                })}
            </div>
            <h1>these are wannabes:</h1>
            <div className="friendOrWannabe-BIGdiv">
                {wannabes.map((wannabe) => {
                    return (
                        <div
                            className="friendOrWannabe-div wannabe"
                            key={wannabe.id}
                        >
                            <img
                                className="profile-image-small"
                                src={
                                    wannabe.profile_picture_url ||
                                    "/pizzacat.png"
                                }
                                alt="/pizzacat.png"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/pizzacat.png";
                                }}
                            />
                            <h5>
                                {wannabe.first_name} {wannabe.last_name}
                            </h5>
                            {wannabe.accepted ? <h4>🫂</h4> : <h4> 👤</h4>}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
