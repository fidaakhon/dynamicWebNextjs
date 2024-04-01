import { connectToDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                message: "Please provide email and password",
                success: false
            })
        }

        const user = await User.findOne({ email})
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            })
        }

        const isPassworCorrect = await bcryptjs.compare(password, user.password)
        if (!isPassworCorrect) {
            return NextResponse.json({
                message: "Password is not correct",
                success: false
            })
        }

        //token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const jsonToken = jwt.sign({ tokenData }, "12334", { expiresIn: "1d" })

        const responsee = NextResponse.json({
            message: "user logged in successfully",
            success: true,
            token: jsonToken,
        })

        responsee.cookies.set("token", jsonToken, {
            httpOnly: true,
        })

        return responsee
    } catch (error) {
        return NextResponse.json({
            "message": "User Not loged in"
        })
    }
}