import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", { email: email, password: password })
            const response = res.data
            if (response.message === "success") {
                localStorage.setItem("token", response.token)
                navigate("/home")
            } else if (response.message === "pass") {
                alert("Incorrect password")
            } else {
                alert("User not found")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
                <div className="w-[90%] md:w-[40%] h-[70%] bg-white rounded-xl shadow-lg p-8">
                    <div className='w-full flex justify-center mb-6'>
                        <h1 className='text-4xl font-bold font-serif text-gray-800'>Login</h1>
                    </div>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-6">
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder='Enter your email'
                                required
                            />
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder='Enter your password'
                                required
                            />
                            <button
                                type='submit'
                                className='w-full py-3 rounded-full bg-indigo-600 text-white text-xl font-semibold hover:bg-indigo-700 transition duration-300'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className='w-full flex justify-center mt-4'>
                        <Link to='/register'>
                            <p className='text-lg font-semibold text-indigo-600'>Don't have an account? Sign up</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
