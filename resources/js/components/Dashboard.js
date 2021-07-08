import React, { useEffect, useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import DispatchContext from "./DispatchContext";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

function Dashboard() {
    const { url, path } = useRouteMatch();

    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        appDispatch({ type: "showSidebar" });
    }, []);

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
