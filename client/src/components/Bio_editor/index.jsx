import { Component } from "react";

export default class Bio_editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            official_bio: props.bio,
            draft_bio: null,
            editing: false,
        };

        this.openEditBio = this.openEditBio.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openEditBio() {
        this.setState({
            editing: true,
        });
    }

    handleClick() {
        this.setState({
            editing: false,
        });
        this.props.updateBio(this.state.draft_bio);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    render() {
        return (
            <>
                {this.state.official_bio && <p>{this.state.official_bio}</p>}
                {this.state.editing && (
                    <textarea
                        name="draft_bio"
                        cols="60"
                        rows="6"
                        value={this.state.official_bio}
                        onChange={this.handleChange}
                    ></textarea>
                )}
                {!this.state.official_bio && !this.state.editing && (
                    <button onClick={this.openEditBio}>Add bio</button>
                )}

                {this.state.official_bio && !this.state.editing && (
                    <button onClick={this.openEditBio}>Edit bio</button>
                )}

                {this.state.editing && !this.state.official_bio && (
                    <button onClick={this.handleClick}>Save</button>
                )}
                {this.state.editing && this.state.official_bio && (
                    <button onClick={this.handleClick}>Update</button>
                )}
            </>
        );
    }
}

// export default function Profile(props) {

//     openEditBio(){

//     }

//     return (
//         <>
//             <p>{props.bio}</p>
//             <button onClick={}>Add bio</button>
//         </>
//     );
// }
