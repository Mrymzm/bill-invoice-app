import React, { useState } from 'react';

const BillDetails = ({ onAddItem }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddItem = () => {
        if (!item.trim()) {
            setErrorMessage('Please enter an item name.');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(item)) {
            setErrorMessage('Item name should only contain letters.');
            return;
        }

        onAddItem({ item, quantity: Number(quantity), price: Number(price) });
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };

    return (
        <div>
            <label>Item:</label>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

            <button onClick={handleAddItem}>Add Item</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default BillDetails;
