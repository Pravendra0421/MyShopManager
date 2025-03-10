import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/Api";

const ResetPassword = () => {
    const location = useLocation();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [link,setLink]=useState<boolean>(false);
    const navigate=useNavigate();
    useEffect(() => {
        // Extract token from URL hash (#access_token=...)
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const token = hashParams.get("access_token");
        if (token) {
            setAccessToken(token);
        } else {
            setError("Invalid or missing reset token.");
        }
    }, [location]);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        if (!accessToken) {
            setMessage("Invalid token. Please request a new reset link.");
            return;
        }
        try {
            const response = await resetPassword({ email, accessToken, newPassword });
            if (response.error) {
                throw new Error(response.error);
            }
            setMessage("Password successfully reset! You can now log in.");
            setLink(true);
        } catch (err: any) {
            setError(err.message || "Failed to reset password. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-700 px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg transition-all transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Reset Password</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {accessToken && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {message && <p className="text-green-500 text-sm text-center mt-4">{message}</p>}
                {link &&(<button className="w-full  bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all " onClick={()=>navigate('/login')}>Login</button>)}
            </div>
        </div>
    );
};

export default ResetPassword;
