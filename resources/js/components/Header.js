import React from "react";

import Logout from "./Logout";

function Header() {
    return (
        <header className="header">
            <div className="container">
                <h1 className="header__title">Dashboard</h1>
                <div className="header__nav">
                    <i className="fas fa-user"></i>
                    <i className="fas fa-cogs"></i>
                    <i className="fas fa-key"></i>
                    <Logout />
                </div>
            </div>
        </header>
    );
}

export default Header;
