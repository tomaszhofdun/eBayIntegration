import React, { useContext } from "react";
import ReactTooltip from "react-tooltip";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Logout from "./Logout";
import { Link, useRouteMatch } from "react-router-dom";

function Header() {
    const appContext = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const { path, url } = useRouteMatch();

    function showSidebar() {
        appDispatch({ type: "showSidebar" });
    }

    return (
        <header className="header">
            {appContext.sideBarIsVisible ? (
                ""
            ) : (
                <Link
                    to={`/dashboard`}
                    onClick={showSidebar}
                    data-tip="Show Sidebar"
                    className="fas fa-long-arrow-alt-left header__go-back-icon"
                ></Link>
            )}
            <div className="container">
                <h1 className="header__title">Dashboard</h1>
                <div className="header__nav">
                    <i data-tip="My Profile" className="fas fa-user"></i>
                    <i data-tip="Settings" className="fas fa-cogs"></i>
                    <i data-tip="Connect eBay" className="fas fa-key"></i>
                    <ReactTooltip effect="solid" type="light" />

                    <Logout />
                </div>
            </div>
        </header>
    );
}

export default Header;
