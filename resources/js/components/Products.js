import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import StateContext from "./StateContext";

function Products() {
    const appState = useContext(StateContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getItems() {
            const response = await axios.get("/items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            setItems(response.data);
            setIsLoading(false);
        }
        getItems();
    }, []);

    return (
        <>
            <div className="row__8--medium">
                <div className="container">
                    <main className="main h-100">
                        {isLoading && (
                            <div className="total-centerize h-100">
                                <i class="fas fa-sync-alt spinner spinner--lg total-centerize"></i>
                            </div>
                        )}
                        {items.map(item => (
                            <p>
                                {item.title} <span>{item.sku}</span>{" "}
                                <span>{item.ebay_item_id}</span>
                            </p>
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Products;
