import { Component } from "react";

export default class Logout extends Component {
    handleLogOut() {
        fetch("/logout", {
            method: "post",
        }).then((res) => {
            if (res.status === 200) {
                location.reload("/");
            }
        });
    }

    render() {
        return (
            <div>
                <button className="logout" onClick={this.handleLogOut}>
                    Logout
                </button>
            </div>
        );
    }
}
