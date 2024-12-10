import React, { useEffect, useState } from 'react'
import { Nav } from './Nav'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const Home = () => {

    const [state, setState] = useState(false)
    const [tokenData, setTokenData] = useState(null)
    const [search, setSearch] = useState("")
    const [cityData, setCityData] = useState([])
    const [weatherQueryState, setWeatherQueryState] = useState(false)
    const [divState, setDivState] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setTokenData(decodedToken)
            setState(true);
            console.log(tokenData)
        } else {
            navigate("/login")
        }
    }, [state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("/api/searchCity", { cityName: search, uid: tokenData.id })
        if (response.data.status) {
            setCityData(response.data.weatherData)
            setDivState(true)
            setWeatherQueryState(true)
        } else {
            setWeatherQueryState(false)
        }
    }

    return (
        <>
            <Nav />

            <div className='h-screen bg-gradient-to-b from-slate-500 to-slate-300'>
                <div className='container mx-auto p-6'>
                    <form className='flex justify-center mb-6' onSubmit={handleSubmit}>
                        <input
                            className="px-4 py-2 w-3/4 md:w-1/2 text-xl rounded-l-lg focus:outline-none"
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder='Search for city weather'
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-r-lg hover:bg-blue-600 transition duration-300"
                            type='submit'>
                            Search
                        </button>
                    </form>

                    <div className='flex justify-center items-start'>
                        {divState ?
                            <>
                                {weatherQueryState ?
                                    <div className="h-[70%] w-full md:w-[60%] bg-slate-700 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-start space-y-4">
                                        <h1 className="text-3xl font-bold mb-4">Hi, {tokenData.username.split(" ")[0]}!</h1>
                                        <p className="text-lg mb-2">
                                            Here's the weather for <span className="font-semibold">{cityData.location.name}, {cityData.location.country}</span>:
                                        </p>
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={cityData.current.weather_icons[0]}
                                                alt={cityData.current.weather_descriptions[0]}
                                                className="h-16 w-16 mr-4"
                                            />
                                            <p className="text-xl font-medium">{cityData.current.weather_descriptions[0]}</p>
                                        </div>
                                        <div className="text-left space-y-2">
                                            <p><span className="font-semibold">Temperature:</span> {cityData.current.temperature}°C</p>
                                            <p><span className="font-semibold">Feels Like:</span> {cityData.current.feelslike}°C</p>
                                            <p><span className="font-semibold">Humidity:</span> {cityData.current.humidity}%</p>
                                            <p><span className="font-semibold">Wind:</span> {cityData.current.wind_speed} km/h {cityData.current.wind_dir}</p>
                                            <p><span className="font-semibold">Pressure:</span> {cityData.current.pressure} mb</p>
                                            <p><span className="font-semibold">Visibility:</span> {cityData.current.visibility} km</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='h-[70%] w-full md:w-[60%] bg-slate-600 text-white rounded-lg flex items-center justify-center p-6'>
                                        No weather data available for "{search}"
                                    </div>
                                }
                            </>
                            :
                            <div className="text-xl text-gray-700">Search for weather data</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
