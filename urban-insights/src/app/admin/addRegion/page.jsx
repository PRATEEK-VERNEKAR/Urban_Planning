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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
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
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>Region Registration</p>
      <form onSubmit={handleRegistration} className='flex flex-col gap-y-4 nform'>
        <div className="flex flex-row nform-input">
          <label htmlFor="email">Region</label>
          <input
            type="text"
            id="regionID"
            name="regionID"
            value={formData.regionID}
            onChange={handleInputChange}
            required   
            className="w-full outline-none transparent"         
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required 
            className="w-full outline-none transparent"           
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">States</label>
          <input
            type="text"
            id="states"
            name="states"
            value={formData.states}
            onChange={handleInputChange}
            required       
            className="w-full outline-none transparent"    
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Countries</label>
          <input
            type="text"
            id="countries"
            name="countries"
            value={formData.countries}
            onChange={handleInputChange}
            required       
            className="w-full outline-none transparent"    
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required       
            className="w-full outline-none transparent"    
          />
        </div>     
        
        <div className="flex flex-row nform-input">
          <label htmlFor="password">Length</label>
          <input
            type="text"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleInputChange}
            required       
            className="w-full outline-none transparent"    
          />
        </div>




        <div className="flex flex-row items-center gap-x-2">
          <div className="line w-full"></div>
          <div className="dept">Government Bodies</div>
          <div className="line w-full"></div>
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="deptusername">Ministry Name</label>
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