import React, { useState } from "react";
import { useImmer } from "use-immer";

function AddItem() {
    const [item, setItem] = useState({
        title: "",
        sku: "",
        quantity: "",
        price: ""
    });

    function addNewHandler(params) {}

    function inputChangeHandler(e, name) {
        const value = e.target.value;
        switch (name) {
            case "title":
                setItem(prev => ({ ...prev, title: value }));
                console.log(e.target.value);

                return;

            default:
                return;
        }
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
                        onChange={e => inputChangeHandler(e, "sku")}
                    />
                </div>
                <div className="row__4">
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        placeholder="quantity"
                        onChange={e => inputChangeHandler(e, "quantity")}
                    />
                </div>
                <div className="row__4">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="price"
                        onChange={e => inputChangeHandler(e, "price")}
                    />
                </div>
            </div>

            <button onClick={addNewHandler} className="btn btn--blue">
                Add new
            </button>
        </form>
    );
}

export default AddItem;
