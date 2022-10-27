import { Link } from "react-router-dom";

export default function FoundUserCard({ first, last, id, url, imageSize }) {
    const path = "user/" + id;

    return (
        <>
            <Link to={path}>
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
            </Link>
        </>
    );
}
