"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/user/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setToken(urlToken || "")
        }

    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl">Verify Email</h1>
                <h2>{token ? `${token}` : "no token"}</h2>

                {verified &&
                    <div>
                        <h2 className="text-green-500">Email verified</h2>
                        <Link href="/login">
                            Login
                        </Link>
                    </div>
                }

                {error &&
                    <div>
                        <h2 className="text-red-500">Error</h2>
                    </div>
                }
            </div>
        </>
    )


}