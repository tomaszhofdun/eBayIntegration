import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import StateContext from "./StateContext";

import ConnectEbay from "./options/ConnectEbay";
import ImportEbayItems from "./options/ImportEbayItems";

function Options() {
    const appState = useContext(StateContext);

    return (
        <>
            <div className="">
                <div className="container">
                    <main className="main">
                        <h4>Importowanie aukcji jako produktów</h4>
                        <div className="main__options">
                            <img
                                className="main__ebay-logo"
                                src="/img/ebay-logo-1-1200x630-margin.png"
                                alt=""
                            />
                            <ImportEbayItems />
                            <ConnectEbay />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Options;
