import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if the token exists

  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  // Verify the token

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
