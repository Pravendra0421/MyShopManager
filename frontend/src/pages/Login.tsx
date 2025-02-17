
import { useState } from 'react';
import image2 from '../assets/ez-logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [input1, setinput1]=useState<{email:string,password:string}>({
    email:"",
    password:""
  });
  const navigate=useNavigate();
  const changeEventHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setinput1({...input1,[e.target.name]:e.target.value});
    // console.log(input1);
  };
  const submitHandler = async(e:React.FormEvent)=>{
    e.preventDefault();
    // console.log(input1);
    try {
      const Response=await axios.post("http://localhost:3000/auth/login",input1);
      localStorage.setItem("token",Response.data.accessToken);
      // console.log("signup successfull:",Response.data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#1f4470] relative">
      
      {/* Logo as a sidebar on mobile */}
      <div className="absolute top-4 left-4  ">
        <img src={image2} alt="Logo" className="w-12 h-12 " />
      </div>

      {/* Left Side - Welcome Section */}
      <div className="md:w-1/2 text-center md:text-left p-6 md:p-12 text-white flex flex-col items-center md:items-start">
        <h2 className="text-4xl lg:text-6xl md:text-4xl font-bold">Welcome to MyShopManager</h2>
        <p className="mt-4 text-lg md:text-xl">
          Empower your business: Unlock success with MyShopManager.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/3 w-full max-w-[375px] bg-white p-6 rounded-lg shadow-md">
        {/* <img className="w-24 h-24 mx-auto" src={image1} alt="Market Logo" /> */}
        <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>

        <form onSubmit={submitHandler} className="mt-4 flex flex-col">
          <label className="text-gray-600 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name='email'
            value={input1.email}
            onChange={changeEventHandler}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />

          <label className="text-gray-600 text-sm mt-3">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name='password'
            value={input1.password}
            onChange={changeEventHandler}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account? <Link className='text-blue-500' to={'/signup'}>signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
