import React from 'react';
import Navbar from '../Components/Navbar';
import Transactions from '../Components/Transactions';
const TransactionPage = () => {
    const categories = ["Food", "Transport", "Entertainment", "Bills", "Others"];
    return (
        <>
            < Navbar />
            < Transactions />
        </>
    )
}

export default TransactionPage
