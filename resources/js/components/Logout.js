import React, { useContext } from "react";
import DispatchContext from "./DispatchContext";

function Logout() {
    const appDispatch = useContext(DispatchContext);

    function handleLogout() {
        // appDispatch({ type: "showSidebar" });
        appDispatch({ type: "logout" });
        appDispatch({
            type: "flashMessage",
            value: "You've been logout",
            color: "red"
        });
    }

    return (
        <button onClick={handleLogout} className="header__logout">
            Logout
        </button>
    );
}

export default Logout;
