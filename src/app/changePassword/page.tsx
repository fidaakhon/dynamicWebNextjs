"use client"

import { useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

export default function ChangePassword() {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChangePassword = async () => {
        // Implement change password logic here
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        const response = await axios.post('/api/user/change_password', {
                email: email,
                password: newPassword,   
        })
        console.log(response.data)
        if (response.data.success) {
            setSuccess(true)
            setEmail('')
            setNewPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div className='bg-blue-400 h-screen w-screen flex justify-center items-center flex-col  '>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white p-2 w-1/4 rounded-md mb-2'
                placeholder='email'
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='bg-white p-2 w-1/4 rounded-md mb-2'
                placeholder='new password'
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='bg-white p-2 w-1/4 rounded-md mb-2'
                placeholder='confirm password'
            />
            {success && <p className='text-white'>Password changed successfully</p>}
            <button onClick={handleChangePassword} className='bg-black rounded p-3 w-40 text-white'>Change Password</button>
        </div>
    )
}

