import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import multer from "multer";
import path from "path";

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../client/public/images/products"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

const router = Router();

router.get("/get-all-products", getProducts);
router.get("/get-product-by-id/:id", getProductById);
router.post(
  "/create-product",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct
);
router.put(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
