import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import { getCategories, submitTransaction } from '../Api/UserApi'
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';

const AddTransaction = () => {

    const [type, setType] = useState('expense');
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());

    const fetchCategories = async () => {
        let res = await getCategories(type);
        console.log(res)
        if (res?.data?.success) {
            setCategories(res.data.categories);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [type])

    const submitData = async (e) => {
        console.log(type)
        console.log(category)
        console.log(date)
        e.preventDefault();
        if (amount < 0 || amount == 0) {
            toast.error('Enter valid amount!');
            return;
        } else if (!category) {
            toast.error('Select a category!');
            return;
        }

        try {
            
            let res = await submitTransaction(amount, category,type,date);
            if (res?.data?.success) {
                toast.success('Transaction added!');
            } else {
                toast.error(res.response.data.message);
            }

        } catch (err) {
            toast.error('Transaction not added!')
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-96 mt-10'>
                <p className="text-gray-400">Enter amount</p>
                <div className='w-1/2 lg:w-1/3 bg-green-950 rounded shadow-md mb-4'>
                    <input onChange={(e) => setAmount(e.target.value)} type="number" className="text-center w-full bg-transparent py-3 text-white text-2xl" />
                </div>
                <div className='w-1/2 lg:w-1/3 mt-4 bg-green-950 rounded shadow-md'>
                    <select onChange={(e) => setType(e.target.value)} className="w-full bg-transparent py-3 px-3 text-gray-400 text-md">
                        <option value='expense' className="bg-green-950 text-white hover:bg-green-700 hover:text-gray-300">
                            Expense
                        </option>
                        <option value='income' className="bg-green-950 text-white hover:bg-green-700 hover:text-gray-300">
                            Income
                        </option>
                    </select>
                </div>
                <p className="text-gray-400 mt-4">Select category</p>
                <div className='w-1/2 lg:w-1/3 bg-green-950 rounded shadow-md'>
                    <select
                        className="w-full bg-transparent py-3 text-gray-400 text-md px-3"

                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((val) => (
                            <option key={val._id} value={val._id} className="bg-green-950 text-white">
                                {val.name}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="text-gray-400 mt-4">Select date</p>
                <div className="flex justify-center w-1/2 lg:w-1/3">
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="bg-green-950 py-3 w-56 rounded shadow-md mx-auto text-gray-400 px-3"
                        calendarClassName="bg-gray-700 text-gray-200"
                    />
                </div>
                <button onClick={submitData} className='px-7 py-3 bg-[#2e2e2e] rounded mt-5 text-white hover:bg-[#2e2e2e]'>SAVE</button>
            </div>
        </>
    );
}

export default AddTransaction;

