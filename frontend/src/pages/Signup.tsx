import image2 from '../assets/ez-logo.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [input1, setInput1] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null); // To show success/error messages
  const navigate=useNavigate();
  // Handle input changes
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1({ ...input1, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", input1);
      setMessage("Signup successful!");
      console.log("Signup successful:", response.data);
  
      // Redirect to Email Confirmation Page with Email as Query Parameter
      navigate(`/emailconfirmation?email=${input1.email}`);
    } catch (error) {
      setMessage("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };
  

  useEffect(() => {
    // console.log("User input changed:", input1);
  }, [input1]); // Runs when input1 changes

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.post("http://localhost:3000/auth/signup");
        if (response.data.isAuthenticated) {
          setMessage("You are already logged in!");
        }
      } catch (error) {
        console.log("User not authenticated, proceeding with signup.");
      }
    };

    checkAuthStatus();
  }, []); // Runs only once when component mounts

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#1f4470] relative">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src={image2} alt="Logo" className="w-12 h-12" />
      </div>

      {/* Left Side - Welcome Section */}
      <div className="md:w-1/2 text-center md:text-left p-6 md:p-12 text-white flex flex-col items-center md:items-start">
        <h2 className="text-4xl lg:text-6xl md:text-4xl font-bold">Welcome to MyShopManager</h2>
        <p className="mt-4 text-lg md:text-xl">
          Empower your business: Unlock success with MyShopManager.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="md:w-1/3 w-full max-w-[375px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center">Sign Up</h2>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}

        <form onSubmit={submitHandler} className="mt-4 flex flex-col">
          <label className="text-gray-600 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={input1.email}
            onChange={changeEventHandler}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />

          <label className="text-gray-600 text-sm mt-3">Password</label>
          <input
            type="password"
            name="password"
            value={input1.password}
            onChange={changeEventHandler}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Do you have an account? <Link className='text-blue-500' to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
