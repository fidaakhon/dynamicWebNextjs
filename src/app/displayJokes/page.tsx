"use client";
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";



export default function DisplayJokes() {
    const [ids, setIds] = useState(0);
    const [jokes, setJokes] = useState(
        {
            id: 0,
            title: "",
            content: ""
        }
    );
    const [isAvailable, setIsAvailable] = useState(false);

    const router = useRouter();

    const onSave = async () => {
        try {
            const res = await axios.get('/api/user/joke', {
                params: {
                    id: 2,
                }
            })
            console.log(res.data);
            setIsAvailable(true);
            setJokes({
                id: res.data.id,
                title: res.data.title,
                content: res.data.content
            });
        } catch (error) {
            console.log("this is the error", error);
        }
    }

    const onDelete = async (id1: any) => {
        try {
            const res = await axios.delete("/api/user/joke", {
                params: {
                    id: id1,
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log("data is not deleted", error)
        }

    }

    const LogOut = async () => {
        try {
            const res = await axios.get("/api/user/logout")
            console.log(res.data)
            router.push('/login')
        } catch (error) {
            console.log("Error while logging out the user", error)
        }
    }

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-center">Display Jokes</h1>
                <input type="number" name="id" onChange={
                    (e) => setIds(parseInt(e.target.value))
                } className="mb-4 rounded p-3 border-slate-950 bg-slate-400" /><br />
                <button onClick={onSave} className="rounded p-4 m-4 bg-green-500">Get Joke</button>
                <button onClick={() => router.push('/joke')} className="rounded p-4 m-4 bg-blue-500">Post Jokes</button>
                <button onClick={LogOut} className="rounded p-4 m-4 bg-yellow-500">Logout</button>
            </div>
            {isAvailable && <div className="jokes text-center border-black bg-cyan-400">
                <h3 className="text-2xl font-bold mb-4">Joke</h3>
                <p>{jokes.title}</p>
                <p>{jokes.content}</p>
                <button onClick={() => onDelete(jokes.id)} className="p-5 bg-red-500 rounded ">X</button>
            </div>}
        </>
    )
}