import React, { useEffect, useState } from 'react'
import { getTransaction } from '../Api/UserApi'

const Balance = () => {

    const [balance, setBalance] = useState(0);
    const fetchWallet = async () => {
        try {
            let res = await getTransaction();
            if (res?.data?.success) {
                setBalance(res.data.wallet.balance)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchWallet();
    }, [])

    return (
        <div className='flex justify-center items-center h-96'>
            <div className='w-1/3 p-5 py-10 bg-green-950 rounded shadow-md'>
                <h2 className='text-md text-white'>Balance</h2>
                <h2 className='text-2xl font-semibold text-[#c4c788]'>Rs {balance}</h2>
            </div>
        </div>
    )
}

export default Balance
