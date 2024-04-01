import mongoose from "mongoose";
import { User } from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import { connectToDB } from "@/db/dbConfig";
import bcryptjs from "bcryptjs";

connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({
                message: "Email is required",
                success: false
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            })
        }

        const passwordToken = await sendMail({ email, emailtype: 'RESET', userId: user._id });

        user.resetPasswordToken = passwordToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        return NextResponse.json({
            message: "Email sent successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "An error occurred",
            error: error.message,
            success: false
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password, confirmPassword } = reqBody;

        if (!token || !password || !confirmPassword) {
            return NextResponse.json({
                message: "All fields are required",
                success: false
            })
        }

        if (password !== confirmPassword) {
            return NextResponse.json({
                message: "Passwords do not match",
                success: false
            })
        }

        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) {
            return NextResponse.json({
                message: "Invalid token",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Password changed successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "An error occurred",
            error: error.message,
            success: false
        })
    }
}