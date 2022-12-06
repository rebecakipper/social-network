import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    friendshipsFetch,
    acceptFriendships,
    deleteFriendships,
} from "../../redux/actionCreators/friendshipsActions";
import OtherProfileFriendsPage from "../OtherProfileFriendsPage/index.jsx";

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
                dispatch(friendshipsFetch(data));
            });
    }, []);

    useEffect(() => {
        return friendSorter(friendships);
    }, [friendships]);

    return (
        <>
            <h1>These are your friends:</h1>
            <div className="friendOrWannabe-BIGdiv">
                {friends.map((friend) => {
                    return (
                        <div
                            className="friendOrWannabe-div friend"
                            key={friend.id}
                        >
                            <OtherProfileFriendsPage userObj={friend} />
                            {/* <button onClick={dispatch(acceptFriendships(friend.id))}>click to accept</button> */}
                        </div>
                    );
                })}
            </div>
            <h1>These people want to be your friends:</h1>
            <div className="friendOrWannabe-BIGdiv">
                {wannabes.map((wannabe) => {
                    return (
                        <div
                            className="friendOrWannabe-div wannabe"
                            key={wannabe.id}
                        >
                            <OtherProfileFriendsPage userObj={wannabe} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
