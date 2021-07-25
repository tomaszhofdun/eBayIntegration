import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

function Pagination(props) {
    const { amountOfPages, currentPage, setCurrentPage } = props;

    // const { url } = useRouteMatch();

    function nextClickHandler() {
        if (currentPage !== amountOfPages) {
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
            <div className="products__pagination">
                <p>
                    {" "}
                    {currentPage > amountOfPages
                        ? "no results"
                        : currentPage + " page"}{" "}
                </p>

                <Link to={"/dashboard/products/" + (currentPage - 1)}>
                    <button
                        onClick={prevClickHandler}
                        className={
                            "btn btn--sm btn--grey btn--left-round mr-2 " +
                            (currentPage == 1 && "btn--disabled")
                        }
                        disabled={currentPage == 1 && true}
                    >
                        Prev
                    </button>
                </Link>

                <Link to={"/dashboard/products/" + (currentPage + 1)}>
                    <button
                        onClick={nextClickHandler}
                        className={
                            "btn btn--sm btn--grey btn--right-round ml-2 " +
                            (currentPage >= amountOfPages && "btn--disabled")
                        }
                        disabled={currentPage >= amountOfPages && true}
                    >
                        Next
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Pagination;
