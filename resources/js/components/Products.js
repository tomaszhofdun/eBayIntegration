import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import StateContext from "./StateContext";
import LoadingIcon from "./LoadingIcon";

function Products() {
    const appState = useContext(StateContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requestCount, setrequestCount] = useState(0);

    useEffect(() => {
        async function getItems() {
            const response = await axios.get("/items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            setItems(response.data);
            setIsLoading(false);
            setrequestCount(prev => prev + 1);
        }
        getItems();
    }, []);

    return (
        <>
            <div className="">
                <div className="container">
                    <main className="main h-100">
                        <div className="row">
                            <div className="row__4--medium">
                                <form>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                    />

                                    <div className="row">
                                        <div className="row__4--medium">
                                            <input
                                                type="text"
                                                name="sku"
                                                id="sku"
                                            />
                                        </div>
                                        <div className="row__4--medium">
                                            <input
                                                type="text"
                                                name="quantity"
                                                id="quantity"
                                            />
                                        </div>
                                        <div className="row__4--medium">
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                            />
                                        </div>
                                    </div>

                                    <button className="btn btn--blue">
                                        Add new
                                    </button>
                                </form>
                                ;
                            </div>

                            <div className="row__8--medium">
                                {isLoading && (
                                    <div className="total-centerize h-100">
                                        <LoadingIcon size="lg" />
                                    </div>
                                )}
                                {items.map(item => (
                                    <p>
                                        {item.title} <span>{item.sku}</span>{" "}
                                        <span>{item.ebay_item_id}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Products;
