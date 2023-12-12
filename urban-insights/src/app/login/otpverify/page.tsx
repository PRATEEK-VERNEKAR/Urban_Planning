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
      <h2>OTP Verification</h2>
      <p>Enter your email and the OTP sent to your email:</p>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <label>OTP:</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter OTP"
      />

      <button onClick={handleVerification}>Verify OTP</button>
    </div>
  );
}
