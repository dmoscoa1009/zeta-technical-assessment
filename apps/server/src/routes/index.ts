import { Router } from "express";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";

const router = Router();

// Import route modules
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

export default router;
