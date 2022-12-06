export function friendshipsReducer(friendships = [], action) {
    if (action.type === "friendships/fetched") {
        return [...friendships, ...action.payload];
    } else if (action.type === "friendships/accept") {
        const newFriend = friendships.map((friend) => {
            if (friend.id === action.payload.id) {
                return { ...friend, accepted: true };
            }
        });
        return newFriend;
    } else if (action.type === "friendships/delete") {
        const newFriends = friendships.map((friend) => {
            if (friend.id === action.payload.id) {
                return {};
            }
        });
        return newFriends;
    }

    return friendships;
}
