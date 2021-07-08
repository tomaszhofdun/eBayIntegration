import React from "react";
import ReactTooltip from "react-tooltip";

import Logout from "./Logout";

function Header() {
    return (
        <header className="header">
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
