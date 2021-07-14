import React from "react";
import ReactTooltip from "react-tooltip";

import Logout from "./Logout";

function Header() {
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
                    <i
                        data-tip="Settings"
                        id="icons"
                        className="fas fa-cogs"
                    ></i>
                    <i
                        data-tip="Connect eBay"
                        id="icons"
                        className="fas fa-key"
                    ></i>
                    <ReactTooltip effect="solid" type="info" data-for="icons" />
                    <Logout />
                </div>
            </div>
        </header>
    );
}

export default Header;
