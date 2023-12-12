// UserRegistration.js
"use client";
import { useState } from 'react';
import axios from 'axios';

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    deptusername: '',
    password: '',
    deptpassword: '',
  });

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
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'black' }}>User Registration</h2>
      <form onSubmit={handleRegistration}>
        <label htmlFor="email" style={{ color: 'white' }}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={{ color: 'black' }}
        />

        <label htmlFor="username" style={{ color: 'white' }}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          style={{ color: 'black' }}
        />

        <label htmlFor="deptusername" style={{ color: 'white' }}>Department Username:</label>
        <input
          type="text"
          id="deptusername"
          name="deptusername"
          value={formData.deptusername}
          onChange={handleInputChange}
          required
          style={{ color: 'black' }}
        />

        <label htmlFor="password" style={{ color: 'white' }}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={{ color: 'black' }}
        />

        <label htmlFor="deptpassword" style={{ color: 'white' }}>Department Password:</label>
        <input
          type="password"
          id="deptpassword"
          name="deptpassword"
          value={formData.deptpassword}
          onChange={handleInputChange}
          required
          style={{ color: 'black' }}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
