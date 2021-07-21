import React, { useContext, useEffect } from "react";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import flashMessageIsActiveContext from "./flashMessageIsActiveContext";

function FlashMessage(props) {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const appFlashMessageIsActive = useContext(flashMessageIsActiveContext);

    useEffect(() => {
        clearTimeout(unmountTimer);
        var unmountTimer = setTimeout(() => {
            appDispatch({
                type: "toggleFlashMessageVisibility",
                active: false
            });
        }, 2500);
        return () => {
            clearTimeout(unmountTimer);
        };
    }, []);

    const { text, color } = props;
    return (
        <div className={"flash-message flash-message--" + color}>{text}</div>
    );
}

export default FlashMessage;
