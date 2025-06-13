import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/get-all-products", getProducts);
router.get("/get-product-by-id/:id", getProductById);
router.post("/create-product", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
