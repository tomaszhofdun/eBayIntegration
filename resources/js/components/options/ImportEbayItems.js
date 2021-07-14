import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import StateContext from "../StateContext";
import ReactTooltip from "react-tooltip";

import LoadingIcon from "../LoadingIcon";

function ImportEbayItems() {
    const appState = useContext(StateContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataSaving, setDataSaving] = useState(false);

    async function handleImportItems() {
        setIsLoading(true);
        try {
            const resp = await axios.get("ebay/import-items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            if (resp.data.Ack == "Success") {
                setIsLoading(false);
                setItems(resp.data.ActiveList.ItemArray.Item);
                setDataLoaded(true);
                console.log(resp.data.ActiveList.ItemArray.Item);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSaveToDatabase() {
        setDataSaving(true);
        try {
            const resp = await axios.post(
                "ebay/import-items",
                {
                    items
                },
                {
                    headers: {
                        Authorization: `Bearer ${appState.user.token}`
                    }
                }
            );

            console.log(resp);
            if (resp.data == "Success") {
                setDataSaving(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <button
                className="btn btn--blue btn--sm"
                onClick={handleImportItems}
            >
                Importuj 200 aukcji
            </button>
            <ConnectEbay />
            {dataLoaded ? (
                <>
                    {dataSaving ? (
                        <LoadingIcon size="sm" />
                    ) : (
                        <button
                            data-tip="Click to save imported data to database"
                            data-for="buttons"
                            className="btn btn--red btn--icon"
                            onClick={handleSaveToDatabase}
                        >
                            Zapisz do bazy
                        </button>
                    )}
                    <ReactTooltip id="buttons" />
                </>
            ) : (
                ""
            )}
            {isLoading ? (
                <div className="total-centerize h-100 ">
                    <LoadingIcon size="lg" />
                </div>
            ) : (
                <div className="table table--absolute">
                    <table>
                        <thead className="table__head">
                            <tr>
                                <th>LP</th>
                                <th>SKU</th>
                                <th>PICTURE</th>
                                <th>QUANTITY</th>
                                <th>PRICE</th>
                                <th>ITEM ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{item.SKU}</td>
                                    <td>
                                        <img
                                            src={item.PictureDetails.GalleryURL}
                                            alt=""
                                        />
                                    </td>
                                    <td>{item.QuantityAvailable}</td>
                                    <td>{item.BuyItNowPrice}</td>
                                    <td>{item.ItemID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
import { fromPairs } from "lodash";
import ConnectEbay from "./ConnectEbay";

export default ImportEbayItems;
