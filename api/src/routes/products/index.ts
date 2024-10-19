import { Router } from "express";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "./productsController";

// products endpoints
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
