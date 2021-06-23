import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

function Dashboard() {
    const { url, path } = useRouteMatch();

    return (
        <div className="dashboard">
            <Header />
            <div className="row">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
}

export default Dashboard;
