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

//Email confirmation controller
// export const confirmEmail = async (req, res) => {
//     const { token } = req.query;
    
//     if (!token) {
//         return res.status(400).json({ error: "Invalid or missing confirmation token" });
//     }

//     // Verify token and get user details
//     const { data: user, error } = await supabase.auth.getUser(token);

//     if (error || !user) {
//         return res.status(400).json({ error: "Email confirmation failed or already verified" });
//     }

//     // Redirect to frontend login page with confirmation flag
//     res.redirect("http://localhost:5173/?confirmed=true");
// };

