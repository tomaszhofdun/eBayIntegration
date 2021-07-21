import React, { useState, useContext } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";

import DispatchContext from "./DispatchContext";

function Login() {
    const [response, setResponse] = useState();
    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const appDispatch = useContext(DispatchContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:4000/api/login",
                {
                    email: "tomaszhofdun@gmail.com",
                    password: "12345"
                }
            );

            if (response.data["success"]) {
                const hashed = {
                    ...response.data,
                    hashEmail: md5(response.data.avatar).toString()
                };
                appDispatch({ type: "login", data: hashed });
                appDispatch({ type: "flashMessage" });

                appDispatch({
                    type: "toggleFlashMessageVisibility",
                    active: true
                });
            } else {
                console.log(response.data.response);
                setResponse(response);
            }
        } catch (error) {
            appDispatch({
                type: "flashMessage",
                text: "Connection problem, check if Xampp is running"
            });
            appDispatch({
                type: "toggleFlashMessageVisibility",
                active: true
            });
            setIsLoading(false);
        }
    }

    return (
        <div className="login-page container total-centerize">
            <div className="login-page__form">
                <form onSubmit={handleSubmit} action="" method="post">
                    <h1 className="login-page__header">
                        eBay Management System
                    </h1>
                    <input
                        onChange={e => setLogin(e.target.value)}
                        type="text"
                        className="loginInput"
                        value={login}
                    />

                    <input
                        onChange={e => setPass(e.target.value)}
                        type="text"
                        value={pass}
                    />
                    <button className="submit" disabled={isLoading}>
                        {" "}
                        Zaloguj{" "}
                    </button>
                </form>
                <p className="info">{response ? response.data.response : ""}</p>
            </div>
        </div>
    );
}

export default Login;
