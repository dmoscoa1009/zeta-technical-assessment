import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/get-all-products", getProducts);
router.get("/get-product-by-id/:id", getProductById);
router.post("/create-product", authMiddleware, adminMiddleware, createProduct);
router.put(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
