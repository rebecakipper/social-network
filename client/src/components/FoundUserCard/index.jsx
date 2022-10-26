export default function FoundUserCard({ first, last, id, url, imageSize }) {
    return (
        <>
            <div className="user-card-container" key={id}>
                <img
                    className={imageSize || "profile-image-small"}
                    src={url || "/pizzacat.png"}
                    alt="/pizzacat.png"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/pizzacat.png";
                    }}
                />
                <h1 className="add-padding">
                    {first} {last}
                </h1>
            </div>
        </>
    );
}
