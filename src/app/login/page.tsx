"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LogIn() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const router = useRouter();

    const onSignUp = async () => {
        try {
            const res = await axios.post('/api/user/login', user);
            if (res.data.success) {
                router.push('/displayJokes');
            }
        } catch (error) {
            console.log("this is the error", error);

        }
    }

    return (
        <>
            <div className="jokes text-center border-black bg-cyan-400">
                <h3 className="text-2xl font-bold mb-4">Login Page</h3>
                <input type="email" name="email" placeholder="email" onChange={(e) => setUser({
                    ...user,
                    email: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <input type="password" name="password" placeholder="password" onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })} className="mb-4 rounded p-3" /><br />
                <button onClick={onSignUp} className="rounded p-4 m-4 bg-green-500">Login</button>
            </div>
            <div className="text-center">
                <button onClick={() => router.push('/displayJokes')} className="rounded p-4 m-4 bg-blue-500">Display Jokes</button>
                <button onClick={() => router.push('/signup')} className="rounded p-4 m-4 bg-blue-500">Sign up</button>
                <button onClick={() => router.push('/resetpassword')} className="rounded p-4 m-4 bg-blue-500">Reset Password</button>
            </div>
        </>
    );
}