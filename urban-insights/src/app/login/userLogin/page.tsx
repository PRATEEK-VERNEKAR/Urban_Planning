// LoginForm.js
"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    deptusername: "",
    deptpassword: "",
  });

  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/hardCoded/verifyuser/verifyemployee", formData);

      if (response.data.success) {
        console.log("Login successful!");

        // Redirect to the OTP verification page after successful login
        router.push('http://localhost:3000/login/otpverify');
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'black' }}>User Login</h2>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <label htmlFor="username" style={{ color: 'white' }}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          style={{ backgroundColor: 'black', color: 'white' }}
        />

        <label htmlFor="password" style={{ color: 'white' }}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={{ backgroundColor: 'black', color: 'white' }}
        />

        <label htmlFor="deptusername" style={{ color: 'white' }}>Department Username:</label>
        <input
          type="text"
          id="deptusername"
          name="deptusername"
          value={formData.deptusername}
          onChange={handleInputChange}
          required
          style={{ backgroundColor: 'white', color: 'black' }}
        />

        <label htmlFor="deptpassword" style={{ color: 'white' }}>Department Password:</label>
        <input
          type="password"
          id="deptpassword"
          name="deptpassword"
          value={formData.deptpassword}
          onChange={handleInputChange}
          required
          style={{ backgroundColor: 'white', color: 'black' }}
        />

        <button type="submit" style={{ backgroundColor: 'white', color: 'black' }}>Login</button>
      </form>
    </div>
  );
}
