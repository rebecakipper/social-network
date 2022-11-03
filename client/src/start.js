import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/index.jsx";
import App from "./components/App/index.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            // this means that the user doens't have a userId and should see Welcome/Registration for now
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // this means the user is registered cause their browser DID have the right cookie and they should be seeing a logo

            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
