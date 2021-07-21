import React, { useContext } from "react";
import DispatchContext from "./DispatchContext";

function Logout() {
    const appDispatch = useContext(DispatchContext);

    function handleLogout() {
        appDispatch({ type: "logout" });
        appDispatch({
            type: "flashMessage",
            text: "You've been logout",
            color: "red"
        });
        appDispatch({
            type: "toggleFlashMessageVisibility",
            active: true
        });
    }

    return (
        <button onClick={handleLogout} className="header__logout">
            Logout
        </button>
    );
}

export default Logout;
