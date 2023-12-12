// components/AdminLogin.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    adminusername: '',
    adminpassword: '',
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
      
      const response = await axios.post('http://localhost:3000/api/hardCoded/verifyuser/verifyadmin', formData);

      if (response.data.success) {
        router.push('http://localhost:3000/login/addUser');
        console.log('Login successful!');
       
      } else {
        console.error('Login failed:', response.data.message);
    
      }
    } catch (error) {
      console.error('Error during login:', error);
   
    }
  };

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>Admin Login</p>
      <form onSubmit={handleLogin} className='flex flex-col gap-y-4 nform'>
        <div className="flex flex-row nform-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="adminusername"
            name="adminusername"
            value={formData.adminusername}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="adminpassword"
            name="adminpassword"
            value={formData.adminpassword}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <button type="submit" className="nform-send login-send mx-auto">Login</button>
      </form>
    </div>
  );
}