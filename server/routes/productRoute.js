import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeProductStock,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
productRouter.get("/list", getProducts);
productRouter.get("/id", getProductById);
productRouter.post("/stock", authSeller, changeProductStock);

export default productRouter;
