import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import StateContext from "./StateContext";
import LoadingIcon from "./LoadingIcon";
import AddItem from "./products/AddItem";
import SearchForm from "./products/SearchForm";
import Pagination from "./products/Pagination";
import ProductsTable from "./products/ProductsTable";
import { useParams } from "react-router-dom";

function Products() {
    const appState = useContext(StateContext);

    const { page_number } = useParams();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(parseInt(page_number));
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        async function getItems() {
            const response = await axios.get("/items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
                // params: {
                //     Authorization: `Bearer ${appState.user.token}`
                // }
            });
            setItems(response.data);
            setIsLoading(false);
        }
        getItems();
    }, []);

    // Get current items

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const amountOfPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="container">
                <main className="main h-100">
                    <div className="products">
                        <div className="row">
                            <div className="row__4--medium">
                                <AddItem setItems={setItems} />
                            </div>

                            <div className="row__8--medium">
                                <SearchForm />
                                {isLoading ? (
                                    <div className="h-100">
                                        <LoadingIcon size="lg" />
                                    </div>
                                ) : (
                                    <>
                                        <Pagination
                                            amountOfPages={amountOfPages}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                        <ProductsTable
                                            currentItems={currentItems}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Products;
