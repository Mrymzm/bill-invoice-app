import React, { useState } from 'react';
import BillDetails from './components/BillDetails';
import ItemList from './components/ItemList';
import TotalAmount from './components/TotalAmount';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
    const [items, setItems] = useState([]);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const calculateTotalAmount = () => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        pdf.text('Invoice', 20, 20);

        items.forEach((item, index) => {
            pdf.text(
                `Item: ${item.item}, Quantity: ${item.quantity}, Price: $${item.price}`,
                20,
                30 + index * 10
            );
        });

        pdf.text(`Total Amount: $${calculateTotalAmount().toFixed(2)}`, 20, 180);
        pdf.save('invoice.pdf');
    };

    return (
        <div className="App">
            <h1>Bill/Invoice Generator</h1>
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;
