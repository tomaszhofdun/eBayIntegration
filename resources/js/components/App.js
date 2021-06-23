import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import FlashMessage from "./FlashMessage";

import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";

axios.defaults.baseURL = "http://localhost:4000/api";

function App() {
    const initialState = {
        loggedIn: Boolean(localStorage.getItem("appToken")),
        user: {
            token: localStorage.getItem("appToken"),
            username: localStorage.getItem("appUsername"),
            avatar: localStorage.getItem("appAvatar"),
            hashEmail: localStorage.getItem("hashEmail")
        },
        flashMessage: ""
    };
    function ourReducer(state, action) {
        switch (action.type) {
            case "login":
                return {
                    loggedIn: true,
                    user: action.data
                };

            case "logout":
                return {
                    ...state,
                    loggedIn: false
                };

            case "flashMessage":
                return {
                    ...state,
                    flashMessage: { text: action.value, color: action.color }
                };

            default:
                console.log("default reducer action");
                return;
        }
    }

    const [state, dispatch] = useReducer(ourReducer, initialState);

    useEffect(() => {
        if (state.loggedIn) {
            localStorage.setItem("appToken", state.user.token);
            localStorage.setItem("appUsername", state.user.username);
            localStorage.setItem("appAvatar", state.user.avatar);
            localStorage.setItem("hashEmail", state.user.hashEmail);
        } else {
            localStorage.removeItem("appToken");
            localStorage.removeItem("appUsername");
            localStorage.removeItem("appAvatar");
            localStorage.removeItem("hashEmail");
        }
    }, [state.loggedIn]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            {state.loggedIn ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Login />
                            )}
                        </Route>
                        <Route path="/dashboard">
                            {state.loggedIn ? (
                                <Dashboard />
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                    </Switch>

                    {state.flashMessage && <FlashMessage />}
                </BrowserRouter>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
