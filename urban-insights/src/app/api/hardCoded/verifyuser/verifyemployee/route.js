import { connect } from '@/dbConfig/dbConfig';
import Otp from '@/models/otp';
import Authentication from '@/models/auth.js';
const bcrypt = require('bcrypt');
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    const reqBody = await req.json();
    const { deptusername, deptpassword, username, password } = reqBody;
    const user = await Authentication.findOne({ username: username }).maxTimeMS(30000); // Set timeout to 30 seconds

    if (user) {
        const check = await bcrypt.compare(deptpassword, user.deptpassword);
        const passcheck = await bcrypt.compare(password, user.password);
        if (deptusername === user.deptusername && username === user.username && check && passcheck) {
            const otp = generateOtp();
            const email = user.email;
            console.log(email);

            // Send OTP via email
            await sendOtpByEmail(email, otp);

            // Save OTP and email in the database
            const existingOtp = await Otp.findOne({ email: email });
            if (existingOtp) {
                // Update existing OTP document
                await Otp.findOneAndUpdate({ email: email }, { otp: otp, createdAt: new Date() });
            } else {
                // Create new OTP document
                const newOtp = new Otp({
                    email: email,
                    otp: otp,
                    createdAt: new Date()
                });
                await newOtp.save();
            }

            // Set a timeout to delete the OTP after 1 minute
            setTimeout(async () => {
                await Otp.findOneAndDelete({ email: email });
                console.log(`OTP for ${email} deleted after 1 minute.`);
            }, 60000); // 60000 milliseconds = 1 minute

            return NextResponse.json({
                message: "Success",
                success: true
            });
        } else {
            return NextResponse.json({
                message: "Fail",
                success: false
            });
        }
    } else {
        return NextResponse.json({
            message: "User not found",
            success: false
        });
    }
}

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOtpByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ankurskkolh1010@gmail.com",
            pass: "wjyf zmoo irem tzbo"
        }
    });

    const mailOptions = {
        from: "ankurskkolh1010@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
