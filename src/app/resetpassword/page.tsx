"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setToken(urlToken || "")
        }
    }, [])

    const onForgotPassword = async () => {
        try {
            const res = await axios.post('/api/user/resetpassword', { email });
            if (res.data.success) {
                setIsVerified(true);

            }
        } catch (error) {
            console.log("this is the error", error);

        }
    }

    const changePassword = async () => {
        try {
            console.log("this is the token", token);
            const res = await axios.put('/api/user/resetpassword', { token, password, confirmPassword });
            console.log("this is the response", res.data);
            if (res.data.success) {
                setIsCompleted(true);
                setPassword("");
                setConfirmPassword("");
                setMessage(res.data.message);
            }
        } catch (error) {
            console.log("this is the error", error);

        }
    }


    return (
        <div className="jokes text-center min-h-screen border-black bg-cyan-400">
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            {!token ? <div>
                <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="mb-4 rounded p-3" /><br />
                <button onClick={onForgotPassword} className="bg-green-500 text-white p-3 rounded">Submit</button>

                {isVerified && <div>
                    <p className="text-green-500">Email sent successfully</p>
                    <p>go to your email and verify </p>
                </div>
                }

            </div> : <div>
                <h2>Change your password</h2>
                <input type="password" name="password" placeholder="password" className="mb-4 rounded p-3" onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="password" name="confirmPassword" placeholder="confirm password" className="mb-4 rounded p-3" onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                <button className="bg-green-500 text-white p-3 rounded" onClick={changePassword}>Submit</button>
                {isCompleted && <div>
                    <p className="text-green-500">{message}</p>
                    <Link href="/login" className="p-4 bg-yellow-400 text-black">Login</Link>
                </div>
                }
            </div>
            }
        </div>
    )
}