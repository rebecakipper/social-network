import React from "react";
import Registration from "../Registration/index.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to </h1>
                <img className="logo" src="/juniper-logo.png" />
                <Registration />
            </div>
        );
    }
}
