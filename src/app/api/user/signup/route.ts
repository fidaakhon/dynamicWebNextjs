import { connectToDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();
    try {
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Please fill in all fields" });
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        if (!hashedPassword) {
            return NextResponse.json({
                "message": "password not encrypted correctly"
            })
        }


        //check the user already exist or not
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return NextResponse.json({
                message: "this user is already existed",
                success: false
            })
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        await sendMail({ email, emailtype: 'VERIFY', userId: newUser._id });

        return NextResponse.json({
            message: "User signed up successfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({
            "message": "Error while signing up the user"
        })
    }

}