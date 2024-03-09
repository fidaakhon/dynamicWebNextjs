"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateJoke() {
    const [jokes, setJokes] = useState({
        id: 0,
        title: "",
        content: ""
    })

    const router = useRouter();

    const onUpdate = async () => {
        try {
            console.log("boyan va");
            const res = await axios.put('/api/user/joke', jokes);
            console.log(res.data);
        } catch (error) {
            console.log("this is the error", error);

        }
    }

    return (
        <>
            <div className="jokes text-center border-black bg-cyan-400">
                <h3 className="text-2xl font-bold mb-4">Input jokes</h3>
                <input type="number" name="id" onChange={(e) => setJokes(
                    {
                        ...jokes,
                        id: parseInt(e.target.value)
                    }
                )} className="mb-4 rounded p-3" placeholder="id" /><br />
                <input type="text" name="title" placeholder="title" onChange={(e) => setJokes({
                    ...jokes,
                    title: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <input type="text" name="content" placeholder="joke" onChange={(e) => setJokes({
                    ...jokes,
                    content: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <button onClick={onUpdate} className="rounded p-4 m-4 bg-green-500">Update</button>
            </div>
            <div className="text-center">
                <button onClick={() => router.push('/displayJokes')} className="rounded p-4 m-4 bg-blue-500">Display Jokes</button>
                <button onClick={() => router.push('/joke')} className="rounded p-4 m-4 bg-blue-500">Post Jokes</button>
            </div>
        </>
    );
};