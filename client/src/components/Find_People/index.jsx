import UserList from "../UserList/index.jsx";
import { useState, useEffect } from "react";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        console.log(`"Find People" has been rendered!`);
        fetch("/users")
            .then((response) => response.json())
            .then((resp) => {
                // console.log(resp);
                setUsers(resp);
                console.log(users);
            });
    }, []);

    //req.query.page;

    useEffect(() => {
        const fetchFrom =
            "/users" +
            "?" +
            new URLSearchParams({
                q: searchString,
            });
        // console.log(fetchFrom);
        fetch(fetchFrom)
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp);
                setUsers(resp);
                // console.log(users);
            });
    }, [searchString]);

    const updateSearchString = (userInput) => {
        return setSearchString(userInput);
    };

    return (
        <main className="FindPeople-container">
            <h1 className="header">Find people</h1>
            <input
                onChange={(e) => updateSearchString(e.target.value)}
                type="text"
                className="add-margin input-welcome"
            />
            <UserList users={users} />
        </main>
    );
}
