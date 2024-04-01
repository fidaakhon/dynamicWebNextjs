import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import { connectToDB } from "@/db/dbConfig";
import bcryptjs from "bcryptjs";

connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({
                message: "Please provide email and password",
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            const response = NextResponse.json({
                message: "User not found",
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();
        const response = NextResponse.json({
            message: "Password changed successfully",
            success: true
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            error: error?.message
        })
    }
}


