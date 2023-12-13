// components/OTPVerification.js
"use client";
import { useState } from 'react';
import axios from 'axios';

export default function OTPVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const handleVerification = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/hardCoded/verifyuser/otpverify', { email, otp });

      if (response.data.success) {
        console.log("Login Successful");
        // onVerificationSuccess();
      } else {
        console.log("Wrong Otp");
        // Incorrect OTP

      }
    } catch (error) {
      // Handle other errors
      console.error('Error during OTP verification:', error);
      //   onVerificationFailure();
    }
  };

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>OTP Verification</p>
      <div className='flex flex-col gap-y-4 nform'>

        <div className="flex flex-row nform-input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full outline-none transparent"
          />
        </div>

        <div>
          <div className="flex flex-row nform-input">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              className="w-full outline-none transparent"
              />
          </div>
        <p style={{fontSize:"0.7em"}}>* Enter your email and the OTP sent to your email</p>
        </div>

        <button onClick={handleVerification} className="nform-send otp mx-auto">Verify OTP</button>
      </div>
    </div>
  );
}
