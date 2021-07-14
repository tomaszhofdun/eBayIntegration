import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import StateContext from "./StateContext";
import LoadingIcon from "./LoadingIcon";
import AddItem from "./products/AddItem";

function Products() {
    const appState = useContext(StateContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requestCount, setrequestCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        async function getItems() {
            const response = await axios.get("/items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            setItems(response.data);
            // console.log(response.data);
            setIsLoading(false);
            setrequestCount(prev => prev + 1);
        }
        getItems();
    }, []);

    // Get current items

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    function nextClickHandler() {
        if (indexOfLastItem !== items.length) {
            console.log("cos");
            setCurrentPage(prev => prev + 1);
        }
    }
    function prevClickHandler() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }
    return (
        <>
            <div className="container">
                <main className="main h-100">
                    <div className="row">
                        <div className="row__4--medium">
                            <AddItem />
                        </div>

                        <div className="row__8--medium">
                            <div className="search-form">
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="ENTER TEXT TO SEARCH..."
                                />
                            </div>
                            {isLoading ? (
                                <div className="h-100">
                                    <LoadingIcon size="lg" />
                                </div>
                            ) : (
                                <>
                                    <p>{currentPage} page</p>
                                    <button
                                        onClick={prevClickHandler}
                                        className={
                                            "btn btn--sm btn--grey btn--left-round mr-2 " +
                                            (currentPage == 1 &&
                                                "btn--disabled")
                                        }
                                    >
                                        Prev
                                    </button>
                                    <button
                                        onClick={nextClickHandler}
                                        className={
                                            "btn btn--sm btn--grey btn--right-round ml-2 " +
                                            (indexOfLastItem == items.length &&
                                                "btn--disabled")
                                        }
                                    >
                                        Next
                                    </button>
                                    <table className="table">
                                        <thead className="table__head">
                                            <tr>
                                                <th>ID</th>
                                                <th>SKU</th>
                                                <th>TITLE</th>
                                                <th>QUANTITY</th>
                                                <th>PRICE</th>
                                                <th>ITEM ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.sku}</td>
                                                    <td>{item.title}</td>

                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.ebay_item_id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Products;
