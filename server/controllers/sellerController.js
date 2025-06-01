import jwt from "jsonwebtoken";

// Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.ADMIN_EMAIL
    ) {
      const token = jwt.sign({ email }, password.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        message: "Seller logged in successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// Logout isAuth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// Logout Seller : /api/seller/logout

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
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
