import supabase from "../database/supabase.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = data.user; // Attach user info to the request object
    next(); // Proceed to next middleware/route handler
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
