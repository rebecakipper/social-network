export function friendshipsFetch(newFriendships) {
    return {
        type: "friendships/fetched",
        payload: newFriendships,
    };
}
