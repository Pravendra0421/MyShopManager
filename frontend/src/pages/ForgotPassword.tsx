import { useState } from "react";
import { forgotPassword } from "../services/Api";
const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            const response=await forgotPassword({email});
            setMessage(response.message);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
                <div className="flex justify-center mb-4">
                    <span className="text-5xl">🔐</span> {/* Lock icon */}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot password?</h2>
                <p className="text-gray-600 text-sm mb-4">No worries, we’ll send you reset instructions.</p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {loading?<button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        loading ...
                    </button>:<button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Reset password
                    </button>}
                </form>

                {message && <p className="text-green-600 text-sm mt-3">{message}</p>}
                

                <div className="mt-4">
                    <a href="/login" className="text-sm text-blue-600 hover:underline">
                        ← Back to log in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
