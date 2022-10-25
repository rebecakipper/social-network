import Profile_picture from "../Profile_picture/index.jsx";
import Bio_editor from "../Bio_editor/index.jsx";

export default function Profile(props) {
    // const imgSrc = profile_picture_url || "/pizzacat.png";

    return (
        <>
            <div className="profile-container">
                <Profile_picture
                    profile_picture_url={props.profile_picture_url}
                    togglePopup={props.togglePopup}
                />
                <div className="bio">
                    <h2>
                        {props.first_name} {props.last_name}
                    </h2>
                    <Bio_editor bio={props.bio} updateBio={props.updateBio} />
                </div>
            </div>
        </>
    );
}
