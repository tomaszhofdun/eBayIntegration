import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

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
        flashMessage: {
            text: "",
            color: ""
        },
        flashMessageIsActive: false
    };

    function ourReducer(state, action) {
        switch (action.type) {
            case "login":
                return {
                    ...state,
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
                    flashMessage: {
                        text: action.text,
                        color: action.color
                    }
                };
            case "toggleFlashMessageVisibility":
                return {
                    ...state,
                    flashMessageIsActive: action.active
                };

            case "hideSidebar":
                return {
                    ...state,
                    sideBarIsVisible: false
                };
            case "showSidebar":
                return {
                    ...state,
                    sideBarIsVisible: true
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
                    <CSSTransition
                        timeout={700}
                        in={state.flashMessageIsActive}
                        classNames="flash-message"
                        unmountOnExit
                    >
                        <FlashMessage
                            text={state.flashMessage.text}
                            color={state.flashMessage.color}
                        />
                    </CSSTransition>
                </BrowserRouter>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
