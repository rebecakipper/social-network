import { useState, useEffect } from "react";
import FoundUserCard from "../FoundUserCard/index.jsx";

export default function UserList({ users, imageSize }) {
    return (
        <div>
            {users.map((user) => (
                <FoundUserCard
                    key={user.id}
                    first={user.first_name}
                    last={user.last_name}
                    id={user.id}
                    url={user.profile_picture_url}
                    imageSize={imageSize}
                />
            ))}
        </div>
    );
}
