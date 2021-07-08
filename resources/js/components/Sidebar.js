import React, { useContext, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function Sidebar() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    const { url } = useRouteMatch();

    const [menuIsOpen, SetMenuIsOpen] = useState(false);

    function menuHandler() {
        SetMenuIsOpen(!menuIsOpen);
    }

    function handleLogout() {
        appDispatch({ type: "logout" });
        appDispatch({
            type: "flashMessage",
            value: "You've been logout",
            color: "red"
        });
    }

    return (
        <>
            <nav
                className={
                    "nav " + (menuIsOpen ? "nav__opened" : "nav__closed")
                }
            >
                <div className="avatar-icon">
                    <img
                        width="40px"
                        src={`https://www.gravatar.com/avatar/${appState.user.hashEmail}`}
                        alt=""
                    />
                    <span>{appState.user.username}</span>
                </div>
                <ul className="nav__menu" onClick={menuHandler}>
                    <Link to={`${url}/products`}>
                        <li>
                            <i className="fas fa-folder"></i>
                            Products <span>></span>
                        </li>
                    </Link>
                    <Link to={`${url}/options`}>
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
            <div
                onClick={menuHandler}
                className={
                    "nav__hamburger " + (menuIsOpen && "nav__hamburger--opened")
                }
            >
                <div className="nav__hamburger__middle"></div>
            </div>
        </>
    );
}

export default Sidebar;
