import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { signup } from '../Api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Store/Slices/UserSlice';

const Signup = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = async (e) => {
    e.preventDefault();
    if (!data.name.trim().length) {
      toast.error('Enter name!');
      return;
    } else if (!data.email.trim().length) {
      toast.error('Enter email!');
      return;
    } else if (!data.password.trim().length) {
      toast.error('Enter password!');
      return;
    }

    try {
      let res = await signup(data);
      console.log(res)
      if (res?.data?.success) {
        toast.success('Registered successfully!');
        localStorage.setItem('userToken', res.data.token);
        dispatch(setUserDetails(res.data.token))
        navigate('/');
      } else {
        toast.error(res.response.data.message)
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
      px-6 py-10 sm:px-10 sm:py-6 
      bg-white rounded shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-green-900">
            Signup
          </h2>
          <label
            htmlFor="email"
            className="block mt-8 text-xs font-semibold text-gray-600 uppercase"
          >
            Name
          </label>
          <input
            onChange={(e) => setData({ ...data, name: e.target.value })}
            autoComplete="email"
            className="block w-full py-1 px-1 
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required=""
          />
          <label
            htmlFor="email"
            className="block mt-6 text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            autoComplete="email"
            className="block w-full py-1 px-1 
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required=""
          />
          <label
            htmlFor="password"
            className="block mt-6 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="current-password"
            className="block w-full py-1 px-1 mb-4
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required=""
          />
          <button
            onClick={submitData}
            className="w-full py-3 mt-10 bg-green-950 rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            Signup
          </button>
          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <a onClick={() => navigate('/login')} className="flex-2 underline">
              Already an user?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
