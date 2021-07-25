import React, { useState, useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import flashMessageIsActiveContext from "../flashMessageIsActiveContext";

function AddItem(props) {
    const { setItems } = props;
    const [item, setItem] = useImmer({
        title: {
            value: "",
            errorMessage: []
        },
        sku: {
            value: "",
            errorMessage: []
        },
        quantity: {
            value: "",
            errorMessage: []
        },
        price: {
            value: "",
            errorMessage: []
        }
        // requestCount: 0
    });
    const [isSaving, setIsSaving] = useState(false);

    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const appFlashMessageIsActive = useContext(flashMessageIsActiveContext);

    useEffect(() => {
        if (item.title.value) {
            var inputTimer = setTimeout(() => {
                validate("title");
            }, 700);

            return () => clearTimeout(inputTimer);
        }
    }, [item.title.value]);
    useEffect(() => {
        if (item.sku.value) {
            var inputTimer = setTimeout(() => {
                validate("sku");
            }, 700);

            return () => clearTimeout(inputTimer);
        }
    }, [item.sku.value]);
    useEffect(() => {
        if (item.quantity.value) {
            var inputTimer = setTimeout(() => {
                validate("quantity");
            }, 700);

            return () => clearTimeout(inputTimer);
        }
    }, [item.quantity.value]);
    useEffect(() => {
        if (item.price.value) {
            var inputTimer = setTimeout(() => {
                validate("price");
            }, 700);

            return () => clearTimeout(inputTimer);
        }
    }, [item.price.value]);

    function addNewItem(e) {
        e.preventDefault();
        async function storeItem() {
            setIsSaving(true);
            const resp = await axios.post(
                "items",
                {
                    title: item.title.value,
                    sku: item.sku.value,
                    quantity: item.quantity.value,
                    price: item.price.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${appState.user.token}`
                    }
                }
            );
            setIsSaving(false);

            if (resp.statusText == "Created") {
                setItem(draft => {
                    (draft.title.value = ""),
                        (draft.sku.value = ""),
                        (draft.quantity.value = ""),
                        (draft.price.value = "");
                });
                setItems(prev => {
                    const prevItems = [...prev];
                    prevItems.unshift(resp.data);
                    return prevItems;
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

    function validate(name) {
        switch (name) {
            case "title":
                setItem(draft => {
                    draft.title.errorMessage = [];
                });
                if (item.title.value.length > 80) {
                    setItem(draft => {
                        draft.title.errorMessage.push(
                            "Maximum length of the title is 80 characters"
                        );
                    });
                }
                if (!/^[\s\w]+$/.test(item.title.value)) {
                    setItem(draft => {
                        draft.title.errorMessage.push(
                            "You can only use alphanumeric and underscore"
                        );
                    });
                }
                break;
            case "sku":
                setItem(draft => {
                    draft.sku.errorMessage = [];
                });
                if (item.sku.value.length > 9) {
                    setItem(draft => {
                        draft.sku.errorMessage.push(
                            "Maximum length of the sku is 9 characters"
                        );
                    });
                }
                if (!/^\w+$/.test(item.sku.value)) {
                    setItem(draft => {
                        draft.sku.errorMessage.push(
                            "You can only use alphanumeric and underscore"
                        );
                    });
                }

                break;
            case "quantity":
                console.log("quantity");
                setItem(draft => {
                    draft.quantity.errorMessage = [];
                });
                if (!/^[0-9]+$/g.test(item.quantity.value)) {
                    setItem(draft => {
                        draft.quantity.errorMessage.push(
                            "You can only use digits"
                        );
                    });
                }
                break;
            case "price":
                setItem(draft => {
                    draft.price.errorMessage = [];
                });
                if (!/^\d+(\.?\d{2})?$/g.test(item.price.value)) {
                    setItem(draft => {
                        draft.price.errorMessage.push(
                            "Price format incorrect, example: 12.99"
                        );
                    });
                }
                break;

            default:
                break;
        }
    }

    function inputChangeHandler(e, param) {
        const value = e.target.value;
        const name = param;
        setItem(draft => {
            draft[name].value = value;
        });
    }

    return (
        <form className="add-item-form">
            {item.title.errorMessage &&
                item.title.errorMessage.map(message => (
                    <p className="add-item-form__label">{message}</p>
                ))}
            <input
                type="text"
                name="title"
                id="title"
                placeholder="title"
                onChange={e => inputChangeHandler(e, "title")}
                value={item.title.value}
            />
            <span className="add-item-form__counter">
                {item.title.value.length}/80
            </span>

            <div className="row">
                <div className="row__4">
                    <input
                        type="text"
                        name="sku"
                        id="sku"
                        placeholder="sku"
                        value={item.sku.value}
                        onChange={e => inputChangeHandler(e, "sku")}
                    />
                    {item.sku.errorMessage &&
                        item.sku.errorMessage.map(message => (
                            <p className="add-item-form__label">{message}</p>
                        ))}
                </div>

                <div className="row__4">
                    <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        placeholder="quantity"
                        value={item.quantity.value}
                        onChange={e => inputChangeHandler(e, "quantity")}
                    />
                    {item.quantity.errorMessage &&
                        item.quantity.errorMessage.map(message => (
                            <p className="add-item-form__label">{message}</p>
                        ))}
                </div>
                <div className="row__4">
                    <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="price"
                        value={item.price.value}
                        onChange={e => inputChangeHandler(e, "price")}
                    />
                    {item.price.errorMessage &&
                        item.price.errorMessage.map(message => (
                            <p className="add-item-form__label">{message}</p>
                        ))}
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
