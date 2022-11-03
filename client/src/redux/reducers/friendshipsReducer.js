export function friendshipsReducer(friendships = [], action) {
    if (action.type === "friendships/fetched") {
        return [...friendships, ...action.payload];
    }

    return friendships;
}
