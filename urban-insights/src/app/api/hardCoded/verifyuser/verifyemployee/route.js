import { connect } from '@/dbConfig/dbConfig';
import Otp from '@/models/otp';
import Authentication from '@/models/auth.js';
const bcrypt = require('bcrypt');
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    connect();
    let email;
    const reqBody = await req.json();
    const { deptusername, deptpassword, username, password } = reqBody;
    const user = await Authentication.findOne({ username: username }) // Set timeout to 30 seconds

    if (user) {
        const check = await bcrypt.compare(deptpassword, user.deptpassword);
        const passcheck = await bcrypt.compare(password, user.password);
        if (deptusername === user.deptusername && username === user.username && check && passcheck) {
            const otp = generateOtp();
            email = user.email;
            console.log(email);

            // Send OTP via email
            const err = await sendOtpByEmail(email, otp);
            if (err) {
                console.error(err);
                return NextResponse.json({
                    message: "Cant send otp",
                    success: false
                });
            }

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

            // Set a timeout to delete the OTP after 5 minute
            setTimeout(async () => {
                await Otp.findOneAndDelete({ email: email });
                console.log(`OTP for ${email} deleted after 1 minute.`);
            }, 60000*5); // 60000 milliseconds = 1 minute

            return NextResponse.json({
                message: "Success",
                success: true,
                user:user
            });
        } else {
            return NextResponse.json({
                message: "Fail",
                success: false,
                user:null
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

   await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return error
        } else {
            return null
        }
    });
}
