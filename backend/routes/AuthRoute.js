import express from "express";
import { signUp, login, logout } from "../controllers/user.js";

const router = express.Router();

// Handle preflight request for logout
router.options("/logout", (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
