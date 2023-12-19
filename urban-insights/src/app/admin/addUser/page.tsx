// UserRegistration.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    deptusername: '',
    password: '',
    deptpassword: '',
  });

  const router = useRouter()


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/hardCoded/verifyuser/adduser', formData);

      if (response.data.success) {
        router.back();
        console.log(router) 

      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>User Registration</p>
      <form onSubmit={handleRegistration} className='flex flex-col gap-y-4 nform'>
        <div className="flex flex-row nform-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required   
            className="w-full outline-none transparent"         
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="username">Username</label>
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

        <button type="submit" className="nform-send login-send mx-auto">Register</button>
      </form>
    </div>
  );
}
