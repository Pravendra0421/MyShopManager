import { Link } from "react-router-dom";

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1f4470] text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">📩 Check Your Email</h1>
        <p className="text-lg">Please verify your email address to continue.</p>
        <p className="text-sm text-gray-500 mt-2">Didn't receive an email? Check your spam folder or try again.</p>
        
        <Link 
          to="/login" 
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default EmailConfirmation;
