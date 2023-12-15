// LoginForm.js
"use client"

import { useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [firstFormData, setFirstFormData] = useState({
    username: "",
    password: "",
    deptusername: "",
    deptpassword: "",
  });

  const [secondFormData,setSecondFormData]=useState({
    email:"",
    regionIDs:[""]
  })
  
  const [OTP,setOTP]=useState("");
  const [firstStepDone,setFirstStepDone]=useState(false);
  const [startTimer,setStartTimer]=useState(false);
  const [seconds,setSeconds]=useState(0);

  useEffect(()=>{
    if(startTimer){
        const intervalID=setInterval(()=>{
          setSeconds((prevSeconds)=>{
          const newSecond=prevSeconds+1;
          
          if(newSecond>=60){
            setStartTimer(false);
            clearInterval(intervalID);
          }

          console.log("HI")

          return newSecond;
        });
      },1000)

      return ()=>clearInterval(intervalID);
    }

  },[startTimer]);


  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirstFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginFirst = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/hardCoded/verifyuser/verifyemployee", firstFormData);

      if (response.data.success) {
        console.log("Login successful!");
		    setFirstStepDone(true);
        setStartTimer(true);
        setSecondFormData({email:response.data.user.email,regionIDs:response.data.user.assigned})
      } else {
        console.error("Login failed:", response.data.message);
		    // setFirstFormData({username:"",password:"",deptpassword:"",deptusername:""});
      }
    } catch (error) {
		  setFirstFormData({username:"",password:"",deptpassword:"",deptusername:""});
	    console.error("Error during login:", error);
    }
  };

  const handleLoginSecond = async (e)=>{
    e.preventDefault();
    setFirstStepDone(true);

    try{
      const response = await axios.post("http://localhost:3000/api/hardCoded/verifyuser/otpverify",{email:secondFormData.email,otp:OTP});


      if(response.data.success){
        console.log("Otp successful");
        router.push(`/oldRegion/`);
      }
      
    }
    catch(error){
      console.log("Error in otp verification");
    }
  }

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>User Login</p>
      {
        !firstStepDone?(
          <div>
            <form onSubmit={handleLoginFirst} className='flex flex-col gap-y-4 nform'>
              <div className="flex flex-row nform-input">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={firstFormData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full outline-none transparent"
                />
              </div>

              <div className="flex flex-row nform-input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={firstFormData.password}
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
                  value={firstFormData.deptusername}
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
                  value={firstFormData.deptpassword}
                  onChange={handleInputChange}
                  required
                  className="w-full outline-none transparent"
                />
              </div>

              <button type="submit" className="nform-send login-send mx-auto">Login</button>
            </form>
          </div>
        ):
        (
          <div>
            <form onSubmit={handleLoginSecond} className='flex flex-col gap-y-4 nform'>
              <div className="flex flex-row nform-input">
                <label htmlFor="otp">OTP:</label>
                <input
                  type="password"
                  id="otp"
                  name="otp"
                  value={OTP}
                  onChange={(e)=>{setOTP(e.target.value)}}
                  required
                  className="w-full outline-none transparent"
                />
              </div>
              {seconds<60?<span>{seconds}</span>:<button onClick={(e)=>{setStartTimer(false); setSeconds(0); handleLoginFirst(e);}}>Resend Code</button>}
              <button type="submit" className="nform-send login-send mx-auto">Login</button>
            </form>
          </div>
        )
      }
    </div>
  );
}
