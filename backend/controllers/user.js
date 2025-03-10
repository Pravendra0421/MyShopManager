import supabase from "../database/supabase.js";

// Sign Up Controller
export const signUp = async (req, res) => {
    const { email, password,role } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password,role });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Signup successful. Please check your email for confirmation.", user: data });
};

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Login successful", user: data.user, accessToken: data.session.access_token });
};

// Logout Controller
export const logout = async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Logout successful" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://myshopmanager.onrender.com/reset-password", // Change this to your frontend reset page URL
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Password reset email sent. Check your inbox." });
};

export const resetPassword = async (req, res) => {
    try {
        const { accessToken, newPassword } = req.body;

        if (!accessToken || !newPassword) {
            return res.status(400).json({ error: "Missing access token or new password" });
        }

        // Authenticate user with the accessToken
        const { data: user, error: authError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: accessToken, // Using access token as refresh token (Supabase requirement)
        });

        if (authError) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // Update the password
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: "Password has been reset successfully!" });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
