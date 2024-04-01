"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const router = useRouter();

    const onSignUp = async () => {
        try {
            const res = await axios.post('/api/user/signup', user);
            if (res.data.success) {
                router.push('/login');
            }
        } catch (error) {
            console.log("this is the error", error);

        }
    }

    return (
        <>
            <div className="jokes text-center border-black bg-cyan-400">
                <h3 className="text-2xl font-bold mb-4">Input jokes</h3>
                <input type="text" name="username" onChange={(e) => setUser(
                    {
                        ...user,
                        username: e.target.value
                    }
                )} className="mb-4 rounded p-3" placeholder="username" /><br />
                <input type="email" name="email" placeholder="email" onChange={(e) => setUser({
                    ...user,
                    email: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <input type="password" name="password" placeholder="password" onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <button onClick={onSignUp} className="rounded p-4 m-4 bg-green-500">Sign Up</button>
            </div>
            <div className="text-center">
                <button onClick={() => router.push('/displayJokes')} className="rounded p-4 m-4 bg-blue-500">Display Jokes</button>
                <button onClick={() => router.push('/joke')} className="rounded p-4 m-4 bg-blue-500">Post Jokes</button>
            </div>
        </>
    );
}