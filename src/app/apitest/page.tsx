"use client"
import axios from 'axios';
import React, { useState } from 'react';

export default function Page() {
    const [data, setData] = useState([]);


    const getData = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            console.log(res.data);
            setData(res.data);
        } catch (error) {
            console.error("this is the errot", error);
        }
    }
    return (
        <div>
            <h1 className='text-center'>API Test</h1>
            <div className="button text-center">
                <button
                    onClick={getData} className='p-6 bg-slate-400 rounded'>
                    getdata
                </button>
            </div>
            <div className="flex flex-wrap">
                {data && data.map((item: any, index) => (
                    <div key={index} className="w-1/4 p-4  mb-5">
                        <div className="bg-slate-400 p-4 rounded">
                            <img src={item.image} alt={item.title} className="w-full h-60" />
                            <h3>{item.title}</h3>
                            <p>price: ${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}