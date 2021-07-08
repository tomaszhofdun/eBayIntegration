import React from "react";

function LoadingIcon(props) {
    return (
        <i
            className={"fas fa-sync-alt spinner " + "spinner--" + props.size}
        ></i>
    );
}

export default LoadingIcon;
