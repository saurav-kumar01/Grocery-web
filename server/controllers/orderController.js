import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place Order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({
        success: false,
        error: "Invalid order details",
      });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.price * item.quality;
    }, 0);

    amount += Math.floor(amount * 0.02); // Adding 2% as delivery charge

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({
      success: true,
      message: "Order placed successfully",
      amount,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Get User Orders : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Get All Orders (for seller / admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
