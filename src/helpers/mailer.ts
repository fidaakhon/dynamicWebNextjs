import nodemailer from 'nodemailer';
import { User } from '@/models/user';
import bcryptjs from 'bcryptjs';


export const sendMail = async ({ email, emailtype, userId }: any) => {
    try {
        //create a hashedtoke
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailtype === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailtype === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e058d5ef6d46af",
                pass: "dcac468eb7dd54"
            }
        });

        const mailOptions = {
            from: 'fidaurr900@gmail.com',
            to: email,
            subject: emailtype === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            //create seperate html for verify and reset
            html: emailtype === 'VERIFY' ? `<h1>Verify your email</h1>
            <p>Click this <a href="http://localhost:3000/verifyemail?token=${hashedToken}">link</a> to verify your email <br/>
            or Copy this link and paste it in your browser http://localhost:3000/verifyemail?token=${hashedToken}
            </p>` :
                `<h1>Reset your password</h1>
            <p>Click this <a href="http://localhost:3000/resetpassword?token=${hashedToken}">link</a> to reset your password <br/>
            or Copy this link and paste it in your browser http://localhost:3000/resetpassword?token=${hashedToken}
            </p>`

        }

        const sendMailResponnse = await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error.message);
            }
        });

        return sendMailResponnse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}