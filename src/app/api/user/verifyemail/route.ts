import { connectToDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";

connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOneAndUpdate({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }

        }
            , { new: true }
        )

        if (!user) {
            return NextResponse.json(
                { "message": "Invalid or expired token" },
                { status: 400 })
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            "message": "Email verified successfully",
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            "message": "Error while verifying the email",
            success: false
        },
            { status: 500 })
    }
}
