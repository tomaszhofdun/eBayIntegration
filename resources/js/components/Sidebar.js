import React, { useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import $ from "jquery";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function Sidebar() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    const { path, url } = useRouteMatch();

    function handleLogout() {
        appDispatch({ type: "logout" });
        appDispatch({
            type: "flashMessage",
            value: "You've been logout",
            color: "red"
        });
    }

    function hideSidebar() {
        appDispatch({ type: "hideSidebar" });

        // $(".sidebar").animate({ width: "toggle" }, 350);
    }

    return (
        <div className="row__4--medium">
            {appState.sideBarIsVisible ? (
                <div className="sidebar">
                    <div className="avatar-icon">
                        <img
                            width="40px"
                            src={`https://www.gravatar.com/avatar/${appState.user.hashEmail}`}
                            alt=""
                        />
                        <span>{appState.user.username}</span>
                    </div>
                    <nav>
                        <ul>
                            <Link onClick={hideSidebar} to={`${url}/products`}>
                                <li>
                                    <i className="fas fa-folder"></i>
                                    Products <span>></span>
                                </li>
                            </Link>
                            <Link onClick={hideSidebar} to={`${url}/options`}>
                                <li>
                                    <i className="fas fa-cogs"></i>
                                    Options <span>></span>
                                </li>
                            </Link>

                            <li onClick={handleLogout}>
                                <i className="fas fa-user-times"></i>
                                Logout
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Sidebar;
