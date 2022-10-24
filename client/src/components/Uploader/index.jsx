import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: "",
        };

        // this.togglePopup = this.togglePopup.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        // data of fetch:

        fetch("/upload.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.profile_picture),
        })
            .then((response) => response.json())
            .then((data) => {
                // validate: check if the upload worked!
                // if it did...
                const newUrl = data.url;
                this.props.setProfilePic(newUrl);
                // the function call above will ALSO cause the uploader to be hidden.
            });
        console.log("im a log");
    }

    render() {
        return (
            <>
                <div className="modal-backgroud-div">
                    <div className="uploader-form-div">
                        <button
                            className="exit-button"
                            onClick={this.props.togglePopup}
                        >
                            x
                        </button>
                        <form
                            action=""
                            method="?"
                            className="upload-form"
                            onSubmit={this.handleSubmit}
                        >
                            <label className="" htmlFor="first_name">
                                Choose your new profile picture:
                            </label>
                            <input
                                type="file"
                                name="profile_picture"
                                required
                                className="upload-input"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
