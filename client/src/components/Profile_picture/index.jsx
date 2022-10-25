export default function ProfilePic({ profile_picture_url, togglePopup }) {
    // const imgSrc = profile_picture_url || "/pizzacat.png";

    return (
        <>
            <button onClick={togglePopup}>
                <img
                    className="profile-image-small"
                    src={profile_picture_url}
                    alt="..."
                />
            </button>
        </>
    );
}
