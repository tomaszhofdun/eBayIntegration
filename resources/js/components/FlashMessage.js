import React, { useContext, useEffect } from "react";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function FlashMessage() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        setTimeout(() => {
            appDispatch({ type: "flashMessage", value: false });
        }, 4000);
    }, []);
    return (
        <div
            className={
                "flash-message flash-message--" + appState.flashMessage.color
            }
        >
            {appState.flashMessage.text}
        </div>
    );
}

export default FlashMessage;
