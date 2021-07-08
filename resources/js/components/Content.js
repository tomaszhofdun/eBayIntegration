import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Products from "./Products";
import Options from "./Options";

function Content() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/products`}>
                <Products />
            </Route>
            <Route path={`${path}/options/:ebayredirect?`}>
                <Options />
            </Route>
        </Switch>
    );
}

export default Content;
