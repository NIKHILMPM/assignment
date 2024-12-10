import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

export const Nav = () => {
    const [state, setState] = useState(false)
    const [tokenData, setTokenData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setTokenData(decodedToken)
            setState(true);
        } else {
            navigate("/login")
        }
    }, [state])

    const handleLogout = () => {
        localStorage.removeItem("token");
        setState(false)
        navigate("/login") // Redirect to login after logout
    }

    return (
        <div className='w-full bg-gray-800 text-white p-4 flex justify-between items-center'>
            <Link to="/home" className='text-xl font-semibold hover:text-gray-400'>
                Home
            </Link>
            <div className='flex items-center space-x-4'>
                {state ? (
                    <>
                        <span className='flex items-center space-x-2'>
                            <span className='rounded-full bg-blue-500 text-white px-3 py-1 font-bold'>
                                {tokenData.username ? tokenData.username[0].toUpperCase() : 'U'}
                            </span>
                            <span className='text-sm'>{`Hi, ${tokenData.username}`}</span>
                        </span>
                        <Link to="/report" className='text-lg font-medium hover:text-gray-400'>
                            Reports
                        </Link>
                        <span onClick={handleLogout} className='text-lg font-medium text-red-500 cursor-pointer hover:text-red-400'>
                            Log Out
                        </span>
                    </>
                ) : (
                    <Link to="/home" className='text-lg font-medium hover:text-gray-400'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}
