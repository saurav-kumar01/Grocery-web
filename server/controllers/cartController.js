// update user cartData : /api/user/cart

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
