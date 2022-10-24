export default function ProfilePic({ userName, togglePopup }) {
    userName = userName || "/pizzacat.png";
    return (
        <>
            <button onClick={togglePopup}>
                <img className="profile-image-small" src={userName} alt="..." />
            </button>
        </>
    );
}
