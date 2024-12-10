import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repassword) {
            try {
                const response = await axios.post("/api/register", { username: (fname + " " + lname), email: email, password: password })

                if (response.data) {
                    console.log(response)
                    alert("Registration successful")
                    navigate("/login")
                } else {
                    alert("Registration failed! User email already in use")
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            alert("Passwords don't match")
        }
    }

    return (
        <>
            <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
                <div className="w-[90%] md:w-[40%] h-[80%] bg-white rounded-xl shadow-lg p-8">
                    <div className='w-full flex justify-center mb-6'>
                        <h1 className='text-4xl font-bold font-serif text-gray-800'>Sign-Up</h1>
                    </div>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-6">
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setFname(e.target.value)}
                                type="text"
                                placeholder='Enter your First Name'
                                required
                            />
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setLname(e.target.value)}
                                type="text"
                                placeholder='Enter your Last Name'
                                required
                            />
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder='Enter your email address'
                                required
                            />
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder='Set your password'
                                required
                            />
                            <input
                                className='w-full p-4 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                onChange={(e) => setRepassword(e.target.value)}
                                type="password"
                                placeholder='Re-enter your password'
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
                        <Link to='/login'>
                            <p className='text-lg font-semibold text-indigo-600'>Already have an account? Log in</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
