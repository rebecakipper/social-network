import { Component } from "react";

export default class Bio_editor extends Component {
    //camel case
    constructor(props) {
        super(props);

        this.state = {
            official_bio: props.bio,
            editing: false,
            value: props.bio,
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
        this.props.updateBio(this.state.value);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        return (
            <>
                {this.props.bio && <p>{this.props.bio}</p>}
                {this.state.editing && (
                    <textarea
                        name="draft_bio"
                        cols="60"
                        rows="6"
                        value={this.state.value}
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
