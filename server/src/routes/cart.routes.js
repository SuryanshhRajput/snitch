import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();
// add product to the user's cart
router.post("/", authenticate, addToCartValidator, addToCart);

router.get("/", authenticate, getCart);

export default router;
