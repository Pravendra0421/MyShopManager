import supabase from "../database/supabase.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      console.error("Auth Error:", error?.message || "Invalid token");
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = { id: data.user.id, email: data.user.email }; // Attach user info

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
