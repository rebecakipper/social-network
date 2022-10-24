import { Component } from "react";
//import Logo from "../Logo/index.jsx";
import Logo from "../Logo/index.jsx";
import Profile_picture from "../Profile_picture/index.jsx";
import Uploader from "../Uploader/index.jsx";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            profile_picture_url: "",
            isPopupOpen: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount() {
        // fetch user info from server
        // add it to the state!
        fetch("/user")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from GET /user.json: ", data);
                this.setState(
                    {
                        first_name: "",
                        last_name: "",
                        email: "",
                        profile_picture_url: "",
                    },
                    console.log("this.state: ", this.state)
                );
            })
            .catch((err) => {
                this.setState({
                    error: true,
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
    render() {
        return (
            <>
                <div className="nav">
                    <Logo />
                    <Profile_picture
                        profile_picture_url={this.state.profile_picture_url}
                        togglePopup={this.togglePopup}
                    />
                </div>
                <div className="main">
                    <h2>Welcome to Juniper Social, {this.state.userName}</h2>
                    {this.state.isPopupOpen && (
                        <Uploader
                            togglePopup={this.togglePopup}
                            setProfilePic={this.setProfilePic}
                        />
                    )}
                </div>
            </>
        );
    }
}
