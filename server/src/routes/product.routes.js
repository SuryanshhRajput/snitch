import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import multer from "multer";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";

const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
});
//create product
router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "user is not authorise to create products",
      });
    }
    next();
  },
  uploads.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);

    next();
  },
  createProductValidator,
  createProduct,
);

// get all product

router.get("/", authenticate, getAllProduct);

export default router;
