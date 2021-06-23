import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import StateContext from "../StateContext";

function ImportEbayItems() {
    const appState = useContext(StateContext);

    const [items, setItems] = useState([]);

    async function handleImportItems() {
        try {
            const resp = await axios.get("ebay/import-items", {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            setItems(resp.data.ActiveList.ItemArray.Item);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <button className="btn btn--blue" onClick={handleImportItems}>
                Importuj wszystko
            </button>
            <div className="main__table">
                {items.map(item => (
                    <p className="">
                        SKU: {item.SKU} Ilość: {item.QuantityAvailable}{" "}
                        <img src={item.PictureDetails.GalleryURL} alt="" />
                    </p>
                ))}
            </div>
        </>
    );
}

export default ImportEbayItems;
