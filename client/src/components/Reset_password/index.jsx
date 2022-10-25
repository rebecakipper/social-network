import { Component } from "react";
//import { Link } from "react-router-dom";

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
        fetch("/reset.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /reset.json: ", data);
                // TODO:
                // if registration was NOT successful -> render err conditionally
                if (data.success === true) {
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
                <h3>Reset Password</h3>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <div className="login-form-div">
                    <h4>Please enter the email adress you resgistered with:</h4>
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
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div></div>
            </>
        );
    }
}
