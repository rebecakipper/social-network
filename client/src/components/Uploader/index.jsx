import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(file) {
        this.setState(
            {
                profile_picture: file,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.profile_picture);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // validate: check if the upload worked!
                // if it did...
                const newUrl = data.url;
                this.props.setProfilePic(newUrl);
                // the function call above will ALSO cause the uploader to be hidden.
            });
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
                                accept="image/*"
                                name="profile_picture"
                                required
                                className="upload-input"
                                onChange={(e) =>
                                    this.handleChange(e.target.files[0])
                                }
                            />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
