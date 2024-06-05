import React, { useState } from 'react'
import { addCategory } from '../Api/UserApi';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    const submitData = async () => {
        try {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('image', image);
            
            console.log(formData)
            let res = await addCategory(formData);
            if (res?.data?.success) {
                toast.success('Category added!')
            } else {
                toast.error('Category is not added!')
            }

        } catch (err) {
            console.log(err);
            toast.error('Category is not added!')
        }
    }
    return (
        <div className='h-screen flex justify-center'>
            <div className='w-1/2 mt-10'>/
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-400 "
                    >
                        Category name
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="email"
                        value={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-400 "
                    >
                        Category type
                    </label>
                    <input
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        type="text"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required=""
                    />
                </div>

                <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="user_avatar"
                >
                    Upload file
                </label>
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    accept="image/*"
                />

                <button
                    onClick={submitData}
                    type="submit"
                    className="mt-5 text-white bg-green-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Submit
                </button>
                </div>
        </div>
    )
}

export default AddCategory
