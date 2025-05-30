import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register a new user : /api/user/register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// Login a user : /api/user/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

//Check Auth : /api/user/is-auth

export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// Logout a user : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};
