// LoginForm.js
"use client"

import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    deptusername: "",
    deptpassword: "",
  });

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
      const response = await axios.post("http://localhost:3000/api/hardCoded/verifyuser/verifyemployee", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log("Login successful!");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>User Login</p>

      {/* Login Form */}
      <form className="flex flex-col gap-y-4 nform" onSubmit={handleLogin}>
        <div className="flex flex-row nform-input">
          <label htmlFor="username" >Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"            
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <div className="line w-full"></div>
          <div className="dept">Department</div>
          <div className="line w-full"></div>
        </div>
        <div className="flex flex-row nform-input">
          <label htmlFor="deptusername">Username</label>
          <input
            type="text"
            id="deptusername"
            name="deptusername"
            value={formData.deptusername}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row nform-input">
            <label htmlFor="deptpassword">Password</label>
            <input
              type="password"
              id="deptpassword"
              name="deptpassword"
              value={formData.deptpassword}
              onChange={handleInputChange}
              required
              className="w-full outline-none transparent"
            />
          </div>
          <p className="block font-0_75" style={{opacity:"0.75"}}>** Are you <a href="#" className="color-btn" style={{textDecoration:"underline",fontWeight:"bold"}}>Admin</a> ?</p>
        </div>

        <button type="submit" className="nform-send login-send mx-auto">Login</button>
      </form>
    </div>
  );
}
