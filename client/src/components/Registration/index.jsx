import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        };
        // One way to bind 'this
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log(
        //     "handleChange is running - user is typing in the input field"
        // );
        // console.log(e.target.value);
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
                // if registration WAS successful -> reload the page! trigger page reload to rerun start.js and we shoiuld end up seeing our logo
            })
            .catch((err) => {
                // if something goes wrong => render an error
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
                            //value={this.state.first_name}
                            placeholder="First name"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="last_name">
                            Last name:
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            //value={this.state.last_name}
                            placeholder="Last name"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            //value={this.state.email}
                            placeholder="email"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label className="" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            //value={this.state.password}
                            placeholder="password"
                            required
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>

                <div>
                    Already a member? <a href="">Log in</a>
                </div>
            </>
        );
    }
}

// export class Registtion extends Component {
//     constructor() {
//         super();
//         this.state = {
//             error: true,
//         };
//         // One way to bind 'this
//         // this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(e) {
//         // console.log(
//         //     "handleChange is running - user is typing in the input field"
//         // );
//         // console.log(e.target.value);
//         this.setState(
//             {
//                 [e.target.name]: e.target.value,
//             },
//             () => console.log("this.state: ", this.state)
//         );
//     }

//     // TODO:
//     // 1. render 4 input fields + button ✅
//     // 2. capture the user's input and store it state ✅
//     // 3. when the user clicks submits, we want to send that data to the server
//     // 4. if something goes wrong, conditionally render an err msg
//     // 5. if everything goes well, show them the logo

//     handleSubmit() {
//         // console.log("clicked on submit button");
//         fetch("/register.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(this.state),
//         })
//             .then((resp) => resp.json())
//             .then((data) => {
//                 console.log("data from POST /register.json: ", data);
//                 // TODO:
//                 // if registration was NOT successful -> render err conditionally
//                 // if registration WAS successful -> reload the page! trigger page reload to rerun start.js and we shoiuld end up seeing our logo
//             })
//             .catch((err) => {
//                 // if something goes wrong => render an error
//                 console.log(err);
//             });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>This is the registration component</h1>

//                 {this.state.error && (
//                     <p className="error">oops! something went wrong!</p>
//                 )}

//                 <input
//                     type="text"
//                     name="first"
//                     placeholder="first"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <input
//                     type="text"
//                     name="last"
//                     placeholder="last"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="email"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="password"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <button onClick={() => this.handleSubmit()}>Submit</button>
//             </div>
//         );
//     }
// }
