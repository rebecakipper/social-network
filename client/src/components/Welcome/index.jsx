import React from "react";
import Registration from "../Registration/index.jsx";
//import Logo from "../Logo/index.jsx";
import Login from "../Login/index.jsx";
import Reset_password from "../Reset_password/index.jsx";
import { BrowserRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to </h1>
                <img className="logo" src="/juniper-logo.png" />
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/reset_password">
                            <Reset_password />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
