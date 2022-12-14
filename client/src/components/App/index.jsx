import { Component } from "react";
//import Logo from "../Logo/index.jsx";
import Logo from "../Logo/index.jsx";
import Profile_picture from "../Profile_picture/index.jsx";
import Uploader from "../Uploader/index.jsx";
import Profile from "../Profile/index.jsx";
import Logout from "../Logout/index.jsx";
import Find_People from "../Find_People/index.jsx";
import OtherProfile from "../OtherProfile/index.jsx";
import Friends from "../Friends/index.jsx";
import Chat from "../Chat/index.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";

import { BrowserRouter, Route, Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            profile_picture_url: "",
            bio: "",
            isPopupOpen: false,
            mounted: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.setProfilePic = this.setProfilePic.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch("/user")
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    ...data, //spread operator
                    mounted: true,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                    mounted: true,
                });
                console.log(err);
            });
    }

    togglePopup() {
        this.setState({
            // set it to the opposite of its current value!
            isPopupOpen: !this.state.isPopupOpen,
        });
    }

    setProfilePic(url) {
        // update the state with new profile pic url!
        this.setState({
            profile_picture_url: url,
        });
        // close the popup!
        this.togglePopup();
    }

    updateBio(bio) {
        fetch("/update_bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio,
            }),
        })
            .then((response) => response.json())
            .then((resp) => {
                const newBio = resp.bio;
                this.setState({
                    bio: newBio,
                });
            });
    }

    render() {
        if (!this.state.mounted) {
            return <>loading ...</>;
        }

        return (
            <>
                <BrowserRouter>
                    <nav className="nav">
                        <Link to="/">
                            <Logo />
                        </Link>
                        <div className="navigation-div">
                            <Logout />
                            <Link
                                className="find-people-link"
                                to="/find-people"
                                // onClick={location.reload()}
                            >
                                Find People
                            </Link>
                            <Link className="find-people-link" to="/friends">
                                Friends
                            </Link>
                            <Link className="find-people-link" to="/chat">
                                Chat
                            </Link>
                            <Profile_picture
                                profile_picture_url={
                                    this.state.profile_picture_url
                                }
                                togglePopup={this.togglePopup}
                            />
                        </div>
                    </nav>
                    <main className="main">
                        <Route exact path="/">
                            <h2 className="welcome-h2 ">
                                Welcome to Juniper Social,{" "}
                                {this.state.first_name}
                            </h2>
                            <Profile
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                profile_picture_url={
                                    this.state.profile_picture_url
                                }
                                togglePopup={this.togglePopup}
                                bio={this.state.bio}
                                updateBio={this.updateBio}
                            />
                        </Route>
                        {this.state.isPopupOpen && (
                            <Uploader
                                togglePopup={this.togglePopup}
                                setProfilePic={this.setProfilePic}
                            />
                        )}

                        <Route path="/find-people">
                            <Find_People imageSize="" />
                        </Route>

                        <Route path="/user/:id">
                            <OtherProfile imageSize="" />
                        </Route>

                        <Route path="/friends">
                            <Friends />
                        </Route>

                        <Route path="/chat">
                            <Chat />
                        </Route>
                    </main>
                </BrowserRouter>
            </>
        );
    }
}
