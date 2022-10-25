import { Component } from "react";
//import Logo from "../Logo/index.jsx";
import Logo from "../Logo/index.jsx";
import Profile_picture from "../Profile_picture/index.jsx";
import Uploader from "../Uploader/index.jsx";
import Profile from "../Profile/index.jsx";

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
                console.log("data from GET /user.json: ", data);
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
        console.log("updateBio function  was triggered", bio);
        fetch("/update_bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: bio,
            }),
        })
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp.bio);
                const newBio = resp.bio;
                this.setState({
                    bio: newBio,
                });
                console.log(this.state);
            });
    }

    render() {
        if (!this.state.mounted) {
            return <>loading ...</>;
        }

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
                    <h2>Welcome to Juniper Social, {this.state.first_name}</h2>

                    <Profile
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                        profile_picture_url={this.state.profile_picture_url}
                        togglePopup={this.togglePopup}
                        bio={this.state.bio}
                        updateBio={this.updateBio}
                    />

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
