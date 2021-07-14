import React, { useContext, useState, useEffect } from "react";
import StateContext from "./StateContext";

import ImportEbayItems from "./options/ImportEbayItems";

function Options() {
    const appState = useContext(StateContext);

    return (
        <>
            <div className="container">
                <main className="main">
                    <h5 className="main__title">
                        Importowanie aukcji jako produktów
                    </h5>
                    <div className="main__options">
                        <img
                            className="main__ebay-logo"
                            src="/img/ebay-logo-1-1200x630-margin.png"
                            alt=""
                        />
                        <ImportEbayItems />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Options;
