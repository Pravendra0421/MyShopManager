import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        await axios.post(
          "https://myshopmanager.onrender.com/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login
      } catch (error) {
        console.error("Logout Error", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
