export function friendshipsFetch(newFriendships) {
    return {
        type: "friendships/fetched",
        payload: newFriendships,
    };
}

export function deleteFriendships(id) {
    return {
        type: "friendships/delete",
        payload: id,
    };
}

export function acceptFriendships(id) {
    return {
        type: "friendships/accept",
        payload: id,
    };
}
