import React from "react";
import ReactTooltip from "react-tooltip";

import Logout from "./Logout";
import { Link, useRouteMatch } from "react-router-dom";

function Header() {
    const { url } = useRouteMatch();

    return (
        <header className="header">
            <div className="container header__bar">
                <h1 className="header__title">Dashboard</h1>
                <div className="header__nav">
                    <i
                        data-tip="My Profile"
                        id="icons"
                        className="fas fa-user"
                    ></i>
                    <Link to={`${url}/products/1`}>
                        <i
                            data-tip="My products"
                            id="icons"
                            className="fas fa-folder"
                        ></i>
                    </Link>
                    <Link to={`${url}/options`}>
                        <i
                            data-tip="Settings"
                            id="icons"
                            className="fas fa-cogs"
                        ></i>
                    </Link>

                    <ReactTooltip effect="solid" type="info" data-for="icons" />
                    <Logout />
                </div>
            </div>
        </header>
    );
}

export default Header;
