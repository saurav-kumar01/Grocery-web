// Add Address : api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    await Address.create({ ...address, userId });
    res.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Get Addresse : api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const addresses = await Address.find({ userId });
    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
