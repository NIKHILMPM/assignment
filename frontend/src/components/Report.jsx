import React, { useState, useEffect } from 'react'
import { Nav } from "./Nav"
import axios from 'axios'

export const Report = () => {
    const [report, setReport] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("/api/report")
                const arr = response.data
                const arr2 = []

                // Grouping data based on unique `uid`
                for (let i = 0; i < arr.length; i++) {
                    const index = arr2.findIndex(item => item.uid === arr[i].uid)
                    if (index === -1) {
                        arr2.push(
                            {
                                rid: arr[i].rid,
                                uid: arr[i].uid,
                                username: arr[i].username,
                                city: [{
                                    city_name: arr[i].city
                                }]
                            }
                        )
                    } else {
                        arr2[index].city.push(
                            {
                                city_name: arr[i].city
                            }
                        )
                    }
                }
                setReport(arr2)
            } catch (error) {
                console.error('Error fetching report:', error)
            }
        }

        fetch()
    }, [])

    return (
        <>
            <Nav />
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Search Report</h2>
                <div className="space-y-4">
                    {report.map(item => (
                        <div key={item.uid} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                            <div className="flex items-center space-x-4">
                                <div className="text-xl font-semibold text-gray-800">{item.username}</div>
                                <div className="text-gray-500">searched for</div>
                                <div className="text-gray-800 font-medium">
                                    {item.city.map(city => city.city_name).join(', ')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
