import React from "react";

function ProductsTable(props) {
    const { currentItems } = props;
    return (
        <>
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
    );
}

export default ProductsTable;
