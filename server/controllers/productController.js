// Add Product : api/product/add

import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.product);

    const images = req.files;

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, images: imageUrl });
    return res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Get Product : api/product/list
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Get single Product : api/product/id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Change Product inStock : api/product/stock

export const changeProductStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    return res.json({
      success: true,
      message: "Product stock updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
