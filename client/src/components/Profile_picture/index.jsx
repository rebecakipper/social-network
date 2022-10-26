export default function ProfilePic({
    profile_picture_url,
    togglePopup,
    imageSize,
}) {
    // const imgSrc = profile_picture_url || "/pizzacat.png";

    return (
        <>
            <button className="profile-button" onClick={togglePopup}>
                <img
                    className={imageSize || "profile-image-small"}
                    src={profile_picture_url || "/pizzacat.png"}
                    alt="..."
                />
            </button>
        </>
    );
}
