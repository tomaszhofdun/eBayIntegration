import React, { useState, useContext } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import flashMessageIsActiveContext from "../flashMessageIsActiveContext";

function AddItem() {
    const [item, setItem] = useImmer({
        title: "",
        sku: "",
        quantity: "",
        price: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const appFlashMessageIsActive = useContext(flashMessageIsActiveContext);

    function addNewItem(e) {
        e.preventDefault();
        async function storeItem(params) {
            setIsSaving(true);
            const resp = await axios.post("items", item, {
                headers: {
                    Authorization: `Bearer ${appState.user.token}`
                }
            });
            console.log(resp);
            setIsSaving(false);

            if (resp.statusText == "Created") {
                setItem(draft => {
                    (draft.title = ""),
                        (draft.sku = ""),
                        (draft.quantity = ""),
                        (draft.price = "");
                });
                appDispatch({
                    type: "flashMessage",
                    text: "New Item has been added to database",
                    color: "green"
                });
                appDispatch({
                    type: "toggleFlashMessageVisibility",
                    active: true
                });
            }
        }

        storeItem();
    }

    function inputChangeHandler(e, param) {
        const value = e.target.value;
        const name = param;
        setItem(draft => {
            draft[name] = value;
        });
    }

    return (
        <form className="main__add-item">
            <input
                type="text"
                name="title"
                id="title"
                placeholder="title"
                onChange={e => inputChangeHandler(e, "title")}
                value={item.title}
            />

            <div className="row">
                <div className="row__4">
                    <input
                        type="text"
                        name="sku"
                        id="sku"
                        placeholder="sku"
                        value={item.sku}
                        onChange={e => inputChangeHandler(e, "sku")}
                    />
                </div>
                <div className="row__4">
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        placeholder="quantity"
                        value={item.quantity}
                        onChange={e => inputChangeHandler(e, "quantity")}
                    />
                </div>
                <div className="row__4">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="price"
                        value={item.price}
                        onChange={e => inputChangeHandler(e, "price")}
                    />
                </div>
            </div>

            <button
                onClick={addNewItem}
                className="btn btn--blue"
                disabled={isSaving}
            >
                Add new
            </button>
        </form>
    );
}

export default AddItem;
