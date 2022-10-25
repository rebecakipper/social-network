import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: "",
            user_password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state);
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /register.json: ", data);
                // TODO:
                // if registration was NOT successful -> render err conditionally
                if (data.success === true) {
                    console.log("success");
                    return location.reload();
                }
                this.setState({
                    error: true,
                });
                // if registration WAS successful -> reload the page! trigger page reload to rerun start.js and we shoiuld end up seeing our logo
            })
            .catch((err) => {
                // if something goes wrong => render an error
                this.setState({
                    error: true,
                });
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <h3>Log in</h3>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <div className="login-form-div">
                    <form onSubmit={this.handleSubmit}>
                        <label className="" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="email"
                            className="input-welcome"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="user_password">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="user_password"
                            value={this.state.user_password}
                            placeholder="password"
                            className="input-welcome"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>

                <div>
                    Forgot your password?{" "}
                    <Link to="/reset_password">Click here!</Link>
                </div>
            </>
        );
    }
}
