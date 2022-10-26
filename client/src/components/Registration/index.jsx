import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first_name: "",
            last_name: "",
            email: "",
            user_password: "",
        };
        // One way to bind 'this
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
        // console.log("clicked on submit button");
        e.preventDefault();
        console.log(this.state);
        fetch("/register.json", {
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
                    return location.replace("/");
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
                <h3>Registration</h3>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <div className="registration-form-div">
                    <form onSubmit={this.handleSubmit}>
                        <label className="" htmlFor="first_name">
                            First name:
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            placeholder="First name"
                            required
                            className="input-welcome"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="last_name">
                            Last name:
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={this.state.last_name}
                            placeholder="Last name"
                            required
                            className="input-welcome"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="email"
                            required
                            className="input-welcome"
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
                            required
                            className="input-welcome"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>

                <div>
                    Already a member? <Link to="/login">Log in!</Link>
                </div>
            </>
        );
    }
}
