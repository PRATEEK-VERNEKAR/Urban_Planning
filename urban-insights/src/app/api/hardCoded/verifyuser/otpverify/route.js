import { connect } from '@/dbConfig/dbConfig';

import Otp from '@/models/otp.js';
const bcrypt = require('bcrypt');
const fs = require('fs');
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    const reqBody = await req.json();
    const { email, otp } = reqBody;

    try {
        const email1 = await Otp.findOne({ email: email });

        if (email1) {
            if (otp === email1.otp) {
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
                message: "Fail",
                success: false
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: "Error",
            success: false
        });
    }
}
