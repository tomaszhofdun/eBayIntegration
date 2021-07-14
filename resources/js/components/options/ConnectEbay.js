import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import DispatchContext from "../DispatchContext";

function ConnectEbay() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    const [state, setState] = useImmer({
        SessionID: localStorage.getItem("SessionID"),
        connected: localStorage.getItem("connected")
    });

    useEffect(() => {
        if (state.SessionID) {
            try {
                async function fetchToken() {
                    const resp = await axios.post(
                        "/settings/ebay-token",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${appState.user.token}`
                            }
                        }
                    );
                    if (resp.data.Ack == "Failure") {
                        appDispatch({
                            type: "flashMessage",
                            value: resp.data.Errors.ShortMessage,
                            color: "red"
                        });
                        localStorage.removeItem("SessionID");
                    }
                    if (resp.data.Ack == "Success") {
                        setState(draft => {
                            draft.connected = true;
                        });
                        appDispatch({
                            type: "flashMessage",
                            value: "Połączenie zakończyło się sukcesem",
                            color: "green"
                        });
                        localStorage.removeItem("SessionID");
                        localStorage.setItem("connected", true);
                    }
                }
                fetchToken();
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    useEffect(() => {
        async function getToken() {
            try {
                const resp = await axios.get("settings/ebay-token", {
                    headers: { Authorization: `Bearer ${appState.user.token}` }
                });
                setState(draft => {
                    draft.ebayToken = resp.data;
                });
            } catch (e) {
                console.log(e);
            }
        }
        getToken();
    }, []);

    async function handleConnectChannel() {
        try {
            const resp = await axios.post(
                "/settings/ebay-sessionId",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${appState.user.token}`
                    }
                }
            );
            const SessionID = resp.data || null;
            if (SessionID) {
                const url = `https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&RUName=Tomasz_Hofdun-TomaszHo-TomekT-bcdavnzp&SessID=${SessionID}`;
                localStorage.setItem("SessionID", SessionID);
                window.open(url, "_blank");
            } else {
                console.log(
                    "There was an issue with getting the seesion ID from eBay"
                );
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button
            disabled={state.connected && true}
            className={
                "btn btn--sm  " +
                (state.connected == true ? "btn--green" : "btn--orange")
            }
            onClick={handleConnectChannel}
        >
            {state.connected ? "Kanał podłączony" : "Podłącz kanał"}
        </button>
    );
}

export default ConnectEbay;
