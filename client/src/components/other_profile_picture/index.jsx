export default function OtherProfilePic({ url, imageSize }) {
    return (
        <>
            <img
                className={imageSize || "profile-image-small"}
                src={url || "/pizzacat.png"}
                alt="/pizzacat.png"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/pizzacat.png";
                }}
            />
        </>
    );
}
