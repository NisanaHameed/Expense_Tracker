import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { getTransaction } from '../Api/UserApi';

const Transactions = () => {
    const [date, setDate] = useState(new Date());
    const [transactions, setTransactions] = useState();
    const [balance, setBalance] = useState(0);

    const fetchTransctions = async () => {
        try {
            let res = await getTransaction();
            console.log(res)
            let total = 0;
            if (res?.data?.success) {
                let data = res.data.wallet.transaction.filter((val) => {
                    const transactionDate = new Date(val.date);

                    if (transactionDate.toDateString() === date.toDateString()) {
                        total += val.amount;
                        return val;
                    }
                });
                console.log(total)
                setTransactions(data);
                console.log(transactions)
                setBalance(total)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchTransctions();
    }, [date]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md p-4 bg-green-950 rounded shadow-lg">
                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-200">
                        Select Date
                    </label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="w-full p-2.5 border-gray-700 text-gray-200 bg-gray-700 rounded-lg"
                        calendarClassName="bg-gray-700 text-gray-200"
                    />
                </div>
                <div className="p-4 bg-gray-900 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-200">
                            {formatDate(date)}
                        </h5>
                        <a
                            className="text-md font-medium text-blue-400 hover:underline"
                        >
                            {balance}
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="">
                            {transactions && transactions.map((val) =>
                            (
                                <li key={val._id} className="py-3 sm:py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={`https://expensetracker.crafto.live/${val.category.image}`}
                                                alt="Neil image"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm text-gray-400 truncate">
                                                {val.category.name}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-300">
                                            {val.amount}
                                        </div>
                                    </div>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transactions;

